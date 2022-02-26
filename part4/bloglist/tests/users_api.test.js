const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./user_test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/users')

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = helper.initialUsers
        .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

test('username length at least 3', async () => {
    const newUser = {
        username: "hi",
        name: "mini",
        password: "1234"
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('password length at least 3', async () => {
    const newUser = {
        username: "asd",
        name: "mamao",
        password: "12"
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('username is unique', async () => {
    const newUser = {
        username: "thatonecat",
        name: "mamao",
        password: "1234"
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})