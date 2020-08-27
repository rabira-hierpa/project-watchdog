const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schemas

const UserSchema = new Schema({
    Fname:{
        type: String,
        required: true
    },
    Lname:{
        type: String,
        required: true
    },
    googleID: String,
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Department:{
        type: String,
        required: true
    },
    OtherDescription: String,
    Type:{
        type: String,
        required: true,
        default: 3  // 1:SystemAdmin   2:Advisor    3:Student 
    },
    Status:{
        type: Number,
        default: 1  // 0: blocked   1: active
    },
    DateOfRegistration:{
        type: Date,
        default: Date.now
    }
});

const MilestoneSchema = new Schema({
    MileStoneTitle:{
        type: String,
        required: true
    },
    MileStoneDescription: String,
    DeadLine:{
        type: Date,
        required: true
    },
    FileLocation:[String],
    Status: {
        type: Number,
        required: true,
        default: 1      // 1:Incomplete   2:Review    3:Completed 
    } 
});

const TaskSchema = new Schema({
    TaskTitle:{
        type: String,
        required: true
    },
    TaskDescription: String,
    Catagory: {
        type: Number,
        required: true,
        default: 1      // 1:Todo   2:Inprogress    3:review    4:completed 
    },
    DeadLine:{
        type: Date,
        required: true
    },
    FileLocation:[String],
    AssignedTo:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const ChatSchema = new Schema({
    Sender:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ChatText: String,
    ChatDate:{
        type: Date,
        default: Date.now
    }
});

const RequestSchema = new Schema({
    UserID:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Date:{
        type: Date,
        default: Date.now
    }
});

const HistorySchema = new Schema({
    UserName: String,
    Event: String,
    Progress: Number,
    Type: String,
    Date:{
        type: Date,
        default: Date.now
    }
});

const ProjectSchema = new Schema({
    ProjectTitle:{
        type: String,
        required: true
    },
    ProjectDescription:{
        type: String,
        required: true
    },
    StartDate:{
        type: Date,
        default: Date.now
    },
    DeadLine:{
        type: Date,
        required: true
    },
    Progress:{
        type: Number,
        default: 0
    },
    Status:{
        type: Number,
        default: 1  // 0: blocked   1: active
    },
    Member: [{type: Schema.Types.ObjectId, required: true, ref: 'User'}],
    Leader:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    MileStone: [MilestoneSchema],
    Task: [TaskSchema],
    Chat: [ChatSchema],
    Request: [RequestSchema],
    History: [HistorySchema]
});

const ArchiveSchema = new Schema({
    Title:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    UploadDate:{
        type: Date,
        default: Date.now
    },
    FileLocation:[String]
});

// Creating Models

mongoose.model('User', UserSchema);
mongoose.model('Project', ProjectSchema);
mongoose.model('Archive', ArchiveSchema);