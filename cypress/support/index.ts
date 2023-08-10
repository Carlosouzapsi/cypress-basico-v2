declare namespace Cypress {
  interface Chainable {
    fillMandatoryFieldsAndSubmit({
      firstName,
      lastName,
      email,
      phone,
      textArea,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      textArea: string;
    }): Chainable<Element>;
  }
}

Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  ({
    firstName,
    lastName,
    email,
    phone,
    textArea,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    textArea: string;
  }) => {
    cy.get('input[id="firstName"]').type(firstName, { delay: 0 });
    cy.get('input[id="lastName"]').type(lastName, { delay: 0 });
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="phone"]').type(phone, { delay: 0 });
    cy.get('textarea[id="open-text-area"]').type(textArea, {
      delay: 0,
    });
    cy.contains("button", "Enviar").click();
  }
);
