describe("About page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("should display the about page", () => {
    cy.get("h1").contains("Welcome!");
    cy.get("h1").contains("SWelcome!");

    cy.get("p").contains("This is a test application for Angular Developer role with EMX");
  });


});
