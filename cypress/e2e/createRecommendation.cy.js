import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});

describe('Testa postagem de uma nova recomendação', () => {
  it('Testa se a recomendação é criada e aparece com sucesso', () => {
    const recommendation = {
      name: faker.lorem.words(4),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    };

    cy.visit('http://localhost:3000');
    cy.get("[placeholder='Name']").type(recommendation.name);
    cy.get("[placeholder='https://youtu.be/...']").type(recommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("createRecommendation");

    cy.get("[data-test-id='button']").click();

    cy.wait("@createRecommendation");

    cy.contains(recommendation.name).should("be.visible");
  });
});