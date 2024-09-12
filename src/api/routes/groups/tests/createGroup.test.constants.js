module.exports = {
  test1: {
    text: "Creating group without token",
    apiEndpoint: "/chatapp/api/group/create-new-group",
    reqBody: {
      groupName: "test-group-5",
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Creating group with token and without sending group name in request body",
    apiEndpoint: "/chatapp/api/group/create-new-group",
    reqBody: {
      groupName: "",
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Required fields missing in request body",
    },
  },
  test3: {
    text: "Creating group successfully",
    apiEndpoint: "/chatapp/api/group/create-new-group",
    reqBody: {
      groupName: `test-group-${Math.random() * 10 ** 4}`,
    },
    resStatusCode: 200,
    resBody: {
      status: "Success",
      message: "Group created successfully",
    },
  },
};
