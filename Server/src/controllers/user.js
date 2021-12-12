const { user } = require('../../models');
const fs = require("fs");

exports.getUsers = async (req, res) => {
    const id = req.user
    try {
        let data = await user.findAll({
            attributes: {
                exclude: ["updatedAt", "createdAt", "password"]
            }
        })

        const dataUsers = []
        for (let i = 0; i < data.length; i++) {
            let j = {
                id: data[i].id,
                fullname: data[i].fullname,
                email: data[i].email,
                gender: data[i].gender,
                status: data[i].status,
                phone: data[i].phone,
                address: data[i].address,
                photo: "http://localhost:5000/upload/" + data[i].photo
            }
            dataUsers.push(j)
        }

        res.send({
            status: "success",
            data: dataUsers
        })
    } catch (error) {
        console.log(error);
        res.status(500), send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        let data = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
        });

        data = JSON.parse(JSON.stringify(data));

        const photo = data.photo
            ? "http://localhost:5000/upload/" + data.photo
            : null;

        const newData = {
            ...data,
            photo: photo,
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

exports.addUsers = async (req, res) => {
    try {
        await user.create(req.body)
        res.send({
            status: "success",
            message: "Add User Succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500), send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;

    const data = { photo: req.file.filename };

    try {
        const userData = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        if (userData.photo) {
            fs.unlink("upload/" + userData.photo, (err) => {
                if (err) throw err;
            });
        }

        await user.update(data, {
            where: {
                id,
            },
        });

        let updatedData = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
        });

        updatedData = JSON.parse(JSON.stringify(updatedData));
        const newUpdatedData = {
            ...updatedData,
            photo: "http://localhost:5000/upload/" + updatedData.photo,
        };

        res.send({
            status: "Success",
            message: "photo has successfully changed",
            data: newUpdatedData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server error",
        });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await user.destroy({
            where: {
                id
            }
        })
        res.send({
            status: "success",
            message: "Deleted Succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500), send({
            status: "Failed",
            message: "Deleted is Failed"
        })
    }
}