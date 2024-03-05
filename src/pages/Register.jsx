import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Components/AuthProvider";
import FlexCardWithLogo from "../Components/FlexCardWithLogo";
import { register } from "../actions";

export default function Register() {
  const { isLoggedIn, messageApi } = useAuth()
  const location = useLocation()


  const [loading, setLoading] = useState(false)
  const [form] = useForm()

  const readResult = (res, data) => {
    console.log(data)
    if (!res.ok) return messageApi.open({
      type: 'error',
      content: data.details,
    })
    messageApi.open({
      type: 'success',
      content: 'Cadastro realizado com sucesso!'
    })
    form.resetFields()
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    const res = await register(values)
    const jsonData = await res.json()
    setLoading(false)
    readResult(res, jsonData)
  }

  if (isLoggedIn)
    return <Navigate
      to="/"
      state={{ fsrom: location }}
      replace
    />

  return (
    <FlexCardWithLogo
      extraLink={
        <p style={{ textAlign: 'center' }}>
          Já possui conta? <Link to="/Signin">Login</Link>
        </p>
      }
    >
      <Form
        form={form}
        style={{ width: 300 }}
        onFinish={handleSubmit}
        layout="vertical"
      >

        {[
          { name: 'nome', placeholder: 'Nome', type: 'text' },
          { name: 'email', placeholder: 'Email', type: 'email' },
          { name: 'senha', placeholder: 'Senha', type: 'password' }
        ].map((field) => (
          <Form.Item
            rules={[
              {
                required: true,
                message: `Informe o(a) ${field.placeholder}`
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
          loading={loading}
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