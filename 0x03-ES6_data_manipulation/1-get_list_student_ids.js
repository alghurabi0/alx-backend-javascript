export default function getListStudentsIds(students) {
  return students.map((student) => {
    return student.id;
  };
}
