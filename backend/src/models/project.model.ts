import mongoose from "mongoose";

const projectModel = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

export default mongoose.model('Project', projectModel);