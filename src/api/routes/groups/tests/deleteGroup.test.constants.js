module.exports = {
  test1: {
    text: "Deleting group without token",
    apiEndpoint: "/chatapp/api/group/delete-group",
    reqBody: {
      groupId: 8,
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Deleting group by an user who is not the group creator",
    apiEndpoint: "/chatapp/api/group/delete-group",
    reqBody: {
      groupId: 15,
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "You are not allowed to delete this group",
    },
  },
  test3: {
    text: "Deleting group by group creator without sending essential details in request body",
    apiEndpoint: "/chatapp/api/group/delete-group",
    reqBody: {
      groupId: "",
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Required fields missing in request body",
    },
  },
  test4: {
    text: "Deleting group which does not exist",
    apiEndpoint: "/chatapp/api/group/delete-group",
    reqBody: {
      groupId: 17,
    },
    resStatusCode: 404,
    resBody: {
      status: "Fail",
      message: "Group not found",
    },
  },
  test5: {
    text: "Deleting group successfully",
    apiEndpoint: "/chatapp/api/group/delete-group",
    reqBody: {
      groupId: 12,
    },
    resStatusCode: 200,
    resBody: {
      status: "Success",
      message: "Deleted group successfully",
    },
  },
};
