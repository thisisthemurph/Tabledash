import { RequiredParameterError } from "./errors.js";

export default function (param) {
  throw new RequiredParameterError(param);
}
