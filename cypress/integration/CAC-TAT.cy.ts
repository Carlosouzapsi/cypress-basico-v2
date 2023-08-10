/// <reference types="Cypress" />

describe("Central de atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("src/index.html");
  });
  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("[EXERCICIO 01] - preenche os campos obrigatórios e envia o formulário", () => {
    const longExpectedText: string = "loremipsumsitdoloramet";
    cy.get('input[id="firstName"]').type("Carlos Otávio", { delay: 0 });
    cy.get('input[id="lastName"]').type("Souza", { delay: 0 });
    cy.get('input[id="email"]').type("carlos.souza@email.com");
    cy.get('textarea[id="open-text-area"]').type(longExpectedText, {
      delay: 0,
    });

    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });
  it("[EXERCICIO 02 EXTRA] - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    const wrongEmail: string = "carlos.souza$email.com";
    const helpMessage: string = "Recapitular Cypress";

    cy.get('input[id="firstName"]').type("Carlos Otávio");
    cy.get('input[id="lastName"]').type("Souza");
    cy.get('input[id="email"]').type(wrongEmail);
    cy.get('textarea[id="open-text-area"]').type(helpMessage);
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });
  it("[EXERCICIO 03 EXTRA] - campo telefone somente deve aceitar valores númericos ", () => {
    cy.get('input[id="phone"]').type("abcd").should("have.value", "");
  });
  it("[EXERCICIO 04 EXTRA] - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get('input[id="firstName"]').type("Carlos Otávio", { delay: 0 });
    cy.get('input[id="lastName"]').type("Souza");
    cy.get('input[id="email"]').type("carlos.souza@email.com");
    cy.get('input[id="phone-checkbox"]').click();
    cy.get('textarea[id="open-text-area"]').type("Recapitular Cypress");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });
  it("[EXERCICIO 05 EXTRA] - preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get('input[id="firstName"]')
      .type("Carlos Otávio", { delay: 0 })
      .should("have.value", "Carlos Otávio")
      .clear()
      .should("have.value", "");

    cy.get('input[id="lastName"]')
      .type("Souza", { delay: 0 })
      .should("have.value", "Souza")
      .clear()
      .should("have.value", "");

    cy.get('input[id="phone"]')
      .type("1234", { delay: 0 })
      .should("have.value", "1234")
      .clear()
      .should("have.value", "");
  });
  it("[EXERCICIO 06 EXTRA] - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get('input[id="firstName"]').type("Carlos Otávio", { delay: 0 });
    cy.get('input[id="lastName"]').type("Souza");
    cy.get('input[id="email"]').type("carlos.souza@email.com");
    cy.get('input[id="phone-checkbox"]').click();
    cy.get('textarea[id="open-text-area"]').type("Recapitular Cypress");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });
  it("[EXERCICIO 07 EXTRA] - envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      textArea: "Some text",
    });
    cy.get(".success").should("be.visible");
  });
  it("[EXERCICIO 08 EXTRA] - seleciona um produto (YouTube) por seu texto", () => {
    cy.get("select").select("YouTube").should("have.value", "youtube");
  });
  it("[EXERCICIO 09 EXTRA] - seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("select").select("Mentoria").should("have.value", "mentoria");
  });
  it("[EXERCICIO 10] - seleciona um produto (Blog) por seu índice", () => {
    cy.get("select").select(1).should("have.value", "blog");
  });
  it('[EXERCICIO 11] - marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });
  it("[EXERCICIO EXTRA 12] - marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each(($el) => {
      cy.wrap($el).check();
      cy.wrap($el).check().should("be.checked");
    });
  });
  it("[EXERCICIO 13] - marca ambos checkboxes, depois desmarca o último marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });
  it("[EXERCICIO EXTRA 14] - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get('input[id="phone-checkbox"]').check();
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });
  it("[EXERCICIO 15] - seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("[EXERCICIO 16] - seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("[EXERCICIO 17] - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("[EXERCICIO 18] - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });
  it("[EXERCICIO 19] - acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing").should("be.visible");
  });
});
