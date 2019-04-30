module.exports = isUserAuthenticated = (req, res, next) => {
    if (req.user) {
        console.log('Resources access granted because the user is authenticated');
        next()
    } else {
        console.log('Resource access failure!')
        res.status(302).redirect('/login');
    }

}