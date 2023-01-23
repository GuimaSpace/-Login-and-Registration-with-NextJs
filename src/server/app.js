const express = require("express")
const boddParser = require("body-parser")
const cors = require("cors")
const passport = require("passport")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const User = require("./models/Users")
const Conn = require("./models/db")
const app = express()
const SequelizeStore = require('connect-session-sequelize')(session.Store)//add .Store pls
const sessionStore = new SequelizeStore({
    db: Conn.db_guimaraes,
    collection: 'sessions'//session table
})
/*  sessionStore.sync({forced:true})  */

    //Config
    app.use(boddParser.json())
    app.use(boddParser.urlencoded({extended: true}))
    app.use(session({
        secret: "chavesecreta",
        resave: true,
        store: sessionStore,
        saveUninitialized: true,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if S from reading the cookie 
            maxAge: null // session max age in miliseconds
        }

    }))

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    app.use(cookieParser("secreto"))
    
    app.use(passport.initialize())
    app.use(passport.session())
    require("./config/auth")(passport)


//Routes
app.post('/login', (req,res,next) => {
    passport.authenticate('local', (err, user, info) =>{
        if (err) {throw err}
        if(!user){res.send('no user exists')}
        if(user){
            req.login(user, (err) =>{
                if (err) {throw err}
                res.send(req.user)
                console.log("Usuario logado com sucesso")
            })
        }
    })(req,res,next)
})

app.get("/getUser", (req,res) =>{
    res.send(req.user)
})


app.post('/register', (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.genSalt(10, (err, salt) =>{
    User_Password = password
    bcrypt.hash(password, salt, (erro, hash) =>{
    encryptedpass = hash
    User.RegisterUser(username,encryptedpass)

    })
  })
})


app.listen("8080", ()=>{
    console.log("Servidor iniciado porta 8080")
})
