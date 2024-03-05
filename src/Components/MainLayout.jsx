import { MenuOutlined } from "@ant-design/icons"
import { Button, Drawer, Layout } from "antd"
import Sider from "antd/es/layout/Sider"
import { Content, Header } from "antd/es/layout/layout"
import { useState } from "react"
import MainMenu from "./MainMenu"
import AuthWrapper from "./ProtectedWrapper"

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <AuthWrapper>
      <Drawer
        width={'fit-content'}
        placement="left"
        onClose={() => setOpen(false)}
        open={open}

      >
        <MainMenu />
      </Drawer>

      <Layout style={{ width: '100%', height: '100vh' }}>
        <Sider
          className="main-sider"
          width="fit-content"
          style={{ backgroundColor: 'rgb(var(--callout-rgb)' }}
        >
          <MainMenu />
        </Sider>

        <Layout>
          <Header
            className="main-header"
            style={{ width: '100%', backgroundColor: 'rgb(var(--callout-rgb)', padding: '0 1rem' }}
          > <Button type="text" onClick={() => setOpen(true)}>
              <MenuOutlined />
            </Button>
          </Header>
          <Content className="pd1">
            <div >{children}</div>
          </Content>
        </Layout>
      </Layout>
    </AuthWrapper>
  )
}