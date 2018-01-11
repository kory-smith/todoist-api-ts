import { TodoistTasks } from "../Partials/TodoistTasks";

describe("Todoist Tasks", () => {
  const mockGet = jest.fn(() => new Promise(res => res({ data: "foo" })));
  const mockPost = jest.fn(() => new Promise(res => res({ data: "bar" })));
  const mockDelete = jest.fn(() => new Promise(res => res({ data: "baz" })));

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

  describe("getAllTasks", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistTasks.getAllTasks(mockInstance);
      expect(mockGet).toHaveBeenCalledWith("tasks");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistTasks.getAllTasks(mockInstance);
      expect(data).toEqual("foo");
    });
  });

  describe("getTasksFiltered", () => {
    it("should pass the right arguments", () => {
      const args = {
        project_id: 1234,
        label_id: 5678,
        filter: "foo"
      };
      // @ts-ignore
      TodoistTasks.getTasksFiltered(mockInstance, args);
      expect(mockGet).toHaveBeenCalledWith("tasks", {
        params: {
          project_id: 1234,
          label_id: 5678,
          filter: "foo"
        }
      });
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistTasks.getTasksFiltered(mockInstance);
      expect(data).toEqual("foo");
    });
  });

  describe("createNewTask", () => {
    const passParameters = {
      content: "hello world",
      due_string: "today"
    };

    const failParameters = {
      content: "hello world",
      due_string: "today",
      due_date: "2018-01-01"
    };

    it('should throw an error if more than one "due_" arguments are passed', () => {
      expect(() => {
        // @ts-ignore
        TodoistTasks.createNewTask(mockInstance, failParameters);
      }).toThrow('only one of the "due_*" parameters can be used');
    });

    it("should pass the right arguments", () => {
      // @ts-ignore
      TodoistTasks.createNewTask(mockInstance, passParameters);
      expect(mockPost).toHaveBeenCalledWith(
        "tasks",
        { content: "hello world", due_string: "today" },
        { headers: { "Content-Type": "application/json" } }
      );
    });

    it("should return the correct data", async () => {
      const data = await TodoistTasks.createNewTask(
        // @ts-ignore
        mockInstance,
        passParameters
      );
      expect(data).toEqual("bar");
    });
  });

  describe("getTaskById", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistTasks.getTaskById(mockInstance, 123);
      expect(mockGet).toHaveBeenCalledWith("tasks/123");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistTasks.getTaskById(mockInstance, 123);
      expect(data).toEqual("foo");
    });
  });

  describe("updateTaskById", () => {
    const passParameters = {
      content: "hello world",
      due_string: "today"
    };

    const failParameters = {
      content: "hello world",
      due_string: "today",
      due_date: "2018-01-01"
    };

    it('should throw an error if more than one "due_" arguments are passed', () => {
      expect(() => {
        // @ts-ignore
        TodoistTasks.updateTaskById(mockInstance, 123, failParameters);
      }).toThrow('only one of the "due_*" parameters can be used');
    });

    it("should pass the right arguments", () => {
      // @ts-ignore
      TodoistTasks.updateTaskById(mockInstance, 123, passParameters);
      expect(mockPost).toHaveBeenCalledWith(
        "tasks/123",
        { content: "hello world", due_string: "today" },
        { headers: { "Content-Type": "application/json" } }
      );
    });

    it("should return the correct data", async () => {
      const data = await TodoistTasks.updateTaskById(
        // @ts-ignore
        mockInstance,
        123,
        passParameters
      );
      expect(data).toEqual({ data: "bar" });
    });
  });

  describe("closeTaskById", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistTasks.closeTaskById(mockInstance, 123);
      expect(mockPost).toHaveBeenCalledWith("tasks/123/close");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistTasks.closeTaskById(mockInstance, 123);
      expect(data).toEqual({ data: "bar" });
    });
  });

  describe("reopenTaskById", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistTasks.reopenTaskById(mockInstance, 123);
      expect(mockPost).toHaveBeenCalledWith("tasks/123/reopen");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistTasks.reopenTaskById(mockInstance, 123);
      expect(data).toEqual({ data: "bar" });
    });
  });

  describe("deleteTaskById", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistTasks.deleteTaskById(mockInstance, 123);
      expect(mockDelete).toHaveBeenCalledWith("tasks/123");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistTasks.deleteTaskById(mockInstance, 123);
      expect(data).toEqual({ data: "baz" });
    });
  });
});
