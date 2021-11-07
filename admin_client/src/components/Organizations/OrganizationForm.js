import { Drawer, Form, Input, Button, Select } from "antd";
import axios from "axios";

import { notifyMessage } from "../../utilities/NotifyMessages";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;

const OrganizationForm = ({
  visibleForm,
  closeForm,
  organization,
  fetchOrganizations,
}) => {
  const [form] = Form.useForm();

  if (organization) {
    form.setFieldsValue({ ...organization });
  }

  const onFinish = (formObject) => {
    if (organization) {
      axios
        .put(`/api/v1/organization/${organization.id}`, { ...formObject })
        .then(({ data }) => {
          const { success } = data;
          if (success) {
            console.log(data);
            notifyMessage("success", "Orgainization updated!");
            closeForm();
            fetchOrganizations();
          }
        })
        .catch((exception) => {
          const { data } = exception.response;
          const { errors } = data;
          if (errors && errors.length > 0) {
            notifyMessage("error", errors[0]);
          }
        });
    } else {
      axios
        .post("/api/v1/organizations/create", { ...formObject })
        .then(({ data }) => {
          const { success } = data;
          if (success) {
            console.log(data);
            notifyMessage("success", "Orgainization saved!");
            closeForm();
          }
        })
        .catch((exception) => {
          const { data } = exception.response;
          const { errors } = data;
          if (errors && errors.length > 0) {
            notifyMessage("error", errors[0]);
          }
        });
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      <Drawer
        title="Create a new Organization"
        width={720}
        onClose={closeForm}
        visible={visibleForm}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item name={["name"]} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={["code"]} label="Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={["email"]}
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["contact"]}
            label="Contact"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name={["address", "address_line_one"]}
            label="Address Line One"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["address", "address_line_two"]}
            label="Address Line Two"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["address", "landmark"]}
            label="Landmark"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["address", "zipcode"]}
            label="Zip code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["address", "city"]}
            label="City"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["address", "state"]}
            label="State"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["address", "country"]}
            label="Country"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default OrganizationForm;
