describe('LoginPage E2E', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.Notification, 'requestPermission').resolves('denied');
      }
    });
    
    // Remove the overlay manually if it's present
    cy.get('.permission-overlay', { timeout: 10000 })
      .then($el => {
        if ($el.length) {
          $el.remove();
        }
    });
    

    // Make sure login email input appears
    cy.get('[data-testid="login-email"]', { timeout: 10000 }).should('exist');
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

    // Now safe to type
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
