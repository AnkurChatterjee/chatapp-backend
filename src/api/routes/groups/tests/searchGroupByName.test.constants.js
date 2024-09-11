module.exports = {
  test1: {
    text: "Searching group without token",
    apiEndpoint: "/chatapp/api/group/search-group?name=oup-3",
    reqBody: {},
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Searching group without query params",
    apiEndpoint: "/chatapp/api/group/search-group",
    reqBody: {},
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Group name missing",
    },
  },
  test3: {
    text: "Searching group with wrong query params",
    apiEndpoint: "/chatapp/api/group/search-group?name=tester",
    reqBody: {},
    resStatusCode: 404,
    resBody: {
      status: "Fail",
      message: "No results",
    },
  },
  test4: {
    text: "Searching group with wrong query params",
    apiEndpoint: "/chatapp/api/group/search-group?name=tester",
    reqBody: {},
    resStatusCode: 404,
    resBody: {
      status: "Fail",
      message: "No results",
    },
  },
  test5: {
    text: "Searching group with valid query params",
    apiEndpoint: "/chatapp/api/group/search-group?name=oup-3",
    reqBody: {},
    resStatusCode: 200,
    resBody: {
      status: "Success",
      groups: [
        {
          id: 9,
          groupName: "test-group-3",
          createdOn: "2024-09-09T07:51:50.000Z",
          createdBy: 8,
        },
      ],
    },
  },
};
