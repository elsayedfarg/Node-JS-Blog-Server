const sendResponse = (res, data, status = 200, extra = {}) => {
  const response = {
    status: "success",
    ...extra,
  };

  if (data !== undefined && data !== null) {
    response.data = data;
  }

  res.status(status).json(response);
};

module.exports = sendResponse;
