module.exports = app => {
    const tutorials = require("../controllers/tutorials.controller");

    const router = require("express").Router();

    // Create a tutorial
    router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get()

}