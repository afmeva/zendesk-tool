export const CREATE_TICKET = 'CREATE_TICKET'

export function createTicket(props) {
  let { subject, description } = props
  fetch('/api/ticket', {
    method: 'POST',
    body: JSON.stringify({ subject, description }),
    headers: {
      'content-type': 'application/json',
    }
  })
  .then(r => r.json())
  .then(console.log)
}
