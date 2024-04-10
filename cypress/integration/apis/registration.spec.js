describe("Testing Registration API Endpoints Using Cypress", () => {
  before(() => {
    console.log("=> Before All Tests");
    cy.task("db:clear");
  });
  it("User Registration should fail if first_name is not sent", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/account/register",
      failOnStatusCode: false,
      body: {
        last_name: "User",
        email: "abhishekr700+test@gmail.com",
        password: "123456",
        policy: true
      }
    }).then((response) => {
      expect(response.status).equal(400);
    });
  });

  it("User Registration should fail if last_name is not sent", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/account/register",
      failOnStatusCode: false,
      body: {
        first_name: "User",
        email: "abhishekr700+test@gmail.com",
        password: "123456",
        policy: true
      }
    }).then((response) => {
      expect(response.status).equal(400);
    });
  });

  it("User Registration should fail if email is not sent", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/account/register",
      failOnStatusCode: false,
      body: {
        first_name: "Test",
        last_name: "User",
        password: "123456",
        policy: true
      }
    }).then((response) => {
      expect(response.status).equal(400);
    });
  });
  it("User Registration should fail if password is not sent", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/account/register",
      failOnStatusCode: false,
      body: {
        first_name: "Test",
        last_name: "User",
        email: "abhishekr700+test@gmail.com",
        policy: true
      }
    }).then((response) => {
      expect(response.status).equal(400);
    });
  });
  it("User Registration should fail if policy is not sent", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/account/register",
      failOnStatusCode: false,
      body: {
        first_name: "Test",
        last_name: "User",
        email: "abhishekr700+test@gmail.com",
        password: "123456"
      }
    }).then((response) => {
      expect(response.status).equal(400);
    });
  });
  it("User Registration should fail if policy is false", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/account/register",
      failOnStatusCode: false,
      body: {
        first_name: "Test",
        last_name: "User",
        email: "abhishekr700+test@gmail.com",
        password: "123456",
        policy: false
      }
    }).then((response) => {
      expect(response.status).equal(400);
    });
  });

  it("Should Allow User Registration ", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/account/register",
      body: {
        first_name: "Test",
        last_name: "User",
        email: "abhishekr700+test@gmail.com",
        password: "123456",
        policy: true
      }
    }).then((response) => {
      expect(response.body).has.property("success", true);
      expect(response.body).has.property("message", "Registration Success");
    });
  });

  it("Registration should fail if email is already present", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/account/register",
      failOnStatusCode: false,
      body: {
        first_name: "Test",
        last_name: "User",
        email: "abhishekr700+test@gmail.com",
        password: "123456",
        policy: true
      }
    }).then((response) => {
      expect(response.body).has.property("success", false);
      expect(response.body).has.property(
        "message",
        "Email previously registered. Try to log in."
      );
    });
  });
});
