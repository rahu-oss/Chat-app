const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chart.js");
const methodOverride = require("method-override");

app.set('views', path.join(__dirname, "views"));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Database Connection
main()
    .then(()=> console.log("DB connected"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

// Index Route
app.get("/chats", async(req,res)=>{
    let chats = await Chat.find();
    res.render("index", {chats});
});

// New form
app.get("/chats/new", (req,res)=>{
    res.render("new");
});

// Create Route
app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new Chat({
        from,
        to,
        msg,
        created_at: new Date()
    });
    newChat.save().then(()=> console.log("chat saved"))
                  .catch(err=> console.log(err));
    res.redirect("/chats");
});

// Edit Route
app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit", {chat});
});

// Update Route
app.put("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    res.redirect("/chats");
});

// Delete
app.delete("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

app.get("/", (req,res)=>{
    res.redirect("/chats");
});

// PORT FIX for Render
app.listen(process.env.PORT || 8080, ()=>{
    console.log("Server is running...");
});

