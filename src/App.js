import { BarsOutlined, PlusCircleFilled } from "@ant-design/icons"
import { Button } from "antd"
import MainLayout from "./Components/MainLayout"

export default function App() {

  return (
    <MainLayout>
      <div className="flex wrappable gap1 justified-center aligned-center">
        {[
          {
            label: "Produtos",
            href: "/Products",
            icon: <BarsOutlined />
          },
          {
            label: "Novo Produto",
            href: "/Products/new",
            icon: <PlusCircleFilled />
          },
        ].map((i, index) => (
          <Button
            key={index}
            type="default"
            className="pd3"
            href={i.href}
            icon={i.icon}
            style={{ flex: 1, height: 'fit-content' }}
          > {i.label}
          </Button>
        ))}
      </div>
    </MainLayout>
  )
}