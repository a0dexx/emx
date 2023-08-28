describe("Search page", () => {
  beforeEach(() => {
    cy.visit("/search");
  });

  it("should display the about page", () => {
    cy.get("h1").contains("Book Search");
    cy.get("h4").contains("Using the Openlibrary to query for books");
  });

  it("should display input put to search for books", () => {
    cy.get("input[placeholder='Search Open Library']").should("exist");
  });

  it("should display books after searching", () => {
    const searchTerm = "harry potter";

    cy.get(".spinner-container").should("not.exist");
    cy.get('input[placeholder="Search Open Library"]').type(searchTerm);

    cy.intercept("GET", "http://openlibrary.org/search.json?q=harry%20potter", { fixture: "books.json" }).as(
      "getBooks",
    );

    cy.wait("@getBooks").then((interception) => {
      assert.isNotNull(interception.response.body, "1st API call has data");
      assert.include(interception.response.body.docs[0].title, "Harry Potter 1");
      assert.include(interception.response.body.docs[1].title, "Harry Potter 2");
      assert.include(interception.response.body.docs[2].title, "Harry Potter 3");
      assert.include(interception.response.body.docs[3].title, "Harry Potter 4");
      assert.include(interception.response.body.docs[4].title, "Harry Potter 5");

      assert.include(interception.response.body.docs[0]["author_name"], "Margaret Potts");
      assert.include(interception.response.body.docs[2]["first_publish_year"], "2022");
    });
  });
});
