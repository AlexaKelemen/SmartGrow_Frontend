describe("Register Page Validation", () => {
    beforeEach(() => {
      cy.visit("/"); // make sure it lands on the login page
      cy.get("span.signup-link").click({ force: true }); // switch to register mode
    });
  
    it("shows an error when email is invalid", () => {
      cy.get('input[placeholder="Email address"]').type("invalid-email", { force: true });
      cy.get('input[placeholder="Password"]').type("validPassword123", { force: true });
      cy.get('input[placeholder="Re-enter Password"]').type("validPassword123", { force: true });
      cy.contains("button", "Register").click({ force: true });
  
      // Assert on alert call
      cy.on("window:alert", (text) => {
        expect(text).to.include("valid email");
      });
    });
  
    it("shows an error when passwords do not match", () => {
      cy.get('input[placeholder="Email address"]').type("test@example.com", { force: true });
      cy.get('input[placeholder="Password"]').type("Password123", { force: true });
      cy.get('input[placeholder="Re-enter Password"]').type("Password321", { force: true });
      cy.contains("button", "Register").click({ force: true });
      cy.get('input[placeholder="Email address"]', { timeout: 6000 }).should("be.visible");


  
      cy.on("window:alert", (text) => {
        expect(text).to.include("do not match");
      });
    });
  });
  