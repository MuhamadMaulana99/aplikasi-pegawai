export default function errorHandler(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error("API Error:", error);

      let statusCode = error.status || 500;
      let message = error.message || "Internal Server Error";

      // Mapping status code
      const statusMap = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        409: "Conflict",
        500: "Internal Server Error",
      };

      return res.status(statusCode).json({
        success: false,
        error: {
          status: statusCode,
          message: message || statusMap[statusCode] || "Unknown Error",
        },
      });
    }
  };
}
export const successResponse = (
  res,
  message,
  data = null,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

export const errorResponse = (res, error, statusCode = 500) => {
  console.error("API Error:", error); // Log error ke console (opsional)

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: error || "Terjadi kesalahan pada server",
  });
};
