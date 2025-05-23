describe("Login Page", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("shows alert on wrong credentials", () => {
      cy.window().then((win) => {
        cy.stub(win, "alert").as("alert");
      });
  
      cy.get('[data-testid="login-email"]').type("wrong@email.com", { force: true });
      cy.get('[data-testid="login-password"]').type("wrongpass", { force: true });
      cy.get('[data-testid="login-submit"]').click({ force: true });
  
      cy.get("@alert").should("have.been.calledWith", "Login failed");
    });
  
    it("logs in with correct credentials", () => {
      cy.get('[data-testid="login-email"]').type("salo@smartgrow.nothing", { force: true });
      cy.get('[data-testid="login-password"]').type("salo", { force: true });
      cy.get('[data-testid="login-submit"]').click({ force: true });
  
      cy.url().should("include", "/home");
    });
  });
  