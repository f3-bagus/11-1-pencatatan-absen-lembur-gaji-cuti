const { Router } = require('express')
const router = Router()

const Auth = require('../../app/controllers/user')
const AuthMiddleware = require('../../middlewares/auth')
const JobRoleController = require('../../app/controllers/jobrole')

const isBodyNotNull = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.setHeader('Content-Type', 'application/json')
    res.status(400).json({ status: "FAIL", message: 'Body is missing.' })
    return
  }
  next()
}

// ROOT
// register admin
router.post('/admin/register', isBodyNotNull, AuthMiddleware.authorize, AuthMiddleware.isRoot, Auth.registerAdmin)

// ADMIN
// get roles
router.get('/user/roles', AuthMiddleware.authorize, AuthMiddleware.isRootOrAdmin, JobRoleController.findAll)

// register user
router.post('/user/register', AuthMiddleware.authorize, AuthMiddleware.isRootOrAdmin, isBodyNotNull, Auth.register)

// get user
router.get('/user/users', AuthMiddleware.authorize, AuthMiddleware.isRootOrAdmin, Auth.findAll)

// USER
// login user
router.post('/user/login', isBodyNotNull, Auth.login)

// get current user
router.post('/user/current-user', AuthMiddleware.authorize, Auth.currentUser)

// get user notification
router.get('/notifications', AuthMiddleware.authorize, Auth.notification )

module.exports = router