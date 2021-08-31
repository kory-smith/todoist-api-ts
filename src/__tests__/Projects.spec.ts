import { TodoistProjects } from "../Partials/TodoistProjects";

describe("Todoist Projects", () => {
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

  describe("getAllProjects", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistProjects.getAllProjects(mockInstance);
      expect(mockGet).toHaveBeenCalledWith("projects");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistProjects.getAllProjects(mockInstance);
      expect(data).toEqual("foo");
    });
  });

  describe("getProjectById", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistProjects.getProjectById(mockInstance, 123);
      expect(mockGet).toHaveBeenCalledWith("projects/123");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistProjects.getProjectById(mockInstance, 123);
      expect(data).toEqual("foo");
    });
  });

  describe("createProject", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistProjects.createProject(mockInstance, "testproject");
      expect(mockPost).toHaveBeenCalledWith(
        "projects",
        { name: "testproject" },
        { headers: { "Content-Type": "application/json" } }
      );
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistProjects.createProject(
        mockInstance as any,
        "testProject"
      );
      expect(data).toEqual("bar");
    });
  });

  describe("updateProjectNameById", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistProjects.updateProjectNameById(mockInstance, 123, "foobar");
      expect(mockPost).toHaveBeenCalledWith(
        "projects/123",
        { name: "foobar" },
        { headers: { "Content-Type": "application/json" } }
      );
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistProjects.updateProjectNameById(
        mockInstance,
        "testProject"
      );
      expect(data).toEqual({ data: "bar" });
    });
  });

  describe("deleteProjectById", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistProjects.deleteProjectById(mockInstance, 123);
      expect(mockDelete).toHaveBeenCalledWith("projects/123");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistProjects.deleteProjectById(
        mockInstance as any,
        "testProject"
      );
      expect(data).toEqual("baz");
    });
  });
});
