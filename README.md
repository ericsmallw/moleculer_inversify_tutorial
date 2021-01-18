[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# moleculer-inversify-tutorial
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

### STEP 1 - Basic Installation Instructions for development
- Install moleculer-cli `npm -i moleculer-cli -g`
- Install and run nats https://nats.io/download/nats-io/nats-server/
- Install and run mongodb https://www.mongodb.com/try/download/community?tck=docs_server
#### Run with docker
- Install Docker https://www.docker.com/get-started
- Run command `yarn dc:up`

#### STEP 2 - Creating Auth Service And Installing Inversify
- Install mongoist `yarn add mongoist`
- Install bcrypt `yarn add bycrypt` then `yarn add @types/bcrypt`
- Install randomstring `yarn add randomstring` then `yarn add @types/randomstring`
- Install reflect-metadata `yarn add reflect-metadata`
- Create a new folder in the services folder named shared-interfaces
- Create a file in the shared-interfaces folder called IRestBase, which will contains the definitions for the basic CRUD functions
- Create a new folder in the services folder named auth.
- In the es lint file change "@typescript-eslint/no-empty-interface" from "error" to "warn"
- Create a new file inside that folder called auth.service.ts, this can be based of the existing template service file
greeter.services.ts
- In the es lint file change "prefer-arrow/prefer-arrow-functions" from "error" to "warn"
- Install inversify 
- Add "experimentalDecorators": true to tsconfig compilerOptions - for inversify
- Create proper interfaces and implementations in auth subfolders
- Create db.ts folder and config folder with db login details
- Create errors file in auth folder for standard error text.
- Create error-types file in services folder to standard type definitions.
- Create inversify.config.ts file and define the concrete implementations of the interfaces

## Usage
Start the project with `npm run dev` command. 
After starting, open the http://localhost:3000/ URL in your browser. 
On the welcome page you can test the generated services via API Gateway and check the nodes & services.

In the terminal, try the following commands:
- `nodes` - List all connected nodes.
- `actions` - List all registered service actions.
- `call greeter.hello` - Call the `greeter.hello` action.
- `call greeter.welcome --name John` - Call the `greeter.welcome` action with the `name` parameter.
- `call products.list` - List the products (call the `products.list` action).


## Services
- **api**: API Gateway services
- **greeter**: Sample service with `hello` and `welcome` actions.
- **products**: Sample DB service. To use with MongoDB, set `MONGO_URI` environment variables and install MongoDB adapter with `npm i moleculer-db-adapter-mongo`.

## Mixins
- **db.mixin**: Database access mixin for services. Based on [moleculer-db](https://github.com/moleculerjs/moleculer-db#readme)


## Useful links

* Moleculer website: https://moleculer.services/
* Moleculer Documentation: https://moleculer.services/docs/0.14/

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose
