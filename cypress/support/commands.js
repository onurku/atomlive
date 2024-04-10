// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email="abhishekr700+test@gmail.com" , password = "123456") => {
  cy.request("/api/auth/csrf")
    .then((resp) => {
      console.log(resp);
      cy.request("POST", "/api/auth/callback/credentials?", {
        email: email,
        password: password,
        csrfToken: resp.body.csrfToken
      }).then((resp) => {
        console.log(resp.body);
      });
    })
    .then(() => {
      cy.request("/api/auth/session").then((resp) => {
        console.log(resp.body);
      });
    });
});
