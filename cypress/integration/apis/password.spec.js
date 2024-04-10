describe("Change Password API Test", () => {
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

  afterEach(function () {
    cy.getCookies().then((cookies) => {
      const namesOfCookies = cookies.map((c) => c.name);
      console.log(namesOfCookies);
      Cypress.Cookies.preserveOnce(...namesOfCookies);
    });
  });

  it("Change Password should be behind auth", () => {
    cy.request({
      method: "POST",
      url: "/api/account/change_password",
      failOnStatusCode: false,
      body: {
        new_password: "12345678"
      }
    }).then((resp) => {
      expect(resp.status).to.equal(401);
    });
  });

  it("Should Login", () => {
    cy.login();
  });

  it("Change Password should fail without new_password", () => {
    cy.request({
      method: "POST",
      url: "/api/account/change_password",
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(400);
      expect(resp.body.message).to.equal("Please set a new password.");
    });
  });

  it("Change Password Success Flow", () => {
    cy.request({
      method: "POST",
      url: "/api/account/change_password",
      failOnStatusCode: false,
      body: {
        new_password: "12345678"
      }
    }).then((resp) => {
      expect(resp.body).to.have.property("success", true);
      expect(resp.body).to.have.property(
        "message",
        "Password changed successfully"
      );
    });
  });

  it("Should logout", () => {
    cy.clearCookies()
      .then(() => {
        return cy.request("/api/auth/session");
      })
      .then((resp) => {
        expect(resp).to.not.have.property("user");
      });
  });

  it("Should not be able to login with old password", () => {
    cy.login(testUser.email, testUser.password)
      .then(() => {
        return cy.request({
          method: "GET",
          url: "/api/auth/session"
        });
      })
      .then((resp) => {
        expect(resp).to.not.have.property("user");
      });
  });

  it("Should be able to login with new password", () => {
    cy.login(testUser.email, "12345678")
      .then(() => {
        return cy.request({
          method: "GET",
          url: "/api/auth/session"
        });
      })
      .then((response) => {
        console.log(response);
        expect(response.body).has.property("user");
        expect(response.body.user).has.property(
          "email",
          "abhishekr700+test@gmail.com"
        );
      });
  });
});

describe("Reset Password API Test", () => {
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

  it("Reset password should fail without email", () => {
    cy.request({
      method: "GET",
      url: `/api/account/reset_password/`,
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(405);
    });
  });

  it("Reset password should fail without non-existent email", () => {
    cy.request({
      method: "GET",
      url: `/api/account/reset_password/${testUser.new_email}`,
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body).to.have.property(
        "message",
        "Email not found! Please double check the email or create a new account!"
      );
    });
  });

  it("Reset password success flow", () => {
    cy.request({
      method: "GET",
      url: `/api/account/reset_password/${testUser.email}`,
      failOnStatusCode: false,
      body: {}
    }).then((resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body).to.have.property(
        "message",
        "An email contanining the link to reset password has been sent to you."
      );
    });
  });

  it("Reset password should fail with no uuid in body", () => {
    cy.request({
      method: "POST",
      url: `/api/account/reset_password`,
      failOnStatusCode: false,
      body: {
        code: "WrongCode",
        new_password: "abcde"
      }
    }).then((resp) => {
      expect(resp.status).to.equal(400);
    });
  });

  it("Reset password should fail with no code in body", () => {
    cy.request({
      method: "POST",
      url: `/api/account/reset_password`,
      failOnStatusCode: false,
      body: {
        uuid: testUser.uuid,
        new_password: "abcde"
      }
    }).then((resp) => {
      expect(resp.status).to.equal(400);
    });
  });

  it("Reset password should fail with no new_password in body", () => {
    cy.request({
      method: "POST",
      url: `/api/account/reset_password`,
      failOnStatusCode: false,
      body: {
        code: "WrongCode",
        uuid: testUser.uuid
      }
    }).then((resp) => {
      expect(resp.status).to.equal(400);
    });
  });

  it("Reset password should fail with wrong code", () => {
    cy.request({
      method: "POST",
      url: `/api/account/reset_password`,
      failOnStatusCode: false,
      body: {
        code: "WrongCode",
        uuid: testUser.uuid,
        new_password: "abcde"
      }
    }).then((resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body).to.have.property("message", "Code Invalid");
    });
  });

  it("Reset password success flow", () => {
    cy.task("db:getUser", testUser.email)
      .then((user) => {
        return cy.request({
          method: "POST",
          url: `/api/account/reset_password`,
          failOnStatusCode: false,
          body: {
            code: user.reset_password_code,
            uuid: testUser.uuid,
            new_password: "12345678"
          }
        });
      })
      .then((resp) => {
        expect(resp.status).to.equal(200);
        expect(resp.body).to.have.property(
          "message",
          "Your password has been changed"
        );
      });
  });

  it("Should not be able to login with old password", () => {
    cy.login(testUser.email, testUser.password)
      .then(() => {
        return cy.request({
          method: "GET",
          url: "/api/auth/session"
        });
      })
      .then((resp) => {
        expect(resp).to.not.have.property("user");
      });
  });

  it("Should be able to login with new password", () => {
    cy.login(testUser.email, "12345678")
      .then(() => {
        return cy.request({
          method: "GET",
          url: "/api/auth/session"
        });
      })
      .then((response) => {
        console.log(response);
        expect(response.body).has.property("user");
        expect(response.body.user).has.property(
          "email",
          "abhishekr700+test@gmail.com"
        );
      });
  });
});
