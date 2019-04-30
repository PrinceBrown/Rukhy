const express = require('express');
const router = express.Router();

//Check Authentiction Function Import
const isUserAuthenticated = require('../../config/ensureAuthentication');

router.get('/login', (req, res, next) => {
    res.status(200).send('LOGIN - ADMIN')
})

//Protected Routes Middleware
router.use(isUserAuthenticated, (req, res, next) => {
    if (req.user.userType === 'admin') {
        console.log('Admin resource granted true because the user is authenticated...')
        next()
    } else {
        console.log('Resource access failure!')
        res.status(302).redirect('/admin/login');
    }
})

router.get('/', (req, res, next) => {
    res.status(200).send('Admin - dashboard')
})

router.get('/add-product', (req, res, next) => {
    res.status(200).send('Add products page')
})




module.exports = router;