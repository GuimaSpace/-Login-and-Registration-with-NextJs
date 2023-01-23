const db = require("./db");

const tb_User = db.db_guimaraes.define('tb_User',{
    User_Name: {
    type: db.Sequelize.STRING
    },
    User_Password:{
    type: db.Sequelize.STRING,
    },
    eAdmin:{
    type: db.Sequelize.INTEGER,
    default: 0
    }
})


function RegisterUser(username,encryptedpass) {
    tb_User.create({
        User_Name: username,
        User_Password: encryptedpass
    }).then(function(){
        console.log("cadastrado com sucesso")
    }).catch(function(erro){
        console.log("Ocorreu um erro interno" + erro)

    })
}


//criar tabela, executar apenas uma vez, depois comentar para não criar mais uma vez
/* tb_User.sync({force: true})   */

module.exports = {tb_User, RegisterUser}