require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;

const produtoRoutes = require("./routes/produtoRoutes");
app.use("/", produtoRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
    .connect(DATABASE)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[server] http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("[server] " + error);
    });
