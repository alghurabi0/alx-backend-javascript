export default function updateStudentGradeByCity(students, city, grades) {
  const goalStudents = students.filter((student) => student.location === city);
  return goalStudents.map((student) => {
    const hisGrade = grades.find((grade) => grade.studentId === student.id);
    if (hisGrade === undefined) {
      return {
        ...student,
        grade: 'N/A',
      };
    }
    return {
      ...student,
      grade: hisGrade.grade,
    };
  });
}
