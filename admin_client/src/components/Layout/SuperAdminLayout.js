import { Fragment } from "react";

const SuperAdminLayout = (props) => {
  return (
    <Fragment>
      SuperAdmin
      <main>{props.children}</main>
    </Fragment>
  );
};

export default SuperAdminLayout;
