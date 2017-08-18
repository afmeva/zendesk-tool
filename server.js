require('isomorphic-fetch')

const Hapi = require('hapi')
const Inert = require('inert')
const btoa = require('btoa')
const hapiJwt = require('hapi-auth-jwt2')

const server = new Hapi.Server()
server.connection({ port: parseInt(process.env.PORT) || 3001})

server.start((err) => {
    if (err) {
        throw err
    }
    console.log(`Server running at: ${server.info.uri}`)
})

server.register(Inert, () => {})

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
})
server.register(hapiJwt, (err) => {

  server.auth.strategy('jwt', 'jwt', {
    key: 'XG0hsiT2hmgLr2xNlv3yedpoSmPP2uu3',
    validateFunc: (decode, request, callback) => {
      return callback(null, true)
    },
    verifyOptions: {
      algorithms: ['HS256'],
    }
  })

  server.route( {
      path: '/api/ticket',
      method: 'POST',
      config: {
        auth: {
          strategy: 'jwt'
        }
      },
      handler: ( request, reply ) => {
        let {
          subject,
          description,
          submitter_name,
          submitter_email,
          costumer_name,
          costumer_email} = request.payload

        fetch('https://test271.zendesk.com/api/v2/users/create_or_update.json', {
          method: 'POST',
          body: JSON.stringify({
            user: {
              name: submitter_name, 
              email: submitter_email,
              role: 'agent'
            }
          }),
          headers: {
            'content-type': 'application/json',
            'Authorization': `Basic ${btoa('afmeva@gmail.com/token:Q0x34dNrOWnfr57RIPR75oedumaLIuwzV9yGKkLg')}`
          }
        })
        .then(response => response.json())
        .then(({user}) => {
            createTicket(user.id, costumer_name, costumer_email, subject, description, reply)
        })
        .catch(console.error) // erros should be handled

      }
  } )
})


function createTicket(submitterId, name, email, subject, description, callback) {
  fetch('https://test271.zendesk.com/api/v2/tickets.json', {
    method: 'POST',
    body: JSON.stringify({
      ticket: {
        subject,
        comment:  { body: description },
        submitter_id: submitterId,
        assignee_id: submitterId,
        requester: {
          name,
          email
        }
      }
    }),
    headers: {
      'content-type': 'application/json',
      'Authorization': `Basic ${btoa('afmeva@gmail.com/token:Q0x34dNrOWnfr57RIPR75oedumaLIuwzV9yGKkLg')}`
    }
  })
  .then(response => response.json())
  .then(callback)
}
