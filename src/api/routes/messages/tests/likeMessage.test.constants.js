module.exports = {
  test1: {
    text: "Liking message without jwt token",
    apiEndpoint: "/chatapp/api/messages/10/1/add-like",
    reqBody: {},
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Liking message by a non-member user",
    apiEndpoint: "/chatapp/api/messages/9/2/add-like",
    reqBody: {},
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "You are not a member of this group",
    },
  },
  test3: {
    text: "Liking message by a group member",
    apiEndpoint: "/chatapp/api/messages/9/2/add-like",
    reqBody: {},
    resStatusCode: 200,
    resBody: {
      status: "Success",
      message: "Like added",
    },
  },
};
