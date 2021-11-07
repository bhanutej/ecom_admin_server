const constants = require("./appConstants");

exports.skipPageRecords = (req) => {
  let skipRecords = constants.PAGE;
  if (req.query && req.query.page) {
    skipRecords = (parseInt(req.query.page) - 1) * constants.PER_PAGE;
  }
  return skipRecords;
};

exports.recordsPagination = (req, total) => {
  const pagination = {
    current: +req.query.page || 1,
    pageSize: constants.PER_PAGE,
    total,
  };
  return pagination;
};
