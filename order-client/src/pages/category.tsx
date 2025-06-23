import { Button, Input, Modal } from "antd";
import { Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../styles/category.css";
import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
const { Title } = Typography;
interface ICategory {
  id: number;
  name: string;
}
const CategoryPage = () => {
  const [listCate, setListCate] = useState([]);
  const [name, setname] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setname("");
    setIsModalOpen(true);
  };
  useEffect(() => {
    console.log("check effect: ");
    getData();
  }, []);
  const getData = async () => {
    const res = await fetch("http://localhost:8080/api/category", {
    });
    const data = await res.json();
    setListCate(data.data);
  };
  const handleOk =  async () => {
    const data = {
      name
    };
    const res = await fetch("http://localhost:8080/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    const d = await res.json();
    if(d.data) {
      getData();
    } else {
      //
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns: ColumnsType<ICategory> = [
    {
      title: "Id",
      dataIndex: "id",
      render: (value, record) => {
        console.log();
        return <a>{record.id}</a>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <>
            <a>Edit</a>
            <a>Delete</a>
          </>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="container">
        <div className="header">
          <Title>Product Category</Title>
          <Title level={5} className="breadcrumb">
            Home / <span>Products</span> /{" "}
            <span className="current">Categories</span>
          </Title>
        </div>
        <div className="search-section">
          <div className="search-container">
            <Input
              size="large"
              placeholder="Search..."
              className="search-container"
              prefix={<SearchOutlined />}
            />
          </div>
          <Button className="add-button" onClick={showModal}>
            Add New Category
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={listCate} rowKey={"id"} />
      <Modal
        title="Create Category"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Input
            placeholder="Input Name Category"
            value={name}
            onChange={(event) => setname(event.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};
export default CategoryPage;
