const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'lmao',
        author: 'maomao',
        url: 'NIL',
        user: "6218707c6f74f2d21986319c",
        likes: 123
    },
    {
        title: 'maoooo',
        author: 'mini',
        url: 'NIL',
        user: "6218707c6f74f2d21986319c",
        likes: 456
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(e => e.toJSON())
}

const blogsInDbId = async (id) => {
    const blog = await Blog.findById(id)
    return blog.toJSON()
}

module.exports = {
    initialBlogs, blogsInDb, blogsInDbId
}