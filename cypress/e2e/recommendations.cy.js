beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});

describe('Testa GET /recommendations', () => {
  it('Testa caso de sucesso', () => {

    cy.visit('http://localhost:3000');

    cy.request("POST", "http://localhost:5000/e2e/create", {}).then((res) => {
      const { numberOfCreatedRecommendations } = res.body;
      if(numberOfCreatedRecommendations < 10) {
        cy.get("[data-test-id='recommendation']").should('have.length', numberOfCreatedRecommendations);
      } else {
        cy.get("[data-test-id='recommendation']").should('have.length', 10);
      }
    });
  });
});