const mongoose = require('mongoose');
const Chat= require("./models/chart.js");
main()
    .then(()=>{
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');


}

let allChats=[
    {
        from:"Ramesh",
        to:"Suresh",
        msg:"Hi",
        created_at:new Date()
    },
    {
        from:"hunter",
        to:"eliminator",
        msg:"hey",
        created_at:new Date()
    },

    {
        from:"alpha",
        to:"bravo",
        msg:"rogar",
        created_at:new Date()
    },

    {
        from:"delta",
        to:"charle",
        msg:"eliminate it",
        created_at:new Date()
    },

    {
        from:"Rohan",
        to:"Sohan",
        msg:"Hey bro",
        created_at:new Date()
    }
]

Chat.insertMany(allChats);
