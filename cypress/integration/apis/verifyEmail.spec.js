describe("Verify Email Code API Tests", () => {
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

  it("is_email_verified Should be behind auth", () => {
    cy.request({
      method: "GET",
      url: "/api/account/is_email_verified",
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.equal(401);
    });
  });

  it("Login User", () => {
    cy.login();
  });

  it("User Email Should be unverified initially (From Profile)", () => {
    cy.request("/api/account/profile").then((resp) => {
      expect(resp.body).to.have.property("is_email_verified", false);
    });
  });

  it("User Email Should be unverified initially (From is_email_verified)", () => {
    cy.request("/api/account/is_email_verified").then((resp) => {
      expect(resp.body).to.have.property("isEmailVerified", false);
    });
  });

  it("User verification should fail with no uuid passed", () => {
    // cy.log(testUser);
    let user = cy.task("db:getUser", testUser.email);
    // cy.log(user);
    cy.request({
      method: "GET",
      url: "/api/account/verify_email/code",
      failOnStatusCode: false,
      qs: {
        code: "WrongCode"
      }
    }).then((resp) => {
      expect(resp.body).to.have.property("success", false);
      expect(resp.body).to.have.property(
        "message",
        "Please double check input fields"
      );
      //Incorrect verification code!
    });
  });

  it("User verification should fail with no code passed", () => {
    // cy.log(testUser);
    let user = cy.task("db:getUser", testUser.email);
    // cy.log(user);
    cy.request({
      method: "GET",
      failOnStatusCode: false,
      url: "/api/account/verify_email/code",
      qs: {
        uuid: testUser.uuid
      }
    }).then((resp) => {
      expect(resp.body).to.have.property("success", false);
      expect(resp.body).to.have.property(
        "message",
        "Please double check input fields"
      );
      //Incorrect verification code!
    });
  });

  it("User verification should fail with wrong verification code but correct uuid", () => {
    // cy.log(testUser);
    let user = cy.task("db:getUser", testUser.email);
    // cy.log(user);
    cy.request({
      method: "GET",
      url: "/api/account/verify_email/code",
      qs: {
        code: "WrongCode",
        uuid: testUser.uuid
      }
    }).then((resp) => {
      expect(resp.body).to.have.property("success", false);
      expect(resp.body).to.have.property(
        "message",
        "Incorrect verification code!"
      );
      //Incorrect verification code!
    });
  });

  it("User verification should fail with wrong uuid but correct verification code", () => {
    // cy.log(testUser);
    // cy.login()
    cy.task("db:getUser", testUser.email)
      .then((user) => {
        return cy.request({
          method: "GET",
          url: "/api/account/verify_email/code",
          failOnStatusCode: false,
          qs: {
            code: user.email_verification_code,
            uuid: "WrongUUID"
          }
        });
      })
      .then((resp) => {
        expect(resp.body).to.have.property("success", false);
        expect(resp.body).to.have.property(
          "message",
          "Please double check input fields"
        );
        expect(resp.body).to.have.property(
          "error",
          `"uuid" must be a valid GUID`
        );
        //Incorrect verification code!
      });
  });

  it("User verification should succeed", () => {
    // cy.log(testUser);
    // cy.login()
    cy.task("db:getUser", testUser.email)
      .then((user) => {
        return cy.request({
          method: "GET",
          url: "/api/account/verify_email/code",
          failOnStatusCode: false,
          qs: {
            code: user.email_verification_code,
            uuid: user.uuid
          }
        });
      })
      .then((resp) => {
        expect(resp.body).to.have.property("success", true);
        expect(resp.body).to.have.property(
          "message",
          "Your email has been verified"
        );
        //Incorrect verification code!
      });
  });

  it("User Email Should be verified  (From Profile)", () => {
    cy.request("/api/account/profile").then((resp) => {
      expect(resp.body).to.have.property("is_email_verified", true);
    });
  });

  it("User Email Should be verified  (From is_email_verified)", () => {
    cy.request("/api/account/is_email_verified").then((resp) => {
      expect(resp.body).to.have.property("isEmailVerified", true);
    });
  });
});

describe("Verify Email API Tests", () => {
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

  after(() => {
    cy.task("db:removeUser", testUser.new_email);
  });

  it("verify_email should be behind auth", () => {
    cy.request({
      method: "GET",
      url: `/api/account/verify_email`,
      qs: {
        email: testUser.email
      },
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).eq(401);
    });
  });

  it("Should Login User", () => {
    cy.login();
  });

  it("Verify Email should say already verified if so", () => {
    cy.task("db:setUserEmailVerified", testUser.email)
      .then(() => {
        // cy.pause()
        return cy.request({
          url: `/api/account/verify_email`,
          failOnStatusCode: false,
          qs: {
            email: testUser.new_email
          }
        });
      })
      .then((resp) => {
        expect(resp.body).to.have.property("message", "Email Already Verified");
      });
  });

  it("Verify Email should set new email if unverified", () => {
    cy.task("db:setUserEmailUnverified", testUser.email)
      .then(() => {
        return cy.request({
          url: `/api/account/verify_email?email=${testUser.new_email}`,
          failOnStatusCode: false,
          qs: {
            email: testUser.new_email
          }
        });
      })
      .then((resp) => {
        expect(resp.body).to.have.property(
          "message",
          "A verification link has been sent to your email"
        );
      });
  });

  it("New Email should be reflected in profile", () => {
    cy.request("/api/account/profile").then((resp) => {
      expect(resp.body).to.have.property("email", testUser.new_email);
      expect(resp.body).to.have.property("is_email_verified", false);
    });
  });
});

describe("Change Email API", () => {
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
      })

      .then(() => {
        return cy.task("db:setUserEmailVerified", testUser.email);
      })
      .then(() => {
        return cy.task("db:getUser", testUser.email);
      })
      .then((user) => {
        expect(user).to.have.property("is_email_verified", true);
      });
  });

  after(() => {
    cy.task("db:removeUser", testUser.new_email);
  });

  afterEach(function () {
    cy.getCookies().then((cookies) => {
      const namesOfCookies = cookies.map((c) => c.name);
      console.log(namesOfCookies);
      Cypress.Cookies.preserveOnce(...namesOfCookies);
    });
  });

  it("Change Email Should Be Behind Auth", () => {
    cy.request({
      method: "POST",
      url: "/api/account/change_email",
      failOnStatusCode: false,
      body: {
        new_email: "random@example.com"
      }
    }).then((resp) => {
      expect(resp.status).to.equal(401);
      //Incorrect verification code!
    });
  });

  it("Login User", () => {
    cy.login();
  });

  it("Change Email Should fail without new_email in body", () => {
    cy.request({
      method: "POST",
      url: "/api/account/change_email",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.body).to.have.property("success", false);
      expect(resp.body).to.have.property(
        "message",
        '"new_email" is required'
        //"\"new_email\" is required"
      );
      //Incorrect verification code!
    });
  });

  it("Change Email Should fail with invalid new_email in body", () => {
    cy.request({
      method: "POST",
      url: "/api/account/change_email",
      failOnStatusCode: false,
      body: {
        new_email: "abcde"
      }
    }).then((resp) => {
      expect(resp.body).to.have.property("success", false);
      expect(resp.body).to.have.property(
        "message",
        '"new_email" must be a valid email'
        //"\"new_email\" is required"
      );
      //Incorrect verification code!
    });
  });

  it("Change Email Should Set new_email & verified false in DB", () => {
    cy.request({
      method: "POST",
      url: "/api/account/change_email",
      failOnStatusCode: false,
      body: {
        new_email: testUser.new_email
      }
    }).then((resp) => {
      expect(resp.body).to.have.property("success", true);
      expect(resp.body).to.have.property(
        "message",
        "A verification link has been sent to your email"
      );
    });
  });

  it("New Email should be reflected in profile", () => {
    cy.request("/api/account/profile").then((resp) => {
      expect(resp.body).to.have.property("email", testUser.new_email);
      expect(resp.body).to.have.property("is_email_verified", false);
    });
  });

  it("is_email_verified value should be false now", () => {
    cy.request("/api/account/is_email_verified").then((resp) => {
      expect(resp.body).to.have.property("isEmailVerified", false);
    });
  });
});
