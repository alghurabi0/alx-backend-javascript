export default function iterateThroughObject(reportWithIterator) {
  let longString = ``; 
  for (let i = 0; i < reportWithIterator.length; i++) {
    if (i === reportWithIterator.length -1) {
      longString += `${reportWithIterator[i]}`;
    } else {
      longString += `${reportWithIterator[i]} | `;
    }
  }
  return longString;
}
