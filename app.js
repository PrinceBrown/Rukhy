const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');

//Keys Import
const KEYS = require('./config/keys');
//SERVICES IMPORT
const GoogleOauthServices = require('./config/passport');
//ROUTES Imports
const adminRoute = require('./routes/admin/admin');
const customerRoute = require('./routes/customer/customer');

// --- Database setup
mongoose.connect(KEYS.MONGO_URI, {
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', (error) => {
    if (error) throw error;
})
db.once('open', () => {
    console.log('Database Connected Successfully');
})
// <---- END OF DATABASE SETUP ---->

//Cookie & Authentication Setup
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [KEYS.COOKIE_KEY]
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(GoogleOauthServices) //Google Pasport services

// <----END OF AUTHENTICATION && COOKIE SETUP ------>

//ROUTES
app.get('/login', (req, res, next) => {
    res.status(200).send('Login');
})
app.use('/admin', adminRoute)
app.use(customerRoute);


//LOGOUT ROUTE
app.get('/logout', (req, res, next) => {
    req.logOut();
    console.log('User session has been terminated and logged out!');
    res.status(200).send('Logout successful')
})

//404 default middleware route
app.use((req, res, next) => {
    console.log('404 Route');
    res.status(404).send('404 - Page not found');
})


//Server Listening 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})