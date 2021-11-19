export default function isErrorObject({ success, error }) {
  return success === false && typeof error === "string";
}
