describe('quiz', () => {
  it('finds doppelganger', () => {
    cy.get('[data-testid=find-doppelganger-nav-link]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/login');

    cy.login();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/find-doppelganger');

    cy.get('[data-testid=find-doppelganger-heading]')
      .should('be.visible')
      .should('have.text', 'Find Your Doppelganger');

    cy.get('[data-testid=doppelganger-score]')
      .should('be.visible')
      .should('have.text', '50%');
  });
});
