module.exports = {
  test1: {
    text: "Testing successful user login with correct email and password",
    apiEndpoint: "/chatapp/api/auth/login",
    reqBody: {
      email: "ankurc@gmail.com",
      password: "ankur@1234",
    },
    resStatusCode: 200,
    resBody: expect.objectContaining({
      status: "Success",
      username: expect.any(String),
      role: expect.any(String),
      accessToken: expect.any(String),
    }),
  },
  test2: {
    text: "Testing failed user login with invalid email",
    apiEndpoint: "/chatapp/api/auth/login",
    reqBody: {
      email: "sachin@gmail.com",
      password: "ankur@1234",
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Email id does not exist",
    },
  },
  test3: {
    text: "Testing failed user login with incorrect password",
    apiEndpoint: "/chatapp/api/auth/login",
    reqBody: {
      email: "ankurc@gmail.com",
      password: "wrongpassword@1234",
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Invalid Password",
    },
  },
};
