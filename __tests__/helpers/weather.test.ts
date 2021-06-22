import { getTemp, getDis, getSpeed } from "../../src/helper/weather";

describe("Convert Celsius Temp", () => {
  it("should handle edge cases", () => {
    expect(getTemp(null, "I")).toBe("--");
  });

  it("should convert to Celsius", () => {
    expect(getTemp(100, "M")).toBe("100°C");
  });

  it("should convert to Fahrenheit", () => {
    expect(getTemp(22, "T")).toBe("72°F");
  });
});

describe("Convert Distance", () => {
  it("should convert to KM", () => {
    expect(getDis(100.22222, "M")).toBe("161.29 km");
  });

  it("should convert to Mile", () => {
    expect(getDis(22.5, "T")).toBe("22.50 mi");
  });
});

describe("Convert Speed", () => {
  it("should convert to kmph", () => {
    expect(getSpeed(100.22222, "M")).toBe("161.29 kmph");
  });

  it("should convert to mph", () => {
    expect(getSpeed(22.5, "T")).toBe("22.50 mph");
  });
});
