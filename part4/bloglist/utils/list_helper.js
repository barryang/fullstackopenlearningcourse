const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const compare = (high, item) => {
        return (high.likes < item.likes) ? item : high
    }
    return blogs.reduce(compare, {likes: 0})
}

const mostBlogs = (blogs) => {
    d = {}
    ma = {author: "", blogs: 0}
    blogs.forEach(e => {
        if (`${e.author}` in d){
            d[e.author] += 1
        } else {
            d[e.author] = 1
        }

        ma = (ma.blogs < d[e.author]) ? {author: e.author, blogs: d[e.author]} : ma
    })
    return ma
}

const mostLikes = (blogs) => {
    d = {}
    ma = {author: "", likes: 0}
    blogs.forEach(e => {
        if (`${e.author}` in d){
            d[e.author] += e.likes
        } else {
            d[e.author] = e.likes
        }

        ma = (ma.likes < d[e.author]) ? {author: e.author, likes: d[e.author]} : ma
    })
    return ma
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}