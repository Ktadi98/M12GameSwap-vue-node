import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";

import "dotenv/config";
import { createUserRouter } from "./routes/users.js";
import { createPostRouter } from "./routes/posts.js";
import { createReviewRouter } from "./routes/reviews.js";
import { createComplaintRouter } from "./routes/complaints.js";
import { UserModel } from './models/UserModel.js';
import { PostModel } from './models/PostModel.js';
import { ReviewModel } from "./models/ReviewModel.js";
import { ComplaintModel } from "./models/ComplaintModel.js";
import path from 'path';
import { fileURLToPath } from 'url';



const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// app.use("/static", express.static(path.join(__dirname, "static")));
//console.log(__dirname);
//app.use(express.static(__dirname + "/static"));
//app.use("/static", express.static(path.join(__dirname, "public")));
//app.use(express.static(__dirname + "/public")); //archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')))


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use("/users", createUserRouter(UserModel));
app.use("/posts", createPostRouter(PostModel));
app.use("/reviews", createReviewRouter(ReviewModel));
app.use("/complaints", createComplaintRouter(ComplaintModel));

const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
  res.send("<h2>All set!</h2>");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});


// app.post('/upload', upload.single('images'), (req, res, next) => {

//   const file = req.file

//   if (!file) {

//     const error = new Error('Please upload a file')

//     error.httpStatusCode = 400

//     return next(error)

//   }

//   res.send(file)

// })

