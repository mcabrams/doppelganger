Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('SERVER_GRAPHQL_URL'),
    body: {
      "operationName":"TokenAuth","variables":{"email":"foobar@example.com","password":"foobar1234"},"query":"mutation TokenAuth($email: String!, $password: String!) {\n  tokenAuth(email: $email, password: $password) {\n    ...TokenAuthResponse\n    __typename\n  }\n}\n\nfragment TokenAuthResponse on ObtainJSONWebToken {\n  token\n  __typename\n}\n",
    },
  }).then((resp) => {
    window.localStorage.setItem('loggedIn', true);
  });
});
