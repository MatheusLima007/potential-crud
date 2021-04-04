const routes = require("express").Router()
const DeveloperController = require("./app/controllers/DeveloperController")

routes.get('/developers', DeveloperController.index)
routes.get('/developers/:id', DeveloperController.show)
routes.post('/developers', DeveloperController.store)
routes.put('/developers/:id', DeveloperController.update)
routes.delete('/developers/:id', DeveloperController.destroy)

module.exports = routes
