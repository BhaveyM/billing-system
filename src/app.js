const express = require("express");
const bodyParser = require('body-parser');
require("../src/db/conn");
const User = require("../src/models/users");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

const billingRoutes = require('./routers/routes');
app.use('/', billingRoutes);

// app.post("/users", async(req, res)=> {
//     try{
//         const newUser = new users(req.body)
//         console.log(req.body);
//         const insertUser = await newUser.save();
//         res.status(201).send(insertUser);
//     }catch(e){
//         res.status(400).send(e);
//     }
// })

app.listen(port, () => {
    console.log(`connected at port ${port}`);
})