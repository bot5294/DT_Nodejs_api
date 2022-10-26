const ApiResponse = require("./ApiResponse");

function apiResponseHandler(err, req, res, next) {
  // in prod, don't use console.log or console.err because
  // it is not async
  console.error(err);
  if (err instanceof ApiResponse) {
    res.status(err.code).json(err.message);
    return;
  }
  res.status(500).json("something went wrong");
}

module.exports = apiResponseHandler;
