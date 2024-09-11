module.exports = {
  test1: {
    text: "Adding members without token",
    apiEndpoint: "/chatapp/api/group/10/add-group-members",
    reqBody: {
      userIdsToAdd: [10],
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Adding members by someone who is not an admin or a group creator",
    apiEndpoint: "/chatapp/api/group/15/add-group-members",
    reqBody: {
      userIdsToAdd: [10],
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "You are not allowed to add members to this group",
    },
  },
  test3: {
    text: "Adding members without sending essential fields in request",
    apiEndpoint: "/chatapp/api/group/3/add-group-members",
    reqBody: {
      userIdsToAdd: "",
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Required fields missing in request body",
    },
  },
  test4: {
    text: "Adding members to a group which dosen't exist",
    apiEndpoint: "/chatapp/api/group/33/add-group-members",
    reqBody: {
      userIdsToAdd: [1, 8],
    },
    resStatusCode: 404,
    resBody: {
      status: "Fail",
      message: "Group not found",
    },
  },
  test5: {
    text: "Adding a non-existant member to a group",
    apiEndpoint: "/chatapp/api/group/9/add-group-members",
    reqBody: {
      userIdsToAdd: [1, 80],
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "80 is not a valid user",
    },
  },
  test6: {
    text: "Adding members to a group successfully",
    apiEndpoint: "/chatapp/api/group/9/add-group-members",
    reqBody: {
      userIdsToAdd: [1, 2, 3],
    },
    resStatusCode: 200,
    resBody: {
      status: "Success",
      message: "Members added successfully",
    },
  },
};
