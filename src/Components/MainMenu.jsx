import { HomeFilled, StarFilled } from "@ant-design/icons";
import { Image, Menu } from "antd";
import { Link } from "react-router-dom";

const items = [
  {
    label: <Link to="/">Início</Link>,
    key: "home",
    icon: <HomeFilled />,
  },
  {
    label: "Produtos",
    key: "products",
    icon: <StarFilled />,
    children: [
      {
        label: <Link to="/Products/new">Novo</Link>,
        key: "newProduct",
      },
      {
        label: <Link to="/Products">Listar</Link>,
        key: "newProduct",
      },
    ]
  }
]

export default function MainMenu() {
  return (
    <div class="flex columned gap2 aligned-center pd1">
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
          borderRadius: '.5rem',
          border: '3px solid rgb(var(--callout-soft-rgb))',
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        items={items}
      />
    </div>
  )
}