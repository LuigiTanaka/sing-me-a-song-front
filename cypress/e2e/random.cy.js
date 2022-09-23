beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});

describe('Testa GET /recommendations/random', () => {
  it('Testa se é direcionado pra rota correta e se aparece uma única recomendação', () => {

    cy.visit('http://localhost:3000');

    cy.request("POST", "http://localhost:5000/e2e/create", {}).then((res) => {

      cy.intercept("GET", "http://localhost:5000/recommendations/random").as("random");
      cy.get("[data-test-id='random']").click();
      cy.wait("@random");

      cy.url().should("equal","http://localhost:3000/random");

      cy.get("[data-test-id='recommendation']").should('have.length', 1);
    });
  });
});