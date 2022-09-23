import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});

describe('Testa downvote', () => {
  it('Testa caso de sucesso', () => {

    cy.visit('http://localhost:3000');

    const recommendation = {
      name: faker.lorem.words(4),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    };

    cy.request("POST", "http://localhost:5000/recommendations", recommendation).then(() => {
      cy.request("GET", `http://localhost:5000/e2e/${recommendation.name}`).then(res => {
        cy.intercept("POST", `/recommendations/${res.body.id}/downvote`).as("downvote");

        cy.get("#downvote").click();
        cy.wait("@downvote");
        cy.get("#votes").should("contain.text", `${res.body.score - 1}`);
      });
    });
  });

  it('Testa se a recomendação é excluida ao ultrapassar -5 votos', () => {

    cy.visit('http://localhost:3000');

    const recommendation = {
      name: faker.lorem.words(4),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    };

    cy.request("POST", "http://localhost:5000/recommendations", recommendation).then(() => {
      cy.request("GET", `http://localhost:5000/e2e/${recommendation.name}`).then(res => {
        cy.intercept("POST", `/recommendations/${res.body.id}/downvote`).as("downvote");
        
        for(let i = 0; i <= 5; i++) {
          cy.get("#downvote").click();
          cy.wait("@downvote");
        }

        cy.contains(recommendation.name).should("not.exist");
      });
    });
  });
});