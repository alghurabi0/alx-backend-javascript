export default function createIteratorObject(report) {
  const arrayOfArr = Object.values(report.allEmployees);
  let names = [];
  for (const arr of arrayOfArr) {
    for (const name of arr) {
      names.push(name);
    }
  }
  return names;
}
