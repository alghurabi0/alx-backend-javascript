export default function createReportObject(employeesList) {
  return {
    allEmployees: employeesList,
    getNumberOfDepartments: () => Object.entries(employeesList).length,
  };
}
