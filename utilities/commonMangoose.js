const constants = require("./appConstants");
exports.skipPageRecords = (req) => {
  let skipRecords = constants.PAGE;
  if (req.query && req.query.page) {
    skipRecords = (parseInt(req.query.page) - 1) * constants.PER_PAGE;
  }
  return skipRecords;
};
