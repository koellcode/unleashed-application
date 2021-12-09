/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should redirect to login', () => {
    cy.location('pathname').should('include', 'login');
  });

  it('should not login (user not valid)', () => {
    cy.get('#email').type('thomas@koelling.haha');
    cy.get('#password').type('heyho');
    cy.get('form').submit();

    cy.location('pathname').should('include', 'login');
  });

  it('should login', () => {
    cy.get('#email').type('super@user.de');
    cy.get('#password').type('superuser1');
    cy.get('form').submit();

    cy.get('h2').should('contain.text', 'superuser');
  });

  it('should logout', () => {
    cy.get('#email').type('super@user.de');
    cy.get('#password').type('superuser1');
    cy.get('form').submit();

    cy.get('button').click();
    cy.location('pathname').should('include', 'login');
    cy.visit('http://localhost:3000');
    cy.location('pathname').should('include', 'login');
  });

  it('should switch to signup page', () => {
    cy.get('a').click();
    cy.location('pathname').should('include', 'signup');
  });
});

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  });

  it('should switch to login page', () => {
    cy.get('a').click();
    cy.location('pathname').should('include', 'login');
  });

  it('should not signup (password not valid)', () => {
    cy.get('#email').type('thomas@koelling.haha');
    cy.get('#password').type('heyho');
    cy.get('#name').type('thomas');
    cy.get('form').submit();

    cy.location('pathname').should('include', 'signup');
  });

  it('should signup', () => {
    cy.get('#email').type('thomas@ksdesllsinsg.haha');
    cy.get('#password').type('heyho1sd');
    cy.get('#name').type('thomas');
    cy.get('form').submit();

    cy.get('h2').should('contain.text', 'thomas');
  });
});
