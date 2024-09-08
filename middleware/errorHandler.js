const { constant } = require("../constants/constant");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : constant.SERVER_ERROR;
  switch (statusCode) {
    case constant.VALIDATION_ERROR:
      res.json({
        title: constant.ERROR_VALIDATION,
        message: err.message,
        status: err.status,
      });
      break;
    case constant.NOT_FOUND:
      res.json({
        title: constant.ERROR_NOT_FOUND,
        message: err.message,
        status: err.status,
      });
      break;
    case constant.UN_AUTHORIZED:
      res.json({
        title: constant.ERROR_UN_AUTHORIZED,
        message: err.message,
        status: err.status,
      });
      break;
    case constant.FORBIDDEN:
      res.json({
        title: constant.ERROR_FORBIDDEN,
        message: err.message,
        status: err.status,
      });
      break;
    case constant.SERVER_ERROR:
      res.json({
        title: constant.ERROR_SERVER,
        message: err.message,
        status: err.status,
      });
      break;
    default:
      console.log("No error!");
      break;
  }
};

module.exports = errorHandler;
