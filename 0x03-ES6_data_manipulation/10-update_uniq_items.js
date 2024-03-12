export default function updateUniqueItems(obj) {
  if (!(obj instanceof Map)) {
    throw new Error('Cannot process');
  }
  obj.forEach((value, key, map) => {
    if (value === 1) {
      map.set(key, 100);
    }
  });
  return obj;
}
