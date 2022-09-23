import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});

describe('Testa upvote', () => {
  it('Testa caso de sucesso', () => {

    cy.visit('http://localhost:3000');

    const recommendation = {
      name: faker.lorem.words(4),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    };

    cy.request("POST", "http://localhost:5000/recommendations", recommendation).then(() => {
      cy.request("GET", `http://localhost:5000/e2e/${recommendation.name}`).then(res => {
        cy.intercept("POST", `/recommendations/${res.body.id}/upvote`).as("upvote");

        cy.get("[data-test-id='upvote']").click();
        cy.wait("@upvote");
        cy.get("[data-test-id='votes']").should("contain.text", `${res.body.score + 1}`);
      });
    });
  });
});