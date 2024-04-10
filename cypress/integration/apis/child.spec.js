describe("Child API Tests", () => {
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
      });
  });

  beforeEach(() => {
    // alias the users fixtures
    cy.fixture("child_1.json").as("child1");
  });

  afterEach(function () {
    cy.getCookies().then((cookies) => {
      const namesOfCookies = cookies.map((c) => c.name);
      console.log(namesOfCookies);
      Cypress.Cookies.preserveOnce(...namesOfCookies);
    });
  });

  it("Get Child should be behind auth", () => {
    cy.request({
      method: "GET",
      url: "/api/account/profile/child/123",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(401);
    });
  });

  it("Add Child should be behind auth", () => {
    cy.request({
      method: "POST",
      url: "/api/account/profile/update/child",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(401);
    });
  });

  it("Update Child should be behind auth", () => {
    cy.request({
      method: "PATCH",
      url: "/api/account/profile/update/child",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(401);
    });
  });

  it("Delete Child should be behind auth", () => {
    cy.request({
      method: "DELETE",
      url: "/api/account/profile/update/child",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(401);
    });
  });

  it("Should Login", () => {
    cy.login(testUser.email, testUser.password_plain);
  });

  it("Should be able to add child", function () {
    cy.request({
      method: "POST",
      url: "/api/account/profile/update/child",
      failOnStatusCode: false,
      body: {
        first_name: "Child",
        last_name: "last",
        date_of_birth: "1997-10-01"
      }
    }).then((resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body).to.have.property("uuid");
      delete resp.body.uuid;
      expect(resp.body).to.deep.eq(this.child1);
    });
  });

  it("Should not be able to add child with bad date", () => {
    cy.request({
      method: "POST",
      url: "/api/account/profile/update/child",
      failOnStatusCode: false,
      body: {
        first_name: "Child",
        last_name: "last",
        date_of_birth: "SomeDate"
      }
    }).then((resp) => {
      expect(resp.status).to.equal(400);
      // expect(resp.body).to.have.property("uuid");
      // delete resp.body.uuid;
      // expect(resp.body).to.deep.eq(this.child1);
    });
  });

  it("Should not be able to add child with date greater than today", () => {
    cy.request({
      method: "POST",
      url: "/api/account/profile/update/child",
      failOnStatusCode: false,
      body: {
        first_name: "Child",
        last_name: "last",
        date_of_birth: "2026-01-01"
      }
    }).then((resp) => {
      expect(resp.status).to.equal(400);
      // expect(resp.body).to.have.property("uuid");
      // delete resp.body.uuid;
      // expect(resp.body).to.deep.eq(this.child1);
    });
  });

  it("Should not be able to update child without passing uuid", () => {
    cy.request({
      method: "PATCH",
      url: "/api/account/profile/update/child",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).eq(400);
    });
  });

  [
    { field: "first_name", value: "SomeCustomVal" },
    { field: "last_name", value: "SomeCustomVal" },
    { field: "date_of_birth", value: "2021-01-01" }
  ].forEach((obj) => {
    it(`should be able to update ${obj.field}`, () => {
      cy.request({
        method: "GET",
        url: "/api/account/profile/",
        failOnStatusCode: false,
        body: {}
      })
        .then((resp) => {
          let body = {};
          body[obj.field] = obj.value;
          cy.request({
            method: "PATCH",
            url: "/api/account/profile/update/child",
            failOnStatusCode: false,
            body: {
              childUuid: resp.body.children[0].uuid,
              ...body
            }
          });
        })
        .then((resp) => {
          expect(resp.body.children[0]).to.have.property(obj.field, obj.value);
        });
    });
  });

  it("Should not be able to delete child without passing uuid", () => {
    cy.request({
      method: "DELETE",
      url: "/api/account/profile/update/child",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).eq(400);
    });
  });

  it("Should be able to delete child", function () {
    cy.request({
      method: "GET",
      url: "/api/account/profile/",
      failOnStatusCode: false,
      body: {}
    })
      .then((resp) => {
        cy.request({
          method: "DELETE",
          url: "/api/account/profile/update/child",
          failOnStatusCode: false,
          body: {
            childUuid: resp.body.children[0].uuid
          }
        });
      })
      .then((resp) => {
        expect(resp.body).to.have.property("success", true);
        expect(resp.body).to.have.property(
          "message",
          "The Child has been deleted"
        );
      });
  });
});
