const { user } = require('../../models')

const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const schema = Joi.object({
        fullname: Joi.string().min(5).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(5).required(),
        gender: Joi.string().required(),
        phone: Joi.string().min(5).required(),
        address: Joi.string().min(1).required(),
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            error: { message: error.details[0].message }
        })
    }

    const allUser = await user.findAll()
    allUser.map(item => {
        if (req.body.fullname === item.fullname) {
            return res.status(400).send({
                status: "failed",
                message: "fullname already exist"
            })
        }
    })

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const { fullname, email, phone, address, gender } = req.body
        const newUser = await user.create({
            fullname,
            email,
            password: hashedPassword,
            gender,
            phone,
            address,
            status: "user"
        })

        const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY)

        res.status(200).send({
            status: "success",
            data: {
                fullname: newUser.fullname,
                email: newUser.email,
                password: newUser.password,
                gender: newUser.gender,
                phone: newUser.phone,
                address: newUser.address,
                token
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            error: { message: error.details[0].message }
        })
    }

    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
        })

        const isPassValid = await bcrypt.compare(req.body.password, userExist.password)

        if (!isPassValid) {
            return res.status(400).send({
                status: "Failed",
                message: "Credential is invalid"
            })
        }

        const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY)
        res.status(200).send({
            status: "Success",
            data: {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                status: userExist.status,
                token
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "Failed",
            message: "Server error"
        })
    }
}

exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id;

        const dataUser = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
        });

        if (!dataUser) {
            return res.status(404).send({
                status: "failed",
            });
        }

        res.send({
            status: "success",
            data: {
                user: {
                    id: dataUser.id,
                    name: dataUser.name,
                    email: dataUser.email,
                    status: dataUser.status,
                },
            },
        });
    } catch (error) {
        console.log(error);
        res.status({
            status: "failed",
            message: "Server Error",
        });
    }
};