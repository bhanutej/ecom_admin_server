import { Table, Space } from "antd";

const OrganizationList = ({
  organizations,
  pagination,
  handleTableChange,
  tableDataLoading,
  fetchOrganization,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <span onClick={() => fetchOrganization(record._id)}>Edit</span>
          <span>Delete</span>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={organizations}
      pagination={pagination}
      onChange={handleTableChange}
      loading={tableDataLoading}
    />
  );
};

export default OrganizationList;
