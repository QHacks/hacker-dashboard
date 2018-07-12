import { testVal } from "./config/testModule";

test("Works with babel", () => {
  expect(testVal).toBe("test");
});
