import { LogoutOutlined, ProductOutlined } from "@ant-design/icons";
import { Image, Menu } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function MainMenu() {
  const { logout } = useAuth()
  const items = [
    {
      label: "Produtos",
      key: "products",
      icon: <ProductOutlined />,
      children: [
        {
          label: <Link to="/Products/new">Novo</Link>,
          key: "newProduct",
        },
        {
          label: <Link to="/">Listar</Link>,
          key: "products-child",
        },
      ]
    },
    {
      label: <p onClick={logout}>Sair</p>,
      key: "home",
      icon: <LogoutOutlined />,
    },
  ]

  return (
    <div className="flex columned gap2 aligned-center pd1">
      <Image
        preview={false}
        width={100}
        height={100}
        src="/assets/images/fallImage.png"
      />
      <Menu
        mode="inline"
        onClick={() => { }}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        items={items}
      />
    </div>
  )
}