describe('LoginPage E2E', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
  
      cy.visit('/', {
        onBeforeLoad(win) {
          // Prevent notification popup
          cy.stub(win.Notification, 'requestPermission').resolves('denied');
        }
      });
  
      // Wait for login form to appear (up to 10 seconds)
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
  
      cy.get('[data-testid="login-email"]').type('user@example.com', { force: true });
      cy.get('[data-testid="login-password"]').type('password123', { force: true });
      cy.get('[data-testid="login-submit"]').click();
  
      cy.wait('@login');
      cy.url().should('include', '/home');
  
      cy.window().then((win) => {
        expect(win.localStorage.getItem('accessToken')).to.eq('test-access-token');
        expect(win.localStorage.getItem('refreshToken')).to.eq('test-refresh-token');
      });
    });
  });
  