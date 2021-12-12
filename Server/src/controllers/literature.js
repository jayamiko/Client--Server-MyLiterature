const { literature, user } = require("../../models");

const Joi = require("joi");

exports.getLiterature = async (req, res) => {
    const { id } = req.params;

    try {
        let data = await literature.findOne({
            where: {
                id,
            },
            include: {
                model: user,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        data = JSON.parse(JSON.stringify(data));

        const newData = {
            ...data,
            attache: "http://localhost:5000/upload/" + data.attache,
        };

        res.send({
            status: "Success",
            data: newData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server error",
        });
    }
};

exports.getLiteratures = async (req, res) => {
    try {
        let data = await literature.findAll({
            include: {
                model: user,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            order: [['updatedAt', 'DESC']]
        });

        data = JSON.parse(JSON.stringify(data));

        const newData = data.map((item) => ({
            ...item,
            attache: {
                filename: item.attache,
                url: "http://localhost:5000/upload/" + item.attache,
            },
        }));

        res.send({
            status: "Success",
            data: newData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server error",
        });
    }
};

exports.getSearch = async (req, res) => {
    const titleQuery = req.query.title;
    const { Op } = require("sequelize");

    try {
        let data = await literature.findAll({
            where: {
                title: {
                    [Op.substring]: titleQuery,
                },
            },
            include: {
                model: user,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId"],
            },
        });

        data = JSON.parse(JSON.stringify(data));

        const newData = data.map((item) => ({
            id: item.id,
            title: item.title,
            publication_date: item.publication_date,
            pages: item.pages,
            isbn: item.isbn,
            author: item.author,
            status: item.status,
            attache: "http://localhost:5000/upload/" + item.attache,
            user: item.user,
        }));

        res.send({
            status: "Success",
            data: newData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server error",
        });
    }
};

exports.getLiteraturesProfile = async (req, res) => {
    const { id } = req.params;

    try {
        let data = await literature.findAll({
            where: {
                userId: id,
            },
            include: {
                model: user,
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId"],
            },
        });

        data = JSON.parse(JSON.stringify(data));

        const newData = data.map((item) => ({
            id: item.id,
            title: item.title,
            publication_date: item.publication_date,
            pages: item.pages,
            isbn: item.isbn,
            author: item.author,
            status: item.status,
            attache: "http://localhost:5000/upload/" + item.attache,
            user: item.user,
        }));

        res.send({
            status: "Success",
            data: newData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server error",
        });
    }
};


exports.addLiterature = async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        userId: Joi.number().required(),
        publication_date: Joi.date(),
        pages: Joi.number(),
        isbn: Joi.string().min(9).max(15),
        author: Joi.string().min(4),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        console.log(error);
        return res.status(400).send({
            status: "Failed",
            message: error.details[0].message,
        });
    }

    try {
        const newLiterature = await literature.create({
            ...req.body,
            attache: req.file.filename,
            status: "Waiting Approve",
        });

        let data = await literature.findOne({
            where: {
                id: newLiterature.id,
            },
            include: {
                model: user,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId"],
            },
        });
        console.log(data);
        data = JSON.parse(JSON.stringify(data));

        const newData = {
            ...data,
            attache: "http://localhost:5000/upload/" + data.attache,
        };

        res.send({
            status: "Success",
            message: "Literature has successfully added",
            data: newData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server error",
        });
    }
};

exports.updateLiterature = async (req, res) => {
    const { id } = req.params;

    try {
        await literature.update(req.body, {
            where: {
                id,
            },
        });

        let data = await literature.findOne({
            where: {
                id,
            },
            include: {
                model: user,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId"],
            },
        });

        data = JSON.parse(JSON.stringify(data));

        const newData = {
            ...data,
            attache: "http://localhost:5000/upload/" + data.attache,
        };

        res.send({
            status: "Success",
            message: "Updated status has succesfully",
            data: newData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server error",
        });
    }
};

exports.deleteLiterature = async (req, res) => {
    try {
        const { id } = req.params;
        await literature.destroy({
            where: { id },
        });
        res.send({
            status: "success",
            message: `delete trip id ${id} success`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error",
        });
    }
};