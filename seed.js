const mongoose = require('mongoose');
const { User } = require('./models/schemas');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/physicaDB')
    .then(async () => {
        console.log("🌱 Connected to DB...");

        // 1. Check if user exists, if so, delete them to start fresh
        await User.deleteMany({ username: "teacher1" });
        await User.deleteMany({ username: "student1" });

        // 2. Create a TEACHER
        await User.create({
            username: "teacher1",
            password: "123",
            role: "teacher",
            name: "Dr. Physics",
            designation: "Professor",
            attendance: { jan: { attended: 0, total: 0 } }
        });

        // 3. Create a STUDENT
        await User.create({
            username: "student1",
            password: "123",
            role: "student",
            name: "Rahul Sharma",
            semester: "4th Semester",
            attendance: {
                jan: { attended: 20, total: 25 },
                feb: { attended: 18, total: 24 },
                mar: { attended: 22, total: 26 }
            }
        });

        console.log("✅ Users Created!");
        console.log("👉 Teacher Login: teacher1 / 123");
        console.log("👉 Student Login: student1 / 123");
        process.exit();
    })
    .catch(err => console.log(err));