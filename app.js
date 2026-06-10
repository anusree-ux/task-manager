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

let tasks = [
  {
    id: 1,
    name: "Deploy app",
    priority: "high",
    status: "todo"
  }
];

// Routes
app.get("/", (req, res) => {
    res.render("index", { tasks });
});

app.post('/add', (req, res) => {
    tasks.push({
        id: Date.now(),
        name: req.body.task,
        priority: "medium",
        status: "todo"
    });

    res.redirect('/');
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

app.post('/add', (req, res) => {
    tasks.push({
        id: Date.now(),
        name: req.body.task,
        priority: "medium",
        status: "todo"
    });
    res.redirect('/');
});