describe("Profile API Tests", () => {
  let testUser;
  before(() => {
    cy.clearCookies();
    cy.task("db:clear");
    cy.task("db:dummyUser")
      // .then(() => {
      //   return cy.login();
      // })
      .then(() => {
        return cy.task("getTestUser");
      })
      .then((data) => {
        testUser = data;
        cy.fixture("profile_1.json").as("profile1");
      });
  });

  beforeEach(() => {
    // alias the users fixtures
    cy.fixture("profile_1.json").as("profile1");
    cy.fixture("profile_2.json").as("profile2");
  });

  afterEach(function () {
    cy.getCookies().then((cookies) => {
      const namesOfCookies = cookies.map((c) => c.name);
      console.log(namesOfCookies);
      Cypress.Cookies.preserveOnce(...namesOfCookies);
    });
  });

  it("Profile should be behind auth", () => {
    cy.request({
      method: "GET",
      url: "/api/account/profile",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(401);
    });
  });

  it("Profile Update should be behind auth", () => {
    cy.request({
      method: "POST",
      url: "/api/account/profile/update",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(401);
    });
  });

  it("Should Login", () => {
    cy.login(testUser.email, testUser.password_plain);
  });

  it("Should be able to get profile data", function () {
    cy.request({
      method: "GET",
      url: "/api/account/profile",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body).to.deep.equal(this.profile1);
    });
  });

  [
    { field: "title", val: "MisterLol" },
    { field: "first_name", val: "SomeCustomValue" },
    { field: "last_name", val: "SomeCustomValue" },
    { field: "about", val: "SomeCustomValue" },
    { field: "country", val: "SomeCustomValue" },
    { field: "timezone", val: "SomeCustomValue" },
    { field: "organization_id", val: 1 }
  ].forEach((val) => {
    it(`Should be able to update ${val.field}`, function () {
      let body = {};
      body[val.field] = val.val;
      cy.request({
        method: "POST",
        url: "/api/account/profile/update",
        failOnStatusCode: false,
        body: body
      }).then((resp) => {
        expect(resp.status).to.equal(200);
        expect(resp.body).to.have.property(val.field, val.val);
      });
    });
  });

  it("Should be able to update languages", function () {
    cy.request({
      method: "POST",
      url: "/api/account/profile/update",
      failOnStatusCode: false,
      body: {
        languages: JSON.stringify(["in", "jp", "is"])
      }
    }).then((resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body).to.deep.equal(this.profile2);
    });
  });
});
