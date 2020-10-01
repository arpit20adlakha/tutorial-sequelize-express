const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

Tutorial.create(tutorial).then(data => {
    res.status(200).send(data);
}).catch( err => {
    res.status(500).send({
        message: err.message || "Some error occured while creating the tutorial"
    })
});
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? {title: {[Op.like]: `%${title}`}} : null;
    Tutorial.findAll({where: condition})
        .then(data => {
        res.status(200).send(data);
    })
        .catch( err => {
        res.status(500).send({message: err.message || "Some error occured while retrieving tutorials"});
    });
};

exports.findOne = (req, res) => {
const id = req.params.id;

Tutorial.findByPk(id).then(data => {
    res.status(200).send(data)
}).catch( err => {
    res.status(500).send({message: err.message || "Some error occured while retrieving Tutorial with id=" + id});
})

};

exports.update = (req, res) => {
const id = req.params.id;

Tutorial.update(req.body, {
    where: {id : id}
}).then(num => {
    if (num == 1) {
        res.send({
            message: "Tutorial was updated successfully"
        })
    }
})
    .catch(err => {
        res.status(500).send({
            message : "Error updating Tutorial with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: {id : id}
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Tutorial was deleted successfully!"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id="+ id
        });
    })
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: `${nums} Tutorials were deleted successfully!`
        })
        .catch(err => {
            res.status(500).send({
                message : err.message ||  "Some error occurred while removing all tutorials."
            })
        })
    })
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({where: {published: true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving tutorials."
            });
        });
};