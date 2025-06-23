import {
  AppstoreOutlined,
  CoffeeOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    label: <NavLink to="/">Home</NavLink>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Product-List",
    key: "List",
    icon: <AppstoreOutlined />,
    children: [
      {
        type: "group",
        label: "Menu",
        children: [
          { label: <NavLink to="/product">Product</NavLink>, key: "product" },
          {
            label: <NavLink to="/category">Category</NavLink>,
            key: "category",
          },
        ],
      },
    ],
  },
  {
    label: <NavLink to="/order">Order</NavLink>,
    key: "order",
    icon: <CoffeeOutlined />,
  },
];
const SlideMenuPage = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return <Menu onClick={onClick} mode="horizontal" items={items} />;
};
export default SlideMenuPage;
