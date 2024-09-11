const request = require("supertest");
const mockTestCases = require("./registerUser.test.constants");
const app = require("../../../../app");

describe("Register new user by non-admin user API testing", () => {
  let accessToken;
  //set up non-admin token before test
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/chatapp/api/auth/login")
      .send({
        email: "sriyas@gmail.com",
        password: "sriya@1234",
      });
    accessToken = loginResponse.body.accessToken;
  });

  //should fail registration without a token
  test(mockTestCases?.[`test1`].text, async () => {
    const response = await request(app)
      .post(mockTestCases?.[`test1`].apiEndpoint)
      .send(mockTestCases?.[`test1`].reqBody);
    expect(response.statusCode).toBe(mockTestCases?.[`test1`].resStatusCode);
    expect(response.body).toEqual(mockTestCases?.[`test1`].resBody);
  });

  //should fail to register new user with a non-admin token
  test(mockTestCases?.[`test2`].text, async () => {
    const response = await request(app)
      .post(mockTestCases?.[`test2`].apiEndpoint)
      .set("Authorization", `chatapp-token=${accessToken}`)
      .send(mockTestCases?.[`test2`].reqBody);
    expect(response.statusCode).toBe(mockTestCases?.[`test2`].resStatusCode);
    expect(response.body).toEqual(mockTestCases?.[`test2`].resBody);
  });
});

describe("Register new user by admin user API testing", () => {
  let accessToken;
  //set up admin token before test
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/chatapp/api/auth/login")
      .send({
        email: "ankurc@gmail.com",
        password: "ankur@1234",
      });
    accessToken = loginResponse.body.accessToken;
  });

  for (let i = 3; i <= Object.keys(mockTestCases).length; i++) {
    test(mockTestCases?.[`test${i}`].text, async () => {
      const response = await request(app)
        .post(mockTestCases?.[`test${i}`].apiEndpoint)
        .set("Authorization", `chatapp-token=${accessToken}`)
        .send(mockTestCases?.[`test${i}`].reqBody);
      expect(response.statusCode).toBe(
        mockTestCases?.[`test${i}`].resStatusCode
      );
      expect(response.body).toEqual(mockTestCases?.[`test${i}`].resBody);
    });
  }
});
