const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({ port: parseInt(process.env.PORT) || 3001});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'client/build',
            redirectToSlash: true,
            index: true
        }
    }
});

server.route( {
    path: '/api/ticket',
    method: 'GET',
    handler: ( request, reply ) => {
      reply({
        name: 'new ticket'
      })
    }
} );
