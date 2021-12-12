const { user, literature, collections } = require("../../models");

exports.getCollections = async (req, res) => {
    const { id } = req.params;

    try {
        let data = await collections.findAll({
            where: {
                userId: id,
            },
            include: [
                {
                    model: literature,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                {
                    model: user,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"],
                    },
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId", "literatureId"],
            },
        });

        data = JSON.parse(JSON.stringify(data));

        const newData = data.map((item) => ({
            ...item,
            literature: {
                ...item.literature,
                attache: "http://localhost:5000/upload/" + item.literature.attache,
            },
            user: {
                ...item.user,
                avatar: "http://localhost:5000/upload/" + item.user.photo,
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

exports.addCollections = async (req, res) => {
    try {
        const newCollection = await collections.create(req.body);

        const data = await collections.findOne({
            where: {
                id: newCollection.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        res.send({
            status: "Success",
            message: "Literature has been added to your collection",
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server error",
        });
    }
};

exports.deleteCollections = async (req, res) => {
    const { id } = req.params;

    try {
        await collections.destroy({
            where: {
                id,
            },
        });

        res.send({
            status: "Success",
            message: "Literature has been deleted from your collection",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server error",
        });
    }
};