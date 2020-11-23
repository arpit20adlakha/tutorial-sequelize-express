module.exports = app => {
    // All our routes will look like this :
    /**
     * /api/tutorials : Get , post, delete
     * /api/tutorials/:id : get, put, delete
     * /api/tutorials/published: get
     */

    const tutorials = require("../controllers/tutorials.controller");

    const router = require("express").Router();

    // Create a tutorial
    router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished)

    // Retrieve a single Tutorial with id
    router.get("/:id",  tutorials.findOne);

    // Update a tutorial with id
    router.put("/:id", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/:id", tutorials.update);

    // Delete all tutorials
    router.delete("/", tutorials.deleteAll);
}