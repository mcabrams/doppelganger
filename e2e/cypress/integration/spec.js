describe('homepage', () => {
  it('supports registration, logging out, and logging in', () => {
    const name = 'foo';
    const password = 'foobar1234';
    const email = 'foo@example.com';

    /* Test Registration */
    cy.visit('/');

    cy.get('[data-testid=site-heading]')
      .should('contain', 'Hacker News');

    cy.get('[data-testid=nav-login-link]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/login');

    cy.get('[data-testid=toggle-authentication-type-button]')
      .should('contain', 'create an account');

    cy.get('[data-testid=toggle-authentication-type-button]')
      .click();

    cy.get('[data-testid=login-register-heading]')
      .should('contain', 'Sign Up');
    cy.get('[data-testid=toggle-authentication-type-button]')
      .should('contain', 'already have an account');

    cy.get('[data-testid=name-input]')
      .type(name);
    cy.get('[data-testid=password-input]')
      .type(password);
    cy.get('[data-testid=email-input]')
      .type(email);
    cy.get('[data-testid=create-account-button]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/new/1');
    cy.get('[data-testid=nav-logout-link]')
      .should('be.visible');
    // our auth cookie should be present
    // cy.getCookie('your-session-cookie').should('exist')

    /* Test Logout */

    cy.get('[data-testid=nav-logout-link]')
      .click();
    cy.get('[data-testid=nav-login-link]')
      .should('be.visible');

    // TODO: maybe test for clearing cookie here?

    /* Test Login */

    cy.get('[data-testid=nav-login-link]')
      .click();

    cy.get('[data-testid=login-register-heading]')
      .should('contain', 'Login');

    cy.get('[data-testid=email-input]')
      .type(email);
    cy.get('[data-testid=password-input]')
      .type(password);
    cy.get('[data-testid=login-button]')
      .click();

    cy.url()
      .should('eq', Cypress.config().baseUrl + '/new/1');
    cy.get('[data-testid=nav-logout-link]')
      .should('be.visible');
    // our auth cookie should be present
    // cy.getCookie('your-session-cookie').should('exist')
  });
});
