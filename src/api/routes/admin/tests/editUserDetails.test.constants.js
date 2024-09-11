module.exports = {
  test1: {
    text: "Testing failed user details editing without sending jwt token",
    apiEndpoint: "/chatapp/api/admin/edit-user-details",
    reqBody: {
      userId: 10,
      parametersToChange: [
        {
          key: "username",
          value: "Sumana Ghosh",
        },
        {
          key: "email",
          value: "sumanag@gmail.com",
        },
        {
          key: "password",
          value: "sumana@1234",
        },
      ],
    },
    resStatusCode: 401,
    resBody: {
      status: "Fail",
      message: "Inavlid authorization bearer",
    },
  },
  test2: {
    text: "Testing failed user details editing by sending non-admin token",
    apiEndpoint: "/chatapp/api/admin/edit-user-details",
    reqBody: {
      userId: 10,
      parametersToChange: [
        {
          key: "username",
          value: "Sumana Ghosh",
        },
        {
          key: "email",
          value: "sumanag@gmail.com",
        },
        {
          key: "password",
          value: "sumana@1234",
        },
      ],
    },
    resStatusCode: 403,
    resBody: {
      status: "Fail",
      message: "You are not allowed to perform this action",
    },
  },
  test3: {
    text: "Testing failed user details editing by admin user because of missing fields in request",
    apiEndpoint: "/chatapp/api/admin/edit-user-details",
    reqBody: {
      userId: "",
      parametersToChange: "",
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Required fields missing in request body",
    },
  },
  test4: {
    text: "Testing failed user details editing by admin user because of sending invalid userid",
    apiEndpoint: "/chatapp/api/admin/edit-user-details",
    reqBody: {
      userId: 102,
      parametersToChange: [
        {
          key: "username",
          value: "Sumana Ghosh",
        },
        {
          key: "email",
          value: "sumanag@gmail.com",
        },
        {
          key: "password",
          value: "sumana@1234",
        },
      ],
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Invalid userId",
    },
  },
  test5: {
    text: "Testing failed user details editing by admin user because of sending an emailid which already exists with another user",
    apiEndpoint: "/chatapp/api/admin/edit-user-details",
    reqBody: {
      userId: 10,
      parametersToChange: [
        {
          key: "username",
          value: "Sumana Ghosh",
        },
        {
          key: "email",
          value: "ankurc@gmail.com",
        },
        {
          key: "password",
          value: "sumana@1234",
        },
      ],
    },
    resStatusCode: 400,
    resBody: {
      status: "Fail",
      message: "Email id already exists for a different user",
    },
  },
  test6: {
    text: "Testing successful user details editing by admin user",
    apiEndpoint: "/chatapp/api/admin/edit-user-details",
    reqBody: {
      userId: 10,
      parametersToChange: [
        {
          key: "username",
          value: "Sumana Ghosh",
        },
        {
          key: "password",
          value: "sumana@1234",
        },
      ],
    },
    resStatusCode: 200,
    resBody: {
      status: "Success",
      message: "Updated user details successfully",
    },
  },
};
