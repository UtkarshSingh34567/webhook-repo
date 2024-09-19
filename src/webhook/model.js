const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    request_id: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    from_branch: {
        type: String,
        required: true
    },
    to_branch: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
