# Docker Node.js Proxy Server

Simple reverse proxy with dynamic routing

## Getting Started

1. Run `docker build --tag josefaidt/proxy:latest github.com/josefaidt/docker-nodejs-proxy.git`
2. Start the container

   ```shell
   docker run --name proxy \
     --hostname APP_PROXY \
     -p 3000:3000 \
     -e route_proxy_request="http://172.20.0.1:3001/request" \
     -e route_proxy_metrics="http://172.20.0.2:3002/metrics" \
     -e route_redirect_watch="https://app.plex.tv/" \
     josefaidt/my-proxy-app
   ```

### Route Nomenclature

- `route_proxy_request="http://172.20.0.1:3001/request"`
  - `route`: defines this will be a route on the server, without it the route will not be added
  - `proxy`: sets the route _type_
  - `request`: name of the path
  - `http://172.20.0.1:3001/request`: value of the destination path
