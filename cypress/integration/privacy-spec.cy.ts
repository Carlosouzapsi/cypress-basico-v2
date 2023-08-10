/// <reference types="Cypress" />

describe("Desafio 001", () => {
  beforeEach(() => {
    cy.visit("./src/privacy.html");
  });
  it.only("Testa página de privacidade", () => {
    cy.contains("Talking About Testing").should("be.visible");
  });
});
