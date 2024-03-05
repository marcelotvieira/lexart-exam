import { Button, Form, Input } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Components/AuthProvider";
import FlexCardWithLogo from "../Components/FlexCardWithLogo";

export default function Signin() {
  const { isLoggedIn, login, authLoading, setAuthLoading } = useAuth()
  const location = useLocation()

  const handleSubmit = async (values) => {
    setAuthLoading(true)
    await login(values)
  }

  if (isLoggedIn)
    return <Navigate to="/" state={{ from: location }} replace />

  return (
    <FlexCardWithLogo
      extraLink={
        <p style={{ textAlign: 'center' }}>
          Não tem conta? <Link to="/Register">Cadastro</Link>
        </p>
      }>
      <Form
        style={{ width: 300 }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        {[
          { name: 'email', placeholder: 'Email', type: 'email' },
          { name: 'senha', placeholder: 'Senha', type: 'password' }
        ].map((field) => (
          <Form.Item
            rules={[
              {
                required: true,
                message: `Informe o(a) ${field.placeholder}`,
              },
            ]}
            key={field.name} name={field.name}>
            <Input
              size="large"
              placeholder={field.placeholder}
              name={field.name}
              type={field.type}
            />
          </Form.Item>
        ))}

        <Button
          loading={authLoading}
          style={{ width: '100%' }}
          size="large"
          type="primary"
          htmlType="submit"
        >
          Entrar
        </Button>
      </Form>
    </FlexCardWithLogo>
  )
}