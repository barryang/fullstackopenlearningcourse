const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const { response } = require('express')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
  })
  
blogsRouter.post('/', middleware.getTokenFrom, middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: request.user
    })

    const result = await blog.save()
    request.user.blogs = request.user.blogs.concat(result._id)
    await request.user.save()
    response.status(201).send(result)
})

blogsRouter.delete('/:id',  middleware.getTokenFrom, middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if ( blog.user.toString() === request.user._id.toString() ) {
        const result =  await Blog.findByIdAndDelete(request.params.id)
        response.status(202).json(result)        
    } else {
        return response.status(400).json({ error: "this blog is not owned by you"})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    
    const note = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, note, { new: true})
    response.status(204).json(result)
})

module.exports = blogsRouter