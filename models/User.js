const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    oauthId: {
        type: String
    },
    displayName: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userType: {
        type: String
    },
    registeredOn: {
        type: Date,
        default: Date.now()
    }

})

const User = mongoose.model('User', UserSchema);
module.exports = User;