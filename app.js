const express = require("express");
const path = require("path");

const app = express();

// ✅ Define PORT properly
const PORT = 3000;

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// In-memory tasks
let tasks = [];

// Routes
app.get("/", (req, res) => {
    res.render("index", { tasks });
});

app.post("/add", (req, res) => {
    const task = req.body.task;

    if (task && task.trim() !== "") {
        tasks.push(task);
    }

    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    tasks.splice(id, 1);
    res.redirect("/");
});

// ✅ SINGLE listen ONLY
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});