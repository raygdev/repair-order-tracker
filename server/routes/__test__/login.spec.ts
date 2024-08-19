import request from "supertest";
import  { app } from "../../initApp";
import { User } from "../../models/user-model";



const createUser = async () => {
  const user = {
    firstName: "Test",
    lastName: "Test",
    email: "test@test.com",
    password: "password",
  };

  const newUser = new User(user);
  await newUser.save();
  return newUser;
};

describe("POST /api/login", () => {
  beforeEach(async () => {
    await createUser();
  });

  it("fails login with invalid credentials", async () => {
    const email = "someUser@gmail.com";
    const password = "doesNotExist";
    const response = await request(app)
      .post("/api/login")
      .send({
        email,
        password,
      })
      .expect(404);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "username/password combination doesn't exist"
    );
  });

  it("works with the right credentials", async () => {
    const email = "test@test.com";
    const password = "password";

    const response = await request(app)
      .post("/api/login")
      .send({
        email,
        password,
      })
      .expect(200);
    expect(response.body).toHaveProperty("token");
  });
});
