import { TodoistLabels } from "../Partials/TodoistLabels";

describe("Todoist Labels", () => {
  const mockGet = jest.fn(() => new Promise((res) => res({ data: "foo" })));
  const mockPost = jest.fn(() => new Promise((res) => res({ data: "bar" })));
  const mockDelete = jest.fn(() => new Promise((res) => res("baz")));

  const mockInstance = {
    get: mockGet,
    post: mockPost,
    delete: mockDelete,
  };

  afterEach(() => {
    mockInstance.get.mockClear();
    mockInstance.post.mockClear();
    mockInstance.delete.mockClear();
  });

  describe("getAllLabels", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistLabels.getAllLabels(mockInstance);
      expect(mockGet).toHaveBeenCalledWith("labels");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistLabels.getAllLabels(mockInstance);
      expect(data).toEqual("foo");
    });
  });

  describe("createLabel", () => {
    it("should pass the right arguments", () => {
      // @ts-ignore
      TodoistLabels.createLabel(mockInstance, {
        name: "foo",
        order: 3,
        color: 30,
        favorite: true,
      });
      expect(mockPost).toHaveBeenCalledWith(
        "labels",
        { name: "foo", order: 3, color: 30, favorite: true },
        { headers: { "Content-Type": "application/json" } }
      );
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistLabels.createLabel(mockInstance);
      expect(data).toEqual("bar");
    });
  });

  describe("getLabelById", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistLabels.getLabelById(mockInstance, 123);
      expect(mockGet).toHaveBeenCalledWith("labels/123");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistLabels.getLabelById(mockInstance);
      expect(data).toEqual("foo");
    });
  });

  describe("updateLabelById", () => {
    it("should pass the right argument if the optional arguments are omitted", () => {
      // @ts-ignore
      TodoistLabels.updateLabelById(mockInstance, 123);
      expect(mockPost).toHaveBeenCalledWith(
        "labels/123",
        {},
        { headers: { "Content-Type": "application/json" } }
      );
    });

    it("should pass the right argument if the optional arguments are included", () => {
      // @ts-ignore
      TodoistLabels.updateLabelById(mockInstance, 123, {
        name: "foobar",
        order: 4,
      });
      expect(mockPost).toHaveBeenCalledWith(
        "labels/123",
        { name: "foobar", order: 4 },
        { headers: { "Content-Type": "application/json" } }
      );
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistLabels.updateLabelById(mockInstance);
      expect(data).toEqual({ data: "bar" });
    });
  });

  describe("deleteLabel", () => {
    it("should pass the right argument", () => {
      // @ts-ignore
      TodoistLabels.deleteLabel(mockInstance, 123);
      expect(mockDelete).toHaveBeenCalledWith("labels/123");
    });

    it("should return the correct data", async () => {
      // @ts-ignore
      const data = await TodoistLabels.deleteLabel(mockInstance);
      expect(data).toEqual("baz");
    });
  });
});
