import React, { useState, useEffect, useCallback } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import OrganizationForm from "./OrganizationForm";
import OrganizationList from "./OrganizationList";
import classes from "./Organizations.module.css";
import { fetchOrganizations, fetchOrganization } from "./Api/organizationApis";

const Organizations = () => {
  const initialPagination = {
    current: 1,
    pageSize: 5,
    total: 5,
  };
  const [visibleForm, setVisibleForm] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [pagination, setPagination] = useState({ ...initialPagination });
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const [organization, setOrganization] = useState(null);

  const showDrawer = () => {
    setVisibleForm(true);
  };
  const onClose = () => {
    setVisibleForm(false);
    setOrganization(null);
  };

  const _getOrganizations = useCallback(async () => {
    setTableDataLoading(true);
    const { data } = await fetchOrganizations(initialPagination);
    const { success, organizations, pagination } = data;
    if (success) {
      setOrganizations(organizations);
      setPagination({ ...pagination });
      setTableDataLoading(false);
    }
  }, [pagination]);

  useEffect(() => {
    _getOrganizations();
  }, []);

  const handleTableChange = async (paginationObj, filters, sorter) => {
    setTableDataLoading(true);
    const { data } = await fetchOrganizations(paginationObj);
    const { success, organizations, pagination } = data;
    if (success) {
      setOrganizations(organizations);
      setPagination({ ...pagination });
      setTableDataLoading(false);
    }
  };

  const getOrganizations = () => {
    setTableDataLoading(true);
    _getOrganizations();
  };

  const getOrganization = async (organization_id) => {
    const { data } = await fetchOrganization(organization_id);
    const { success, organization } = data;
    if (success) {
      setOrganization({ ...organization });
      showDrawer();
    }
  };

  return (
    <div>
      <div className={classes.newBtn}>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New Organization
        </Button>
      </div>
      <OrganizationList
        organizations={organizations}
        pagination={pagination}
        handleTableChange={handleTableChange}
        tableDataLoading={tableDataLoading}
        getOrganization={getOrganization}
      />
      <OrganizationForm
        visibleForm={visibleForm}
        closeForm={onClose}
        organization={organization}
        getOrganizations={getOrganizations}
      />
    </div>
  );
};

export default Organizations;
