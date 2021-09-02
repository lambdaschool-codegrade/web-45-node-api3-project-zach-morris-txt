//Imports
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


const validateUser = (req, res, next) => {
  // DO YOUR MAGIC
  const { name } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({
      message: 'missing required name field',
    })
  } else {
    req.name = name.trim()
    next()
  }
}
//Didn't Pass Tests???
// const userSchema = yup.object({
//   name: yup.string().required()
// })
// const validateUser = async (req, res, next) => {
//   // DO YOUR MAGIC
//   try {
//     const validatedUser = await userSchema.validate(req.body)
//     req.body = validatedUser
//     next()
//   } catch (err) {
//     next({
//       status:400,
//       message: 'missing required name field',
//       error: err.message,
//     })
//   }
// }


const validatePost = (req, res, next) => {
  // DO YOUR MAGIC
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({
      message: 'missing required text field',
    })
  } else {
    req.text = text.trim()
    next()
  }
}
//Didn't Pass Tests???
// const postSchema = yup.object({
//   text: yup.string().required()
// })
// const validatePost = async (req, res, next) => {
//   // DO YOUR MAGIC
//   try {
//     const validatedPost = await postSchema.validate(req.body)
//     req.body = validatedPost
//     next()
//   }catch (err) {
//     next({
//       status:400,
//       message: 'missing required text field',
//       error: err.message,
//     })
//   }
// }


//Exports; Exposing
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}