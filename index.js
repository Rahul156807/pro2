const express = require("express"); 
const bodyParser = require("body-parser");
const port =  process.env.PORT || 3000;
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoose = require("mongoose");
// mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/todoDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect("mongodb://localhost:27017/todo");

const trySchema = new mongoose.Schema({
    name: String
});

const item = mongoose.model("task", trySchema);

const todo = new item({ name: "create some videos" });
const todo2 = new item({ name: "learn DSA" });
const todo3 = new item({ name: "Learn react" });
const todo4 = new item({ name: "take some rest" });
// todo.save();
// todo2.save();
// todo3.save();
// todo4.save();

app.get("/", async function(req, res) {
    try {
        const foundItems = await item.find({});
        res.render("list", { ejes: foundItems });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
app.post("/",function(req,res){
    const itemName = req.body.elel;
    const todo4 = new item({
        name:itemName
    });
    todo4.save();
    res.redirect("/");
})

app.listen(3000, function() {
    console.log("Server is running");
});
