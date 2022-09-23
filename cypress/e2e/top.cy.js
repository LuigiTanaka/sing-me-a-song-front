beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});

describe('Testa GET /recommendations/top/:amount', () => {
  it('Testa se é direcionado pra rota correta e se aparece o número correto de recomendações', () => {

    cy.visit('http://localhost:3000');

    cy.request("POST", "http://localhost:5000/e2e/create", {}).then((res) => {
      const { numberOfCreatedRecommendations } = res.body;

      cy.intercept("GET", "http://localhost:5000/recommendations/top/10").as("top");
      cy.get("[data-test-id='top']").click();
      cy.wait("@top");

      cy.url().should("equal","http://localhost:3000/top");

      if(numberOfCreatedRecommendations < 10) {
        cy.get("[data-test-id='recommendation']").should('have.length', numberOfCreatedRecommendations);
      } else {
        cy.get("[data-test-id='recommendation']").should('have.length', 10);
      }
    });
  });
});