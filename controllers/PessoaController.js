const database = require('../models')

class PessoaController {
   static async pegaTodasAsPessoas (req,res){
   try {
    const todasPessoas = await database.Clientes.findAll()
    return res.status(200).json(todasPessoas)
   } catch (error) {
    return res.status(500).json(error.message)
   } 
    }
}

module.exports = PessoaController;