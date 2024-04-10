describe("Login/Logout API Tests", () => {
  let testUser;
  before(() => {
    cy.clearCookies();
    cy.task("db:clear");
    cy.task("db:dummyUser");
    cy.task("getTestUser").then((data) => {
      testUser = data;
    });
  });

  afterEach(function () {
    cy.getCookies().then((cookies) => {
      const namesOfCookies = cookies.map((c) => c.name);
      console.log(namesOfCookies);
      Cypress.Cookies.preserveOnce(...namesOfCookies);
    });
  });

  it("Login Should fail with incorrect credentials", () => {
    // cy.clearCookies()
    cy.visit("/");
    cy.contains("Sign In").click();
    cy.contains("button.MuiButton-contained", "Sign In").click();
    cy.get("input[name=email]").type("abhishekr700+test@gmail.com");
    cy.get("input[name=password]").type("WrongPass");
    cy.get("button[type=submit]").click();
    cy.contains(
      "Error: Incorrect credentials. Check your email and password. (401)"
    );

    cy.request({
      method: "GET",
      url: "/api/auth/session"
      //   failOnStatusCode: false,
    }).then((response) => {
      console.log(response);
      expect(response.body).has.not.property("user");
    });
  });

  it("Login Should be successful with correct credentials", () => {
    cy.visit("/");
    cy.contains("Sign In").click();
    cy.contains("button.MuiButton-contained", "Sign In").click();
    cy.get("input[name=email]").type("abhishekr700+test@gmail.com");
    cy.get("input[name=password]").type("123456");
    cy.get("button[type=submit]").click();
    cy.contains("Test", {
      timeout: 10000
    });

    cy.request({
      method: "GET",
      url: "/api/auth/session"
      //   failOnStatusCode: false,
    }).then((response) => {
      console.log(response);
      expect(response.body).has.property("user");
      expect(response.body.user).has.property(
        "email",
        "abhishekr700+test@gmail.com"
      );
      // expect(response.body.session.email).has.property("email");
    });
  });

  it("Logout should clear the session", () => {
    cy.get("button[aria-describedby='my-account']").click();
    cy.contains("Log out").click();
    cy.request({
      method: "GET",
      url: "/api/auth/session"
      //   failOnStatusCode: false,
    }).then((response) => {
      console.log(response);
      expect(response.body).has.not.property("user");
    });
  });

  it("Login Time should be behind auth", () => {
    cy.request({
      method: "GET",
      url: "/api/access/login",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(401);
    });
  });

  it("Should login", () => {
    cy.login(testUser.email, testUser.password_plain);
  });

  it("Login Time should be updated accordingly", () => {
    cy.request({
      method: "GET",
      url: "/api/access/login",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      const loginDate = new Date(resp.body.last_login_time);
      const currDate = new Date();
      expect(currDate - loginDate).lt(5000);
    });
  });
});
