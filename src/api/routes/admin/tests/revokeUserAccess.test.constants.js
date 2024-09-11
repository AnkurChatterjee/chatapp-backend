module.exports = {
  test1: {
    text: "Testing failed user deletion by not sending jwt token",
    apiEndpoint: "/chatapp/api/admin/revoke-user-access",
    reqBody: {
      userId: 14,
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Testing failed user deletion by non-admin user",
    apiEndpoint: "/chatapp/api/admin/revoke-user-access",
    reqBody: {
      userId: 14,
    },
    resStatusCode: 403,
    resBody: {
      status: "Fail",
      message: "You are not allowed to perform this action",
    },
  },
  test3: {
    text: "Testing failed user deletion by admin user because of missing details in request body",
    apiEndpoint: "/chatapp/api/admin/revoke-user-access",
    reqBody: {
      userId: "",
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Required fields missing in request body",
    },
  },
  test4: {
    text: "Testing failed user deletion by admin user because of sending invalid userId",
    apiEndpoint: "/chatapp/api/admin/revoke-user-access",
    reqBody: {
      userId: 521,
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Invalid userId",
    },
  },
  test5: {
    text: "Testing successful user deletion by admin user",
    apiEndpoint: "/chatapp/api/admin/revoke-user-access",
    reqBody: {
      userId: 15,
    },
    resStatusCode: 200,
    resBody: {
      status: "Success",
      message: "User access is revoked",
    },
  },
};
