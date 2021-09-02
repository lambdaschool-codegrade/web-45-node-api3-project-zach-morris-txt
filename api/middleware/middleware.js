//Imports
const yup = require('yup')
const User = require('../users/users-model')


//Middleware
function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`
    Method: ${req.method},
    URL: ${req.url},
    Timestamp: ${req.timestamp}
  `)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  User.getById(req.params.id)
    .then(possibleUser => {
      if (possibleUser) {
        req.user = possibleUser //Appends 'user' To Req
        next()
      } else {
        next({
          status: 404,
          message: 'user not found',
        })
      }
    })
    .catch(next)
}

const userSchema = yup.object({
  name: yup.string().unique().required()
})
const validateUser = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const validatedUser = await userSchema.validate(req.body)
    req.body = validatedUser
    next()
  } catch (err) {
    next({
      status:400,
      message: 'missing required name field',
      error: err.message,
    })
  }
}

const postSchema = yup.object({
  text: yup.text().required()
})
const validatePost = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const validatedPost = await postSchema.validate(req.body)
    req.body = validatedPost
    next()
  }catch (err) {
    next({
      status:400,
      message: 'missing required text field',
      error: err.message,
    })
  }
}


//Exports; Exposing
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}