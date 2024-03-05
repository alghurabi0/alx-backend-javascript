import { signUpUser } from "./4-user-promise.js";
import { uploadPhoto } from "./5-photo-reject.js";

export default function handleProfileSignup(firstName, lastName, fileName) {
  return Promise.allSettled[
    (signUpUser(firstName, lastName), uploadPhoto(fileName))
  ].then((values) =>
    valuse.map((v) => ({
      status: v.status,
      value: v.status === "fulfilled" ? v.value : String(v.reason),
    }))
  );
}
