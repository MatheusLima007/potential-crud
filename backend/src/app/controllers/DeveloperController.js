const { Developer } = require('../models')
const { validName, validSexo, validIdade, validHobby, validDataNascimento } = require('../../utils/validation')

class DeveloperController {
    async index(req, res) {
        const limit = 8
        const data = req.query
        let page = data.page - 1 || 0

        const developers = await Developer.findAndCountAll({
            limit: limit, 
            offset: page * limit 
        }) 

        if(!developers || developers.length == 0) {
            return res.status(400).json({ message: 'Developers not found' })
        }

        return res.status(200).json({ developers, page, limit })
    }

    async show(req, res) {
        const { id } = req.params

        const developer = await Developer.findOne({ 
            where: {
                id: id
            }
        }) 

        if(!developer || developer.length == 0) {
            return res.status(400).json({ message: 'Developer not found' })
        }

        return res.status(200).json({ developer })
    }

    async store(req, res) { 
        const { name, sexo, idade, hobby, datanascimento } = req.body

        try {
            validName(name, 'invalid name, type at least 3 letters')
            validSexo(sexo, 'please type a sexo')
            validIdade(idade, 'idade invalid')
            validHobby(hobby, 'invalid hobby, type at least 5 letters')
            validDataNascimento(datanascimento, idade,'date of birth invalid, does not match the informed age')

            const developer = await Developer.create({ name, sexo, idade, hobby, datanascimento }) 

            return res.status(201).json({ developer })
        } catch (msg) {
            return res.status(400).json({ message: msg })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { name, sexo, idade, hobby, datanascimento } = req.body

        const developerId = await Developer.findOne({ 
            where: {
                id: id
            }
        }) 

        if(!developerId || developerId.length == 0) {
            return res.status(400).json({ message: 'Developer not found' })
        }

        try {
            validName(name, 'invalid name, type at least 3 letters')
            validSexo(sexo, 'sexo invalid')
            validIdade(idade, 'idade invalid')
            validHobby(hobby, 'invalid hobby, type at least 5 letters')
            validDataNascimento(datanascimento, idade,'date of birth invalid, does not match the informed age')

            const developer = await Developer.update({ name, sexo, idade, hobby, datanascimento }, {
                where: {
                    id: id
                }
            }) 

            return res.status(200).json({ developer })
        } catch (msg) {
            return res.status(400).json({ message: msg })
        }
    }

    async destroy(req, res) {
        const { id } = req.params

        const developer = await Developer.destroy({ 
            where: {
                id: id
            }
        }) 

        if(!developer || developer.length == 0) {
            return res.status(400).json({ message: 'Developer not found' })
        }

        return res.status(204).json({ developer })
    }
}

module.exports = new DeveloperController()

