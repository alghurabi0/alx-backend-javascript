export default function updateUniqueItems(obj) {
  if (!(obj instanceof Map)) {
    throw new Error('Cannot process');
  }
  obj.forEach((key, value, map) => {
    if (value === 1) {
      map.set(key, 100);
    }
  });
  return obj;
}
