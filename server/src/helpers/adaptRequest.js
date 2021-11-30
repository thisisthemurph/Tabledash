/**
 * Creates a forzen request object based on the given request
 * @param {Object} req the request object
 * @returns a frozen object
 */
export default function adaptRequest(req) {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
    user: req.user,
  });
}
