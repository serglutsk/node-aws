const express = require('express')
const app = express()
const PORT = process.env.APP_PORT ?? 3000
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const router= require(process.env.APP_PATH+'../routes/postRoutes')

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true,
}))
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"
// app.use('/api', router);
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error to the console
    res.status(500).json({ error: "Internal Server Error" }); // Send a 500 Internal Server Error response
});

app.get('/',(req,res)=>{
    res.send('Hello here!!!')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

})