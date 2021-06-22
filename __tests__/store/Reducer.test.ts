import Reducer from "../../src/store/Reducer";

describe("Reducer", () => {
  it("handles SET_UNIT", () => {
    const result = Reducer({ unit: "" }, { type: "SET_UNIT", payload: "K" });
    expect(result.unit).toEqual("K");
  });

  it("returns an unchanged store if no action is sent", () => {
    const result = Reducer({ unit: "T" }, null);
    expect(result).toEqual({ unit: "T" });
  });
});
