export default function isJSONString(data) {
  try {
    const json = JSON.parse(data);
    const objType = Object.prototype.toString.call(json);
    if (!(objType.endsWith("Object]") || objType.endsWith("Array]"))) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}
