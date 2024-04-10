context("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/books/invited");
  });

  it("should load our app and show content", () => {
    cy.contains("Live in a Fairy Tale");
  });

  it("should see canvas on camera-zone for invited guest", () => {
    cy.get("#camera-zone canvas", { timeout: 10000 }).should("be.visible");
  });
});
