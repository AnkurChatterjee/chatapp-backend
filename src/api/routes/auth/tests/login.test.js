const request = require("supertest");
const mockTestCases = require("./login.test.constants");
const app = require("../../../../app");

describe("User login API testing", () => {
  for (let i = 1; i <= Object.keys(mockTestCases).length; i++) {
    test(mockTestCases?.[`test${i}`].text, async () => {
      const response = await request(app)
        .post(mockTestCases?.[`test${i}`].apiEndpoint)
        .send(mockTestCases?.[`test${i}`].reqBody);
      expect(response.statusCode).toBe(
        mockTestCases?.[`test${i}`].resStatusCode
      );
      expect(response.body).toEqual(mockTestCases?.[`test${i}`].resBody);
    });
  }
});
