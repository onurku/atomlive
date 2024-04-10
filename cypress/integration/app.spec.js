context("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/books/event");
  });
  // Change this function if other criteria are required.
  const isVisible = (elem) => !!(elem.offsetWidth && elem.offsetHeight);

  // it("1 - should load our app and show content", () => {
  //   cy.wait(20000);
  //   cy.get("#webar3 canvas").should("be.visible");
  //   cy.screenshot("1");
  // });

  // it("2 - mouseover controlsBar", () => {
  //   cy.wait(20000);
  //   cy.get("#controlsBar").should("be.hidden");
  //   cy.get("#video-container").realHover();
  // });
});
