const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blog returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Check prop of id', async () => {
    let response = await api.get('/api/blogs')
    blog = response.body[0]
    console.log(blog)
    expect(blog["id"]).toBeDefined()
})

test('create new blog', async () => {
    const newBlog = {
        title: "hello",
        author: "Barry Ang",
        url: "NIL",
        likes: 1234
    }
    
    const res = await api.post('/api/login').send({username: "thatonecat", password: "12345"})

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set("Authorization", `bearer ${res.body.token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain(
        'hello'
    )
})

test('autoset likes to 0 if not set', async () => {
    const newBlog = {
        title: "hell",
        author: "Barry Ang",
        url: "NIL",
    }

    const res = await api.post('/api/login').send({username: "thatonecat", password: "12345"})

    let response = await api
                    .post('/api/blogs')
                    .send(newBlog)
                    .set("Authorization", `bearer ${res.body.token}`)
                    .expect(201)
                    .expect('Content-Type', /application\/json/)

    
    expect(response.body.likes).toEqual(0)
})

test('verify if title and url properties', async () => {
    const newBlog = {
        author: "Barry Ang"
    }

    const res = await api.post('/api/login').send({username: "thatonecat", password: "12345"})

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set("Authorization", `bearer ${res.body.token}`)
        .expect(400)

})

test('test jwt token error', async () => {
    const newBlog ={
        title: "hell",
        author: "Barry Ang",
        url: "NIL",
        like: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})
