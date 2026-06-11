const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();
const PORT = 3000;

// Connect to MongoDB (Fallback to localhost if environmental variable isn't set)
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskmanager";
mongoose.connect(mongoURI)
    .then(() => console.log("📦 MongoDB connected successfully"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render("index", { tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.post('/add', async (req, res) => {
    try {
        const { task, priority } = req.body;
        await Task.create({
            name: task,
            priority: priority || "medium",
            status: "todo"
        });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating task");
    }
});

// Route to toggle standard backlog items directly into 'done' status
app.get("/complete/:id", async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, { status: "done" });
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating task");
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting task");
    }
});

// Single listen block
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});