require('isomorphic-fetch')

const Hapi = require('hapi');
const Inert = require('inert');
const btoa = require('btoa');

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
    method: 'POST',
    handler: ( request, reply ) => {
      let { subject, description } = request.payload

      fetch('https://test271.zendesk.com/api/v2/tickets.json', {
        method: 'POST',
        body: JSON.stringify({
          ticket: {
            subject: subject,
            comment:  { body: description }
          }
        }),
        headers: {
      		'content-type': 'application/json',
          'Authorization': `Basic ${btoa('afmeva@gmail.com/token:Q0x34dNrOWnfr57RIPR75oedumaLIuwzV9yGKkLg')}`
      	}
      })
      .then(response => response.json())
      .then(reply)
    }
} );
