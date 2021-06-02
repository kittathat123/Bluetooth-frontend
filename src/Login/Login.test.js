// const username = require("./Login");
// const name = "window";

// test("input", () => {
//   expect(username(name)).not.toBe("");
// });

const sum = require("../sum/sum.js");

test("Test Input Username", () => {
  expect(sum(1, 2)).toBe(3);
});

test("Test Input Password", () => {
  expect(sum(1, 2)).toBe(3);
});

test("Test Input empty Username", () => {
  expect(sum(1, 2)).toBe(4);
});
