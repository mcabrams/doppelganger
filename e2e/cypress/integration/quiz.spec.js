describe('quiz', () => {
  it('cycles to next question after answering', () => {
    cy.login();
    cy.get('[data-testid=quiz-nav-link]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/quiz');

    cy.get('[data-testid=quiz-heading]')
      .should('be.visible')
      .should('have.text', 'Quiz');

    cy.get('[data-testid=quiz-question-text]')
      .should('be.visible')
      .should('have.text', 'Who would win - Darth Vader or Darth Maul?');

    cy.get('[data-testid=quiz-answers]')
      .children()
      .should($answers => {
        expect($answers).to.have.length(2);
        expect($answers.eq(0)).to.contain('Darth Maul');
        expect($answers.eq(1)).to.contain('Darth Vader');
      });

    cy.get('[data-testid=quiz-answers]')
      .children()
      .first()
      .click()

    cy.get('[data-testid=quiz-question-text]')
      .should('be.visible')
      .should('have.text', 'Skrillex or Zomboy?');

    cy.get('[data-testid=quiz-answers]')
      .children()
      .should($answers => {
        expect($answers).to.have.length(2);
        expect($answers.eq(0)).to.contain('Zomboy');
        expect($answers.eq(1)).to.contain('Skrillex');
      });
  });
});
