export default function signUpUser(firstName, lastName) {
  return new Promise((resolve, reject) => {
    if (!firstName || !lastName) {
      reject('First name and last name are required');
    } else {
      resolve({ firstName, lastName });
    }
  });
}
