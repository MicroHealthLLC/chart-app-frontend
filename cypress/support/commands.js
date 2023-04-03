// Login command
Cypress.Commands.add("login", (email, password) => {
  cy.once('uncaught:exception', () => false); //ignored a warning message in cypress

  cy.visit('/')
  cy.get('form').within(() => {
    cy.get('[data-cy=username]').type(email,{force: true}).should('have.value', email) // Only yield inputs within form
    cy.get('[data-cy=password]').type(password, {force: true}).should('have.value', password)
  })
  cy.get('[data-cy=login]').click({force: true})
})
