const request = require('supertest')

const app = require('../../src/app')
const { Developer } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('Search /GET developers', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('espera que retorne um status 400 por nao ter desenvolvedor no banco de dados', async () => {
        const response = await request(app)
            .get("/developers")

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 200 apos criar um desenvolvedor no banco de dados', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .get("/developers")

        expect(response.status).toBe(200)
    })

    it('espera que retorne um status 400 apos passar paginacao inexistente', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .get("/developers?page=2")

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 200 apos passar paginacao existente', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .get("/developers?page=1")

        expect(response.status).toBe(200)
    })
})

describe('Search /GET developers/{id}', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('espera que retorne um status 400 apos enviar um parametro id que nao existe no banco de dados', async () => {
        const response = await request(app)
            .get("/developers/1")

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 200 apos enviar um parametro id que existe no banco de dados', async () => {
        const developer = await Developer.create({
               name: "matheus lima",
               sexo: "m",
               idade: 19,
               hobby: "programacao e jogos",
               datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .get(`/developers/${developer.id}`)

        expect(response.status).toBe(200)
    })
})

describe('Create /POST developers', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar com nome em branco', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "",
                sexo: "m",
                idade: 19,
                hobby: "programacao e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar com sexo em branco', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "matheus lima",
                sexo: "",
                idade: 19,
                hobby: "programacao e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar com idade em branco', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: '',
                hobby: "programacao e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar com hobby em branco', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar com datanascimento em branco', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "programacao e jogos",
                datanascimento: ""
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar name com menos de 3 caracteres', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "ma",
                sexo: "m",
                idade: 19,
                hobby: "programacao e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar hobby com menos de 5 caracteres', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "prog",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar a datanascimento incompativel com a idade', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "programacao e jogos",
                datanascimento: "2003-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 200 apos enviar um desenvolvedor para salvar', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "programacao e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(201)
    })
})

describe('Update /PUT developers/{id}', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('espera que retorne um status 400 apos enviar um update de desenvolvedor com id que nao existe no banco de dados', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .put("/developers/2")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "programacao, esportes e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar com nome em branco', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "",
                sexo: "m",
                idade: 19,
                hobby: "programacao, esportes e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar com sexo em branco', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "matheus lima",
                sexo: "",
                idade: 19,
                hobby: "programacao, esportes e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar com idade em branco', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: '',
                hobby: "programacao, esportes e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar com hobby em branco', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para ataulizar com datanascimento em branco', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "programacao, esportes e jogos",
                datanascimento: ""
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar name com menos de 3 caracteres', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "ma",
                sexo: "m",
                idade: 19,
                hobby: "programacao, esportes e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar hobby com menos de 5 caracteres', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "prog",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para ataulizar a datanascimento incompativel com a idade', async () => {
        await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "programacao, esportes e jogos",
                datanascimento: "2003-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 200 apos enviar um desenvolvedor para atualizar', async () => {
        const developer = await Developer.create({
            name: "matheus lima",
            sexo: "m",
            idade: 19,
            hobby: "programacao e jogos",
            datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .put(`/developers/${developer.id}`)
            .send({
                name: "matheus lima",
                sexo: "m",
                idade: 19,
                hobby: "programacao, esportes e jogos",
                datanascimento: "2001-06-03"
            })

        expect(response.status).toBe(200)
    })
})

describe('Delete /delete developers/{id}', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('espera que retorne um status 400 apos enviar um parametro id que nao existe no banco de dados', async () => {
        const response = await request(app)
            .delete("/developers/1")

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 200 apos enviar um parametro id que existe no banco de dados', async () => {
        const developer = await Developer.create({
               name: "matheus lima",
               sexo: "m",
               idade: 19,
               hobby: "programacao e jogos",
               datanascimento: "2001-06-03"
        })

        const response = await request(app)
            .delete(`/developers/${developer.id}`)

        expect(response.status).toBe(204)
    })
})