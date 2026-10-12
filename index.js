// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const App = express();

// const { adminRoutes } = require("./App/routes/admin/adminRoutes");
// const { webRoutes } = require("./App/routes/website/webRoutes");
// const { adminModel } = require("./App/models/adminModel");

// // CORS
// App.use(cors());

// // Middleware
// App.use((req, res, next) => {
//   res.setHeader(
//     "Cross-Origin-Opener-Policy",
//     "same-origin-allow-popups"
//   );
//   next();
// });

// App.use(express.json());
// App.use(express.urlencoded({ extended: true }));

// // HOME ROUTE
// App.get("/", (req, res) => {
//   res.status(200).send("Backend is running successfully");
// });

// // ADMIN ROUTES
// App.use("/admin", adminRoutes);

// // WEBSITE ROUTES
// App.use("/web", webRoutes);

// // UPLOAD FOLDERS
// App.use(
//   "/uploads/category",
//   express.static("uploads/category")
// );

// App.use(
//   "/uploads/product",
//   express.static("uploads/product")
// );

// App.use(
//   "/uploads/subcategory",
//   express.static("uploads/subcategory")
// );

// App.use(
//   "/uploads/subsubcategory",
//   express.static("uploads/subsubcategory")
// );

// // MONGODB CONNECTION
// mongoose
//   .connect(process.env.DBCONNECTION)
//   .then(async () => {
//     console.log("MongoDB Connected Successfully");

//     let checkAdmin = await adminModel.findOne();

//     if (!checkAdmin) {
//       await adminModel.insertOne({
//         adminEmail: process.env.ADMINEMAIL,
//         adminPassword: process.env.ADMINPASSWORD,
//       });

//       console.log("Admin created successfully");
//     }
//   })
//   .catch((error) => {
//     console.log("MongoDB Connection Error:", error.message);
//   });

// module.exports = App;


// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");
// const fs = require("fs");

// const App = express();

// const { adminRoutes } = require("./App/routes/admin/adminRoutes");
// const { webRoutes } = require("./App/routes/website/webRoutes");
// const { adminModel } = require("./App/models/adminModel");

// // Absolute upload directory
// const uploadRoot = path.join(process.cwd(), "uploads");

// // Ensure upload folders exist
// [
//     "category",
//     "product",
//     "subcategory",
//     "subsubcategory"
// ].forEach((folder) => {
//     fs.mkdirSync(path.join(uploadRoot, folder), {
//         recursive: true
//     });
// });

// // CORS
// App.use(cors());

// // Middleware
// App.use((req, res, next) => {
//     res.setHeader(
//         "Cross-Origin-Opener-Policy",
//         "same-origin-allow-popups"
//     );
//     next();
// });

// App.use(express.json());
// App.use(express.urlencoded({ extended: true }));

// // HOME ROUTE
// App.get("/", (req, res) => {
//     res.status(200).send("Backend is running successfully");
// });

// // STATIC UPLOADS
// App.use("/uploads", express.static(uploadRoot));

// // ADMIN ROUTES
// App.use("/admin", adminRoutes);

// // WEBSITE ROUTES
// App.use("/web", webRoutes);

// // MONGODB CONNECTION
// mongoose
//     .connect(process.env.DBCONNECTION)
//     .then(async () => {
//         console.log("MongoDB Connected Successfully");

//         const checkAdmin = await adminModel.findOne();

//         if (!checkAdmin) {
//             await adminModel.create({
//                 adminEmail: process.env.ADMINEMAIL,
//                 adminPassword: process.env.ADMINPASSWORD,
//             });

//             console.log("Admin created successfully");
//         }
//     })
//     .catch((error) => {
//         console.log(
//             "MongoDB Connection Error:",
//             error.message
//         );
//     });

// module.exports = App;


require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const App = express();

const { adminRoutes } = require("./App/routes/admin/adminRoutes");
const { webRoutes } = require("./App/routes/website/webRoutes");
const { adminModel } = require("./App/models/adminModel");

// PORT
const PORT = process.env.PORT || 8000;

// UPLOAD DIRECTORY
const uploadRoot = path.join(__dirname, "uploads");

const folders = [
    "category",
    "product",
    "subcategory",
    "subsubcategory"
];

folders.forEach((folder) => {
    fs.mkdirSync(path.join(uploadRoot, folder), {
        recursive: true
    });
});

// CORS
App.use(cors());

// MIDDLEWARE
App.use((req, res, next) => {
    res.setHeader(
        "Cross-Origin-Opener-Policy",
        "same-origin-allow-popups"
    );
    next();
});

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// HOME ROUTE
App.get("/", (req, res) => {
    res.status(200).send("Backend is running successfully");
});

// STATIC IMAGE ROUTES
App.use("/uploads", express.static(uploadRoot));

// ADMIN ROUTES
App.use("/admin", adminRoutes);

// WEBSITE ROUTES
App.use("/web", webRoutes);

// MONGODB CONNECTION
mongoose
    .connect(process.env.DBCONNECTION)
    .then(async () => {
        console.log("MongoDB Connected Successfully");

        const checkAdmin = await adminModel.findOne();

        if (!checkAdmin) {
            await adminModel.create({
                adminEmail: process.env.ADMINEMAIL,
                adminPassword: process.env.ADMINPASSWORD
            });

            console.log("Admin created successfully");
        }
    })
    .catch((error) => {
        console.error(
            "MongoDB Connection Error:",
            error.message
        );
    });

// START SERVER
App.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
   
module.exports = App;