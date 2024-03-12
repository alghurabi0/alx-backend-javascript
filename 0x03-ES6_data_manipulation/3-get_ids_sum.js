export default function getStudentIdsSum(students) {
  return students.reduce((acc ,student) => {
    return acc + student.id;
  }, 0);
}
