const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// In-memory Database with varied priorities and statuses to showcase the layout
let tasks = [
  { id: 1, name: "Deploy application to production", priority: "high", status: "todo" },
  { id: 2, name: "Review pull requests", priority: "medium", status: "todo" },
  { id: 3, name: "Setup Jenkins pipeline", priority: "low", status: "done" }
];

// Routes
app.get("/", (req, res) => {
    res.render("index", { tasks });
});

app.post('/add', (req, res) => {
    const { task, priority } = req.body;
    tasks.push({
        id: Date.now(),
        name: task,
        priority: priority || "medium",
        status: "todo"
    });
    res.redirect('/');
});

// Changed to a GET route to easily map to the delete links
app.get("/delete/:id", (req, res) => {
    const targetId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== targetId);
    res.redirect("/");
});

// SINGLE listen block
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});