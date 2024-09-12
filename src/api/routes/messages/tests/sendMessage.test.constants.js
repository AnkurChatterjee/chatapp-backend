module.exports = {
  test1: {
    text: "Sending message to a group without jwt token",
    apiEndpoint: "/chatapp/api/messages/9/send-message",
    reqBody: {
      message: "This is a test message",
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Sending message to a group by an user who is not a member or admin",
    apiEndpoint: "/chatapp/api/messages/9/send-message",
    reqBody: {
      message: "This is a test message",
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "You are not a member of this group",
    },
  },
  test3: {
    text: "Sending message to a group by a member without sending essential fields in request",
    apiEndpoint: "/chatapp/api/messages/9/send-message",
    reqBody: {
      message: "",
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Missing required fields in request",
    },
  },
  test4: {
    text: "Sending message to a group which does not exist",
    apiEndpoint: "/chatapp/api/messages/90/send-message",
    reqBody: {
      message: "This is a test message",
    },
    resStatusCode: 404,
    resBody: {
      status: "Fail",
      message: "Group not found",
    },
  },
  test5: {
    text: "Sending message to a group by a member successfully",
    apiEndpoint: "/chatapp/api/messages/9/send-message",
    reqBody: {
      message: `This is a test message-${Math.floor(Math.random() * 10 ** 4)}`,
    },
    resStatusCode: 200,
    resBody: {
      status: "Success",
      message: "Message sent",
    },
  },
};
