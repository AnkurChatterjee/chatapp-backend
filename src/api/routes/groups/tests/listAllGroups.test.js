const request = require("supertest");
const mockTestCases = require("./listAllGroups.test.constants");
const app = require("../../../../app");

describe("Testing list all groups without sending jwt token", () => {
  //should fail without a token
  test(mockTestCases?.[`test1`].text, async () => {
    const response = await request(app)
      .get(mockTestCases?.[`test1`].apiEndpoint)
      .send(mockTestCases?.[`test1`].reqBody);
    expect(response.statusCode).toBe(mockTestCases?.[`test1`].resStatusCode);
    expect(response.body).toEqual(mockTestCases?.[`test1`].resBody);
  });
});

describe("Testing list all groups by normal user", () => {
  let accessToken;
  //set up user token before test
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/chatapp/api/auth/login")
      .send({
        email: "amits@gmail.com",
        password: "amit@1234",
      });
    accessToken = loginResponse.body.accessToken;
  });

  for (let i = 2; i <= Object.keys(mockTestCases).length; i++) {
    test(mockTestCases?.[`test${i}`].text, async () => {
      const response = await request(app)
        .get(mockTestCases?.[`test${i}`].apiEndpoint)
        .set("Authorization", `chatapp-token=${accessToken}`)
        .send(mockTestCases?.[`test${i}`].reqBody);
      expect(response.statusCode).toBe(
        mockTestCases?.[`test${i}`].resStatusCode
      );
      expect(response.body).toEqual(mockTestCases?.[`test${i}`].resBody);
    });
  }
});
