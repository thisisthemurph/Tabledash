import requiredParam from "../helpers/requiredParam.js";

export default function makeAuth(authInfo = requiredParam("authInfo")) {
  const validAuth = validate(authInfo);
  const normalAuth = normalize(validAuth);
  return Object.freeze(normalAuth);

  function validate({
    username = requiredParam("username"),
    password = requiredParam("password"),
  }) {
    return { username, password };
  }

  function normalize({ username, ...otherInfo }) {
    return { username: username.toLowerCase(), ...otherInfo };
  }
}
