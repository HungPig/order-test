import { Input, Modal, notification,Form } from "antd";
import { useState } from "react";
interface IProps {
  getData: any;
  isCreateModalOpen: boolean;
  setisCreateModalOpen: (v: boolean) => void;
}
const CreateCategory = (props: IProps) => {
  const [name, setname] = useState("");
  const { getData, isCreateModalOpen, setisCreateModalOpen } = props;
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const {
      name,
    } = values;
    const data = {name};
    const res = await fetch("https://ordercoffeebe.onrender.com/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    const d = await res.json();
    if (d.data) {
      getData();
      notification.success({
        message: JSON.stringify(d.message),
      });
    } else {
      notification.success({
        message: JSON.stringify(d.message),
      });
    }
    setisCreateModalOpen(false);
  };

  const handleCancel = () => {
    setname("");
    setisCreateModalOpen(false);
  };
  return (
    <Modal
      title="Create Category"
      closable={true}
      open={isCreateModalOpen}
      onOk={() => {
        form.submit();
      }}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="CategoryName"
          name="name"
          rules={[
            { required: true, message: "Please input your CategoryName!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateCategory;
