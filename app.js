const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require("dotenv").config(); // Corrected require statement
const multer = require("multer");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");

const loginRoutes = require("./Routes/authentication");
const registerRoutes = require("./Routes/registerRoutes");
const authMW = require("./middleware/authenticationMW");

const teacherRoute = require("./Routes/teacherRoute");
const childRoute = require("./Routes/childRoute");
const classRoute = require("./Routes/classRouter");


const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    servers: [
      { url: 'http://localhost:8080/' }
    ],
    info: {
      title: 'NurserySystem Documentation', 
      version: '1.0.0', 
      description:
      "The Nursery System project aims to provide a simple yet effective management system for a nursery. The system will have one administrator who will have access to add teachers and children to the system. once registered, they can log in to access their account. The administrator will be responsible for adding children to the system, assigning them to specific teachers, and managing other administrative tasks."
    },
    security: [
      {
        apiKeyAuth: []
      }
    ],
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key'
        }
      }
    }
  },
  // Path to the API docs
  apis: ['./Routes/*.js'], // Path to the API docs
};


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, 'images'))
  },
  filename:(req,file,cb)=>{
    cb(null, new Date().toLocaleDateString( ).replace(/\//g , "-")+"-" + file.originalname);
  } 
});

const fileFilter=(req , file , cb)=>{
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
        cb(null, true);
    } else {
        cb(new Error("Invalid image type"), false);
    }
}
// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
//         cb(null, true);
//     } else {
//         cb(new Error("Invalid image type"), false);
//     }
// }

const specs = swaggerJsdoc(options);

// 1- Default function to create server
const app = express();
const port = process.env.PORT;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connected....");
    app.listen(port, () => {
      console.log("I'm listening ", port);
    });
  })
  .catch((error) => {
    console.log("DB Problem ..." + error);
  });

app.use(morgan("dev"));
app.use(cors());
app.use("/images",express.static( path.join(__dirname, 'images')));  //front end
app.use(multer({storage , fileFilter}).single("image"));     //path
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: false })); // Corrected middleware usage
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(loginRoutes); // Login routes should be placed before authMW
app.use(registerRoutes);
app.use(authMW); // Authentication middleware should come before routes that require authentication
app.use(teacherRoute);
app.use(childRoute);
app.use(classRoute);


app.use((req, res, next) => {
  res.status(404).json({ data: "Not Found"});
});

app.use((err, req, res, next) => {
  res.status(500).json({ data: `Error MW ${err}` });
});  
