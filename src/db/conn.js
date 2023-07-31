const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://bhavey:37y-7Y-HzBExCfB@cluster0.eh2mooc.mongodb.net/billing-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to db");
}).catch((e) => {
    console.log("not connected");
})


//atlas url: mongodb+srv://bhavey:37y-7Y-HzBExCfB@cluster0.eh2mooc.mongodb.net/billing-system
//compass url: mongodb://localhost:27017/billing
