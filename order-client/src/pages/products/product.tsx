import type { ColumnsType } from "antd/es/table";
import {notification } from "antd";
import { Space, Table } from "antd";
import "../../styles/product.css";
import { useEffect, useState } from "react";
const ProductPage = () => {
  interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    status: number;
    category_id: number;
  }
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    getData();
  },[])
  const getData = async () => {
    const res = await fetch("https://ordercoffeebe.onrender.com/api/products", {
      method: "GET",
    });
    const d = await res.json();
    if (!d.data) {
      notification.error({
        message: JSON.stringify(d.message),
      });
    }
    setListProduct(d.data);
  };
  const columns: ColumnsType<IProduct> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (value, record) => (
        <div className="product-container">
          <img
            src={`https://ordercoffeebe.onrender.com/images/${record.image}`}
            alt=""
          />
          <div className="name-product">{record.name}</div>
          <div className="name-category">{record.category_id}</div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <span>{status === 1 ? "Active" : "Inactive"}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (value, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return <Table<IProduct> columns={columns} dataSource={listProduct} />;
};
export default ProductPage;
