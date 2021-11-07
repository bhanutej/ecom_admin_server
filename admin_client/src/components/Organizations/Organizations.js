import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import OrganizationForm from "./OrganizationForm";
import OrganizationList from "./OrganizationList";
import classes from "./Organizations.module.css";

const Organizations = () => {
  const initialPagination = {
    cuurent: 1,
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
  };

  useEffect(() => {
    setTableDataLoading(true);
    axios.get(`/api/v1/organizations`).then(({ data }) => {
      const { success, organizations, pagination } = data;
      if (success) {
        setOrganizations(organizations);
        setPagination({ ...pagination });
        setTableDataLoading(false);
      }
    });
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableDataLoading(true);
    axios
      .get(`/api/v1/organizations?page=${pagination.current}`)
      .then(({ data }) => {
        const { success, organizations, pagination } = data;
        if (success) {
          setOrganizations(organizations);
          setPagination({ ...pagination });
          setTableDataLoading(false);
        }
      });
  };

  const fetchOrganizations = () => {
    setTableDataLoading(true);
    axios
      .get(`/api/v1/organizations?page=${pagination.current}`)
      .then(({ data }) => {
        const { success, organizations, pagination } = data;
        if (success) {
          setOrganizations(organizations);
          setPagination({ ...pagination });
          setTableDataLoading(false);
        }
      });
  };

  const fetchOrganization = (organization_id) => {
    axios
      .get(`/api/v1/organization/?organization_id=${organization_id}`)
      .then(({ data }) => {
        const { success, organization } = data;
        if (success) {
          setOrganization({ ...organization });
          showDrawer();
        }
      });
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
        fetchOrganization={fetchOrganization}
      />
      <OrganizationForm
        visibleForm={visibleForm}
        closeForm={onClose}
        organization={organization}
        fetchOrganizations={fetchOrganizations}
      />
    </div>
  );
};

export default Organizations;
