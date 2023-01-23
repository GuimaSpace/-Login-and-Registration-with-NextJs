const tb_User = require("../models/Users")
const bcrypt = require("bcrypt")
const localStrategy = require("passport-local").Strategy
const passport = require("passport")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'username', passwordField: 'password'}, (username, password, done) =>{
        tb_User.tb_User.findOne({where: {User_Name: username}}).then((UserValues) =>{
            if (!UserValues) {
                console.log("Esta conta não existe")
                return done(null, false, {message: "Esta conta não existe"})   
            }

            bcrypt.compare(password, UserValues.User_Password, function(err, res) {
                if (err){
                  // handle error
                }
                if (res) {
                    return done(null, UserValues)
                } else {
                    console.log("Senha incorreta, Senha informada: " + password + " Senha do usuario: " + UserValues.User_Password + " Variavel password: " + typeof(password))
                    return done(null, false, {message: "Senha incorreta"})
                }
              });


        })
    }))

    passport.serializeUser((UserValues, done) => {
        done(null, UserValues.id)
    })

        passport.deserializeUser(function (id, done) {
            tb_User.tb_User.findOne({ where: { id: id } }).then((user) => {
              done(null, user)
            })
          })  
        }