const organizationController = require("../../controllers/v1/organizations");
const authCheck = require("../../middlewares/authCheck");
const superAdminAuthCheck = require("../../middlewares/superAdminAuthCheck");

module.exports = (app) => {
  app.post(
    "/api/v1/organizations/create",
    authCheck,
    superAdminAuthCheck,
    organizationController.create
  );

  app.get(
    "/api/v1/organizations/",
    authCheck,
    superAdminAuthCheck,
    organizationController.organizations
  );

  app.get(
    "/api/v1/organization/",
    authCheck,
    superAdminAuthCheck,
    organizationController.organization
  );
};
