import { Drawer, Form, Input, Button, Select } from "antd";

import { notifyMessage } from "../../utilities/NotifyMessages";
import { createOrganization, updateOrganization } from "./Api/organizationApis";

const { Option } = Select;

const OrganizationForm = ({
  visibleForm,
  closeForm,
  organization,
  getOrganizations,
}) => {
  const [form] = Form.useForm();
  let drawerText = "Create a new Organization";
  const onReset = () => {
    form.resetFields();
    closeForm();
  };

  if (organization) {
    drawerText = "Update a new Organization";
    form.setFieldsValue({ ...organization });
  } else {
    form.resetFields();
  }

  const onFinish = async (formObject) => {
    if (organization) {
      try {
        const { data } = await updateOrganization(organization.id, formObject);
        const { success } = data;
        if (success) {
          console.log(data);
          notifyMessage("success", "Orgainization updated!");
          closeForm();
          getOrganizations();
        }
      } catch (exception) {
        const { data } = exception.response;
        const { errors } = data;
        if (errors && errors.length > 0) {
          notifyMessage("error", errors[0]);
        }
      }
    } else {
      try {
        const { data } = await createOrganization(formObject);
        const { success } = data;
        if (success) {
          console.log(data);
          notifyMessage("success", "Orgainization saved!");
          closeForm();
        }
      } catch (exception) {
        const { data } = exception.response;
        const { errors } = data;
        if (errors && errors.length > 0) {
          notifyMessage("error", errors[0]);
        }
      }
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
        title={drawerText}
        width={520}
        onClose={closeForm}
        visible={visibleForm}
        bodyStyle={{ paddingBottom: 30 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default OrganizationForm;
