import auth0 from 'auth0-js'

class Auth {
  auth = new auth0.WebAuth({
    domain: 'afmeva.auth0.com',
    clientID: 'P2WVQwd43ryGxAM4LWWzes1eZhPOm7lt',
    redirectUri: `${window.location.href}`,
    audience: 'http://localhost:3000/api/ticket',
    responseType: 'token id_token',
    scope: 'openid profile email'
  })

   setSession(authResult) {
    localStorage.setItem('name', authResult.idTokenPayload.name)
    localStorage.setItem('email', authResult.idTokenPayload.email)
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)

    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('expires_at', expiresAt)
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  parseResult(callback) {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        callback()
        return
      }
      this.auth.authorize()
    })
  }
}

export default Auth
