import { TodoistComments } from "../Partials/TodoistComments";

describe("Todoist Comments", () => {
  const mockGet = jest.fn(() => new Promise(res => res({ data: "foo" })));
  const mockPost = jest.fn(() => new Promise(res => res({ data: "bar" })));
  const mockDelete = jest.fn(() => new Promise(res => res("baz")));

  const mockInstance = {
    get: mockGet,
    post: mockPost,
    delete: mockDelete
  };

  afterEach(() => {
    mockInstance.get.mockClear();
    mockInstance.post.mockClear();
    mockInstance.delete.mockClear();
  });

  describe("getAllComments", () => {
    it("should throw an error if no id is passed", () => {
      expect(() => {
        // @ts-ignore
        TodoistComments.getAllComments(mockInstance);
      }).toThrow("projectId or taskId have to be passed");
    });

    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistComments.getAllComments(mockInstance, 123);
      expect(mockGet).toHaveBeenCalledWith("comments", { params: { id: 123 } });
      // @ts-ignore
      TodoistComments.getAllComments(mockInstance, 123, 123);
      expect(mockGet).toHaveBeenCalledWith("comments", {
        params: { id: 123, task_id: 123 }
      });
      // @ts-ignore
      TodoistComments.getAllComments(mockInstance, undefined, 123);
      expect(mockGet).toHaveBeenCalledWith("comments", {
        params: { task_id: 123 }
      });
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistComments.getAllComments(mockInstance, 123);
      expect(data).toEqual("foo");
    });
  });

  describe("createComment", () => {
    it("should throw an error if no id is passed", () => {
      expect(() => {
        // @ts-ignore
        TodoistComments.createComment(mockInstance, "foobar");
      }).toThrow("projectId or taskId have to be passed");
    });

    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistComments.createComment(mockInstance, "foobar", 123);
      expect(mockPost).toHaveBeenCalledWith(
        "comments",
        {
          content: "foobar",
          id: 123
        },
        { headers: { "Content-Type": "application/json" } }
      );
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistComments.createComment(
        mockInstance as any,
        "foobar",
        123
      );
      expect(data).toEqual("bar");
    });
  });

  describe("getCommentById", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistComments.getCommentById(mockInstance, 123);
      expect(mockGet).toHaveBeenCalledWith("comments/123");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistComments.getCommentById(mockInstance, 123);
      expect(data).toEqual("foo");
    });
  });

  describe("updateComment", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistComments.updateComment(mockInstance, 123, "foobar");
      expect(mockPost).toHaveBeenCalledWith(
        "comments/123",
        { content: "foobar" },
        { headers: { "Content-Type": "application/json" } }
      );
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistComments.updateComment(mockInstance, 123);
      expect(data).toEqual({ data: "bar" });
    });
  });

  describe("deleteComment", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistComments.deleteComment(mockInstance, 123);
      expect(mockDelete).toHaveBeenCalledWith("comments/123");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistComments.deleteComment(mockInstance, 123);
      expect(data).toEqual("baz");
    });
  });
});
