import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override"

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const generateId = () => {
    return allPosts.length > 0
        ? allPosts[allPosts.length - 1].id + 1
        : 1;
};

let allPosts = [
    { id: 1, postTitle: "My First Post", postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil quidem expedita saepe corrupti earum nisi deleniti culpa harum atque aspernatur iusto debitis minus excepturi voluptatibus eum cupiditate tempora in." },
    {
        id: 2, postTitle: "My Second Post", postContent: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab corporis deserunt explicabo cumque impedit laboriosam reprehenderit itaque quibusdam rem adipisci, voluptatibus labore vero tenetur voluptates."
    }
];

app.get("/", (req, res) => {
    res.render("index.ejs", { allPosts });
});

app.get("/posts/:id/edit", (req, res) => {
    const postId = Number(req.params.id);
    const post = allPosts.find(post => post.id === postId);
    res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    const post = allPosts.find(post => post.id === postId);
    post.postTitle = req.body.postTitle;
    post.postContent = req.body.postContent;
    res.redirect("/");
});

app.delete("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    allPosts = allPosts.filter(post => post.id !== postId);
    res.redirect("/");
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    const newPost = {
        id: generateId(),
        postTitle: req.body.postTitle,
        postContent: req.body.postContent
    };

    allPosts.push(newPost);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

