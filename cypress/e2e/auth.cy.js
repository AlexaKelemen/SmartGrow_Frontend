describe('LoginPage E2E', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.Notification, 'requestPermission').resolves('denied');
      }
    });
  
    // Try to click 'Deny' if the button is visible
    cy.get('button')
      .contains('Deny')
      .then(($btn) => {
        if ($btn.length > 0) {
          cy.wrap($btn).click({ force: true });
        }
      });
  
    // Wait until the login form is actually interactable
    cy.get('[data-testid="login-email"]', { timeout: 10000 }).should('be.visible');
  });
  

  it('logs in successfully', () => {
    cy.intercept('POST', '**/Auth/login', {
      statusCode: 200,
      body: {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        email: 'user@example.com'
      }
    }).as('login');

    cy.get('[data-testid="login-email"]').type('user@example.com');
    cy.get('[data-testid="login-password"]').type('password123');
    cy.get('[data-testid="login-submit"]').click();

    cy.wait('@login');
    cy.url().should('include', '/home');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('accessToken')).to.eq('test-access-token');
      expect(win.localStorage.getItem('refreshToken')).to.eq('test-refresh-token');
    });
  });
});
