export function errorStyle(errorArr, key) {
  for (const error of errorArr) {
    if (error.includes(key)) {
      return { outline: "1px solid red" };
    }
  }
  return { outline: "1px solid black" };
}
