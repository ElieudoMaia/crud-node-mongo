const User = require('../models/User')
const bcrypt = require('bcrypt')
const { findById } = require('../models/User')

module.exports = {

    index: async (req, res) => {
        try {

            const users = await User.find()

            return res.status(200).json(users)

        } catch (error) {
            console.error(error)
            return res.status(400).json(error)
        }
    },

    show: async (req, res) => {

        try {
            const { id } = req.params

            const user = await User.findById(id)
            if (!user) {
                return res.status(400).json({
                    error: 'User Not found'
                })
            }

            return res.status(200).json(user)

        } catch (error) {
            console.log('Error when trying to find user', error)
            return resp.status(500).json({
                msg: 'Server error when trying to find user',
                error,
            })
        }

    },

    store: async (req, res) => {
        try {

            const { name, email, password } = req.body

            const emailAlreadyExists = await User.findOne({ email })
            if (emailAlreadyExists) {
                return res.status(400).json({
                    error: 'Email already registered'
                })
            }

            const hashPassword = await bcrypt.hash(password, 10)

            const user = await User.create({
                name,
                email,
                password: hashPassword
            })

            return res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email
            })

        } catch (error) {
            console.log(error)

            return res.status(400).json(error)

        }
    },

    update: async (req, res) => {

        const { id } = req.params
        const { name, email } = req.body

        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true })

        if(!user) {
            return res.status(200).json({
                msg: 'User do not found'
            })
        }

        return res.json({
            msg: `User ${user.name} has been successfully updated.`
        })

    },

    delete: async (req, res) => {

        const { id } = req.params

        const user = await User.findByIdAndRemove(id)

        if(!user) {
            return res.status(200).json({
                msg: 'User do not found'
            })
        }

        return res.json({
            msg: `User ${user.name} has been successfully deleted.`
        })

    },

}