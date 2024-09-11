module.exports = {
  test1: {
    text: "Removing member from group without token",
    apiEndpoint: "/chatapp/api/group/10/remove-group-member",
    reqBody: {
      memberId: 10,
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Removing member from group by an user who is not group creator",
    apiEndpoint: "/chatapp/api/group/10/remove-group-member",
    reqBody: {
      memberId: 8,
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "You are not allowed to remove users from this group",
    },
  },
  test3: {
    text: "Removing member from group without sending essential details in request body",
    apiEndpoint: "/chatapp/api/group/10/remove-group-member",
    reqBody: {
      memberId: "",
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Required fields missing in request body",
    },
  },
  test4: {
    text: "Removing member from group which dosen't exist",
    apiEndpoint: "/chatapp/api/group/100/remove-group-member",
    reqBody: {
      memberId: 8,
    },
    resStatusCode: 404,
    resBody: {
      status: "Fail",
      message: "Group not found",
    },
  },
  test5: {
    text: "Removing user from group who is not a member",
    apiEndpoint: "/chatapp/api/group/10/remove-group-member",
    reqBody: {
      memberId: 4,
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "This user is not a member of the given group",
    },
  },
  test6: {
    text: "Removing user from group successfully",
    apiEndpoint: "/chatapp/api/group/10/remove-group-member",
    reqBody: {
      memberId: 1,
    },
    resStatusCode: 200,
    resBody: {
      status: "Success",
      message: "Removed user from group successfully",
    },
  },
};
