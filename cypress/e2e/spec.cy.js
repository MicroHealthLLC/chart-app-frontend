describe('Testing KPI Gauge', () => {

  beforeEach(() => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.contains('Hi, Cypress')
    cy.get('div').contains('IT APPS').click({force: true});
    cy.get('[href="/it_apps/gauges"] > .v-list-item__content > .v-list-item__title').click({force: true});
  })

  it('Create a new KPI Gauge', () => {
    cy.get('.mr-2 > .v-btn__content').click({force: true});
    cy.get('[data-cy=notes]').click({force: true}).type('Dog', {force: true});
    cy.get('form').within(() => {
      cy.get('[data-cy=title]').click({force: true}).type('Border Collie', {force: true});
      cy.get('[data-cy="kpi-value"]').click({force: true}).clear().type('27', {force: true});
    })
    cy.get('[data-cy="save"]').click({force: true});
    cy.get('[data-cy="close"]').click({force: true});
    cy.contains('Border Collie')
  })

  it('Update the KPI Gauge', () => {
    cy.get('[data-cy="gauge"]').contains("Border Collie").click({force: true});
    cy.get('form').within(() => {
      cy.get('[data-cy=title]').click({force: true}).type('s', {force: true});
    })
    cy.get('[data-cy="save"]').click({force: true});
    cy.get('[data-cy="close"]').click({force: true});
    cy.contains('Border Collies');
  })
  
  it('Delete the KPI Gauge', () => {
    cy.get('[data-cy="gauge"]').contains("Border Collie").click({force: true});
    cy.get('[data-cy="div-delete"]').get('[data-cy="delete"]').click({force: true});
    cy.get('[data-cy="confirm-delete"]').get('[data-cy="delete-btn"]').click({force: true});
    cy.contains('Border Collies', { matchCase: false });
  })

})