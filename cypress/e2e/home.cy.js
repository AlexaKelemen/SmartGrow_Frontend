describe('HomePage E2E', () => {
    beforeEach(() => {
      // Clear state and visit
      cy.clearLocalStorage();
  
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win.Notification, 'requestPermission').resolves('denied');
        }
      });
  
      // Remove overlay if it exists
      cy.get('.permission-overlay', { timeout: 10000 }).then($el => {
        if ($el.length) $el.remove();
      });
  
      // Log in with updated credentials
      cy.get('[data-testid="login-email"]').type('salo@smartgrow.nothing');
      cy.get('[data-testid="login-password"]').type('salo');
      cy.get('[data-testid="login-submit"]').click();
  
      // Ensure redirect to home
      cy.url({ timeout: 10000 }).should('include', '/home');
    });
  
    it('displays the SmartGrow logo and homepage content', () => {
      cy.get('.smart-logo').should('be.visible');
      cy.contains('Welcome to SmartGrow').should('be.visible');
      cy.contains('Your intelligent assistant for your modern greenhouse!').should('be.visible');
    });
  
    it('displays all quick link cards with correct text', () => {
      cy.get('.card').should('have.length', 3);
      cy.contains('Monitor conditions').should('be.visible');
      cy.contains('Manage Automations').should('be.visible');
      cy.contains('Get Insights').should('be.visible');
    });
  });
  