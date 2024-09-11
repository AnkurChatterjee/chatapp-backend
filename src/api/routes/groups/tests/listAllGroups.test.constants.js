module.exports = {
  test1: {
    text: "Listing all groups without token",
    apiEndpoint: "/chatapp/api/group/get-all-groups",
    reqBody: {},
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Listing all groups by normal user",
    apiEndpoint: "/chatapp/api/group/get-all-groups",
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
        {
          id: 10,
          groupName: "test-group-4",
          createdOn: "2024-09-09T07:51:50.000Z",
          createdBy: 2,
        },
        {
          id: 11,
          groupName: "test-group-5",
          createdOn: "2024-09-11T13:43:50.000Z",
          createdBy: 1,
        },
        {
          id: 12,
          groupName: "test-group-5",
          createdOn: "2024-09-11T13:45:54.000Z",
          createdBy: 1,
        },
        {
          id: 14,
          groupName: "test-group-6",
          createdOn: "2024-09-11T13:48:26.000Z",
          createdBy: 1,
        },
        {
          id: 15,
          groupName: "test-group-1030.7408993919198",
          createdOn: "2024-09-11T13:49:25.000Z",
          createdBy: 1,
        },
      ],
    },
  },
};
