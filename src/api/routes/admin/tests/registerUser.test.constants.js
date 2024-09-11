module.exports = {
  test1: {
    text: "Testing failed user registration without sending jwt token",
    apiEndpoint: "/chatapp/api/admin/add-user-to-role",
    reqBody: {
      userName: "Aman Tiwari",
      userEmail: "amant@gmail.com",
      password: "aman@1234",
      userRole: "user",
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Testing failed user registration with non-admin jwt token",
    apiEndpoint: "/chatapp/api/admin/add-user-to-role",
    reqBody: {
      userName: "Aman Tiwari",
      userEmail: "amant@gmail.com",
      password: "aman@1234",
      userRole: "user",
    },
    resStatusCode: 403,
    resBody: {
      status: "Fail",
      message: "You are not allowed to perform this action",
    },
  },
  test3: {
    text: "Testing failed user registration with admin jwt token and without sending emailid and password in request body",
    apiEndpoint: "/chatapp/api/admin/add-user-to-role",
    reqBody: {
      userName: "Aman Tiwari",
      userEmail: "",
      password: "",
      userRole: "user",
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Required fields missing in request body",
    },
  },
  test4: {
    text: "Testing failed user registration with admin jwt token and sending an emailid which is already registered with another user",
    apiEndpoint: "/chatapp/api/admin/add-user-to-role",
    reqBody: {
      userName: "Aman Tiwari",
      userEmail: "ankurc@gmail.com",
      password: "aman@1234",
      userRole: "user",
    },
    resStatusCode: 400,
    resBody: {
        status: "Fail",
        message: "Email id already exists for a different user"
    },
  },
  test5: {
    text: "Testing successful user registration with admin jwt token",
    apiEndpoint: "/chatapp/api/admin/add-user-to-role",
    reqBody: {
      userName: "Anuj Paul",
      userEmail: `anujp.${Math.random()*10**5}@gmail.com`,
      password: "anuj@1234",
      userRole: "user",
    },
    resStatusCode: 200,
    resBody: {
        status: "Success",
        message: "User has been registered successfully"
    },
  },
};
