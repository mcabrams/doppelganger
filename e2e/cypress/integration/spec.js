it('loads', () => {
  cy.visit('/');
  cy.get('[data-testid=site-heading]')
    .should('contain', 'Hacker News');
});
