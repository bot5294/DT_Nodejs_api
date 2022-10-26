class ApiResponse {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiResponse(400, msg);
  }
  static notFound(msg) {
    return new ApiResponse(404, msg);
  }
  static internal(msg) {
    return new ApiResponse(500, msg);
  }
  static success(msg) {
    return new ApiResponse(200, msg);
  }
}

module.exports = ApiResponse;
