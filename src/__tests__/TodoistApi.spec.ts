import axios = require("axios");
import TodoistApiREST from "../TodoistApiREST";

describe("Todoist API", () => {
  it("should create an axios instance on instantiating", () => {
    const mockFunc = jest.fn();
    axios.default.create = mockFunc;
    new TodoistApiREST("123");
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it("should create the axios instance with the correct arguments", () => {
    const mockFunc = jest.fn();
    axios.default.create = mockFunc;
    new TodoistApiREST("123");
    expect(mockFunc.mock.calls[0][0]).toMatchObject({
      baseURL: "https://beta.todoist.com/API/v8/",
      headers: { Authorization: "Bearer 123" }
    });
  });
});
