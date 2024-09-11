const request = require("supertest");
const mockTestCases = require("./addMembersToGroup.test.constants");
const app = require("../../../../app");

describe("Testing add members to group without sending jwt token", () => {
  //should fail without a token
  test(mockTestCases?.[`test1`].text, async () => {
    const response = await request(app)
      .post(mockTestCases?.[`test1`].apiEndpoint)
      .send(mockTestCases?.[`test1`].reqBody);
    expect(response.statusCode).toBe(mockTestCases?.[`test1`].resStatusCode);
    expect(response.body).toEqual(mockTestCases?.[`test1`].resBody);
  });
});

describe("Testing add members to group by someone who is not an admin or group creator", () => {
  let accessToken;
  //set up user token before test
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/chatapp/api/auth/login")
      .send({
        email: "sumanag@gmail.com",
        password: "sumana@1234",
      });
    accessToken = loginResponse.body.accessToken;
  });

  test(mockTestCases?.[`test2`].text, async () => {
    const response = await request(app)
      .post(mockTestCases?.[`test2`].apiEndpoint)
      .set("Authorization", `chatapp-token=${accessToken}`)
      .send(mockTestCases?.[`test2`].reqBody);
    expect(response.statusCode).toBe(mockTestCases?.[`test2`].resStatusCode);
    expect(response.body).toEqual(mockTestCases?.[`test2`].resBody);
  });
});

describe("Testing add members to group by group creator", () => {
  let accessToken;
  //set up user token before test
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/chatapp/api/auth/login")
      .send({
        email: "sumanag@gmail.com",
        password: "sumana@1234",
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
