export default function getListStudentsIds(students) {
  if (!(students instanceof Array)) {
    return [];
  }
  return students.map((student) => student.id);
}
