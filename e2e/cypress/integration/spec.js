describe('homepage', () => {
  it('says hello world', () => {
    /* Test Registration */
    cy.visit('/');

    cy.get('.root')
      .should('contain', 'hello world');
  });
});
