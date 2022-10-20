# Docker

## Building Container

Arguments:
- t: image tag name with version
- f: dockerfile name
- .: shared context (current directory)


```bash
docker build --build-arg REACT_APP_API_BASE_URL=http://localhost:3001/api/v1 -t iron-streams:0.1.0 -f Dockerfile .
```

## Running Containers

### MongoDB

Running mongo as a container
Arguments:
- v: mount volume, this options allows to share a directory from the docker hot with the docker container host/path:container/path
- p: port binding connect host post with the container port host:container
- name: docker container name

```bash
docker run -v tmp:/data/db -p 27017:27017 --name mongo mongo:4.4.5
```

### Express API

Running express API as a container
Arguments:
- env: environment variables
- link: connect this docker container with the mongo container
- p: port binding connect host post with the container port

```bash
docker run --env MONGODB_URI=mongodb://mongo:27017/iron-streams --link mongo -p 3001:3001 iron-streams:0.1.0
```

# Deploy in Heroku using docker

- https://devcenter.heroku.com/articles/container-registry-and-runtime
- https://devcenter.heroku.com/articles/build-docker-images-heroku-yml


```bash
heroku create iron-streams --region eu
heroku stack:set container
heroku container:login

heroku config:set PORT=3001
heroku config:set MONGODB_URI=xxx
heroku config:set SLACK_CLIENT_ID=xxx
heroku config:set SLACK_CLIENT_SECRET=xxx

export DOCKER_DEFAULT_PLATFORM=linux/amd64
heroku container:push --arg REACT_APP_API_BASE_URL=https://iron-streams.herokuapp.com/api/v1 web
heroku container:release web


heroku logs --tail
```
