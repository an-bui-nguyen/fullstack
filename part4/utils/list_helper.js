const _ = require("lodash")

const totalLikes = (blogs) => {
  const resultArray = blogs.map(blog => blog.likes)

  function add(accumulator, a) {
    return accumulator + a
  }

  return blogs.length === 0
    ? 0
    : resultArray.reduce(add, 0);

}

const favoriteBlog = (blogs) => {
  const likesArray = blogs.map(blog => blog.likes)
  const maxLike = Math.max(...likesArray)

  return blogs.length === 0
  ? {}
  : blogs.find(blog => {return blog.likes === maxLike})
}

const mostBlogs = (blogs) => {
  const sumBlogs = 
    _(blogs)
      .groupBy('author')
      .map((obj, key) => ({
        'author': key,
        'blogs': Object.values(_.countBy(obj, _.identity))[0]
      }))
      .value()

  const output = _.maxBy(sumBlogs, (obj) => {return obj.blogs})

  return blogs.length === 0
  ? {}
  : output
}

const mostLikes = (blogs) => {
  const sumLikes = 
    _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
        'author': key,
        'likes': _.sumBy(objs, 'likes')
      }))
      .value()

    const output = _.maxBy(sumLikes, (obj) => {return obj.likes})
  return blogs.length === 0
  ? {}
  : output
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}