const Event = require('./model');
const io = require('../../app');

// GitHub webhook events
exports.handleGitHubWebhook = async (req, res) => {
    const data = req.body;

    let action = "";
    let from_branch = "";
    let to_branch = "";
    const author = data.sender.login;
    const timestamp = new Date().toISOString();
//  to handle push and merge 
    if (data.ref) {
        action = "push";
        from_branch = data.ref.split('/').pop();
        to_branch = from_branch;
    } else if (data.pull_request) {
        from_branch = data.pull_request.head.ref;
        to_branch = data.pull_request.base.ref;

        if (data.action === "closed" && data.pull_request.merged) {
            action = "merge";
        } else {
            action = "pull_request";
        }
    }

    // Save data to mongo
    const event = new Event({
        request_id: data.id,
        author: author,
        action: action,
        from_branch: from_branch,
        to_branch: to_branch,
        timestamp: timestamp
    });

    await event.save();

    io.emit('new_event', event);

    res.status(200).send({ success: true });
};
