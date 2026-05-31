// import http from "http";

// const server = http.createServer((req, res) => {
//     if (req.url === "/"){
//         res.write("Welcome to the Node JS homepage.");
//         res.end();
//     }
//     if (req.url === "/prices"){
//         res.write("Node JS course price plans for fall 2022...");
//         res.end();
//     }
// });

// server.listen(3000);
// console.log("Listening on port 3000...");


// import express from "express";
// import students from "./routes/students.js";
// import teachers from "./routes/teachers.js";
// import signup from "./routes/signup.js";
// import cors from "cors";
// import bodyParser from "body-parser";

// const app = express();

// app.use(cors());
// app.use(bodyParser.json( { extended: true } ));
// app.use(bodyParser.urlencoded ( { extended: true } ));


// app.use("/signup", signup);



// app.use("/undergrad/students", students);
// app.use("/teachers", teachers);

// app.listen(5000);
// console.log("Listening...");




















import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import users from './routes/users.js'
import products from './routes/products.js'
import login from './routes/login.js'
import cart from './routes/cart.js'




const app = express();
mongoose.set('strictQuery', false);
const url = "mongodb+srv://haider:bawaqadra@cluster0.cktsj.mongodb.net/?appName=Cluster0"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connection Success"));
app.use(cors());
app.use(bodyParser.json({ limit:'50mb',extended: true }));
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }));

app.use("/signup", users);
app.use("/admin", users);
// app.use("/admin/:id", users);
app.use("/products", products);
app.use("/login",login)
app.use("/viewproduct",cart)















app.listen(3002);