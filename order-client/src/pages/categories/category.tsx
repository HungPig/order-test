import { Button, Input } from "antd";
import { Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../../styles/category.css";
import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import Createcategory from "./Createcategory";
import UpdateCategory from "./UpdateCategory";
const { Title } = Typography;
interface ICategory {
  id: number;
  name: string;
}
const CategoryPage = () => {
  const [listCate, setListCate] = useState([]);
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
  const showModal = () => {
    setisCreateModalOpen(true);
  };
  useEffect(() => {
    console.log("check effect: ");
    getData();
  }, []);
  const getData = async () => {
    const res = await fetch("https://ordercoffeebe.onrender.com/api/category", {
    });
    const data = await res.json();
    setListCate(data.data);
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
      render: (value, record) => {
        return (
          <Space size="middle">
            <>
              <a>Edit</a>
              <a onClick={() => {
                console.log("check button", record);
                setisUpdateModalOpen(true);
              }}>Delete</a>
            </>
          </Space>
        );
      }
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
      <Createcategory
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setisCreateModalOpen={setisCreateModalOpen}
      />
      <UpdateCategory
        getData={getData}
        isCreateModalOpen={isUpdateModalOpen}
        setisCreateModalOpen={setisUpdateModalOpen}
      />
    </>
  );
};
export default CategoryPage;
