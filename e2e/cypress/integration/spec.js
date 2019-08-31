it('loads', () => {
  cy.visit('/');
  cy.get('.fw7.mr1')
    .should('contain', 'Hacker News');
});
