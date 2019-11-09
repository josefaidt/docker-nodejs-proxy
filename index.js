const path = require('path')
const express = require('express')
const httpProxy = require('http-proxy')

const app = express()
const apiProxy = httpProxy.createProxyServer()

const config = {
  port: 3000,
}

const getRoutes = env => {
  const result = []
  for (const [name, value] of Object.entries(process.env)) {
    if (name.startsWith('route_')) {
      // strip the route config from the env
      const route = {
        type: name.split('_')[1].toLowerCase(),
        path: name
          .split('_')
          .slice(2)
          .join('-')
          .toLowerCase(),
        destination: value,
      }

      result.push(route)
    }
  }
  return result
}

const routes = getRoutes(process.env)

// TODO: write routes to index.html file
app.use('/', express.static('public'))

routes.forEach(route => {
  switch (route.type) {
    case 'proxy': {
      app.get(`/${route.path}`, (req, res) => {
        console.log(`proxying to ${route.path} service`)
        apiProxy.web(req, res, { target: route.destination })
      })
      break
    }
    case 'redirect': {
      app.use(`/${route.path}`, (req, res) => {
        console.log(`redirecting to ${route.path} service`)
        res.redirect(route.destination)
      })
      break
    }
    default:
      throw new Error('Unknown route type, exiting...')
  }
})

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(config.port, () => console.info(`Listening on PORT ${config.port}`))
