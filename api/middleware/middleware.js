//Imports
const yup = require('yup')
const User = require('../users/users-model')


//Middleware
function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`
    Method: ${method},
    URL: ${url},
    Timestamp: ${timestamp}
  `)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
        res.status(404).json({
          message: 'user not found',
        })
    } else {
      req.user = user //Appends 'user' To Req
        next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'Problem Finding User'
    })
  }
}

const userSchema = yup.object({
  name: yup.string().required()
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
  text: yup.string().required()
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