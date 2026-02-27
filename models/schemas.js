const mongoose = require('mongoose');

// 1. User Schema (Merged Student & Teacher)
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['teacher', 'student'], required: true },
    status: { type: String, enum: ['pending', 'approved'], default: 'approved' },
    name: String,
    rollNumber: { type: String }, 
    designation: String, 
    semester: String,    
    
    //1. Dynamic Profile Fields for Teachers
    profilePicture: { type: String, default: null },
    qualifications: { type: String, default: 'M.Sc, PhD' },
    bio: { type: String, default: 'Dedicated to teaching and research in physics.' },
    
    attendance: {
        jan: { attended: Number, total: Number },
        feb: { attended: Number, total: Number },
        mar: { attended: Number, total: Number }
    }
});

// 2. Resource Schema (Files)
const ResourceSchema = new mongoose.Schema({
    title: String,
    type: String, // 'Resource', 'Kalavatika', 'Annual'
    semester: { type: String, default: '' },
    subject: { type: String, default: '' },
    topic: { type: String, default: '' },
    uploader: String,
    role: String,
    filePath: String,
    date: { type: Date, default: Date.now }
});

// 3. Blog Schema (SEO Optimized)
const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    author: { type: String },
    imagePath: { type: String },
    documentPath: { type: String },
    status: { type: String, default: 'approved' }, 
    date: { type: Date, default: Date.now }
});
// 5. Notice Board Schema
const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String }, // Text announcement
    filePath: { type: String }, // Optional attached PDF or image
    author: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
// 6  Social Media Style Research Feed Schema
const ResearchPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    caption: { type: String, required: true }, 
    author: { type: String, required: true }, 
    role: { type: String, required: true }, 
    imagePath: { type: String },    // 🖼️ For the visual cover photo
    documentPath: { type: String }, // 📄 NEW: For the actual PDF research paper
    likes: { type: Number, default: 0 }, 
    date: { type: Date, default: Date.now }
});


// =============================
// 📸 ADVANCED EVENT GALLERY
// =============================

// 8. Event Highlight Schema (The Category "Folder", e.g., "Picnics")
const EventHighlightSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, // e.g., "Society Connects"
    createdBy: { type: String } // Teacher who made the category
});

// 9. Event Album Post Schema (The specific event, e.g., "Picnic 2024")
const EventPostSchema = new mongoose.Schema({
    //  specific Parent Highlight Folder
    highlightId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventHighlight', required: true },
    title: { type: String, required: true }, // e.g., "Annual Picnic 2024"
    caption: { type: String }, 
    //  MULTIPLE image paths in one post
    imagePaths: [{ type: String, required: true }], 
    author: { type: String },
    role: { type: String },
    date: { type: Date, default: Date.now }
});
// --- 🏆 NEW: ACHIEVEMENT FEED SCHEMA ---
const AchievementSchema = new mongoose.Schema({
    category: { type: String, required: true }, // Will be either 'academic' or 'activity'
    studentsInvolved: { type: String, required: true }, // e.g., "Rahul, Shibom, and Team"
    description: { type: String, required: true },
    imagePaths: [{ type: String }], // Array for multiple images
    author: { type: String }, // Who posted it
    authorRole: { type: String }, // 'teacher' or 'student'
    date: { type: Date, default: Date.now }
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    Resource: mongoose.model('Resource', ResourceSchema),
    Blog: mongoose.model('Blog', BlogSchema),
    Notice: mongoose.model('Notice', NoticeSchema),
    ResearchPost: mongoose.model('ResearchPost', ResearchPostSchema), 
    EventHighlight: mongoose.model('EventHighlight', EventHighlightSchema),
    EventPost: mongoose.model('EventPost', EventPostSchema),
    Achievement: mongoose.model('Achievement', AchievementSchema)
};