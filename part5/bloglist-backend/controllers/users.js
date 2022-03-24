const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if (password.length < 3) {
        return response.status(400).json({error: "password length is less than 3"})
    }
    const checkuser = await User.findOne({username: username})
    if (checkuser) {
        return response.status(400).json({error: `username has been used`, user: checkuser})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1})
    response.status(200).json(users)
})

module.exports = usersRouter