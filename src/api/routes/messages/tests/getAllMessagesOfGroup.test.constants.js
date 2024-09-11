module.exports = {
  test1: {
    text: "Getting all messages of group without jwt token",
    apiEndpoint: "/chatapp/api/messages/9/get-all-messages",
    reqBody: {},
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Getting all messages of group by an user who is not a member of the group",
    apiEndpoint: "/chatapp/api/messages/9/get-all-messages",
    reqBody: {},
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "You are not a member of this group",
    },
  },
  test3: {
    text: "Getting all messages from a group which dosen't exist",
    apiEndpoint: "/chatapp/api/messages/99/get-all-messages",
    reqBody: {},
    resStatusCode: 404,
    resBody: {
      status: "Fail",
      message: "Group not found",
    },
  },
  test4: {
    text: "Getting all messages from a group which dosen't have any message",
    apiEndpoint: "/chatapp/api/messages/10/get-all-messages",
    reqBody: {},
    resStatusCode: 200,
    resBody: {
      status: "Fail",
      messages: "No messages found for this group",
    },
  },
  test5: {
    text: "Getting all messages from a group successfully",
    apiEndpoint: "/chatapp/api/messages/9/get-all-messages",
    reqBody: {},
    resStatusCode: 200,
    resBody: {
      status: "Success",
      messages: [
        {
          id: 2,
          sentBy: "Sriya Sarkar",
          senderId: 8,
          message: "This is a test message",
          sentAt: "2024-09-09T14:28:12.000Z",
          likes: 1,
        },
      ],
    },
  },
};
