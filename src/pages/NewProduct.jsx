

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { useState } from 'react';
import MainLayout from "../Components/MainLayout";
import { createProduct } from "../actions";

export default function NewProduct() {
  const [loading, setLoading] = useState(false)
  const [api, holder] = useNotification()
  const [form] = Form.useForm();

  const handleFormSubmit = async (values) => {
    setLoading(true)
    const newProduct = await createProduct(values)
    const data = await newProduct.json()
    setLoading(false)
    readResult(newProduct, data)
  };

  const readResult = (res, data) => {
    if (!res.ok) return api.error({ description: data.details })
    form.resetFields()
    api.success({ description: 'Produto cadastrado' })
  }

  return (
    <MainLayout>
      {holder}
      <div className="">
        <Card title="Novo Produto" style={{ width: 'fit-content' }}>
          <Form
            disabled={loading}
            layout="vertical"
            form={form}
            onFinish={handleFormSubmit}
          >
            <div className="flex wrappable gap2">
              <div style={{ flex: 1, minWidth: 240 }}>
                <Form.Item
                  label="Nome"
                  name="name"
                  rules={[{ required: true, message: 'Informe o Nome!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Marca"
                  name="brand"
                  rules={[{ required: true, message: 'Informe a Marca!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Modelo"
                  name="model"
                  rules={[{ required: true, message: 'Informe o Modelo!' }]}
                >
                  <Input />
                </Form.Item>

                <Button
                  type="primary"
                  loading={loading}
                  htmlType="submit"
                >
                  Salvar
                </Button>
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>


                <Form.List
                  initialValue={[{}]}
                  label="Variações"
                  name="Data"
                  rules={[
                    {
                      validator: async (_, Data) => {
                        if (!Data || Data.length < 1) {
                          return Promise.reject(new Error('Deve incluir pelo menos 1'));
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      <p style={{ marginBottom: '.5rem' }}>* Variações</p>

                      {fields.map(({ key, name, ...restField }, i) => (
                        <div className="flex aligned-center gap05">
                          <Form.Item
                            {...restField}
                            name={[name, 'price']}
                            rules={[{ required: true, message: 'Informe o preço' }]}
                          >
                            <Input placeholder="Preço" />
                          </Form.Item >
                          <Form.Item
                            {...restField}
                            name={[name, 'color']}
                            rules={[{ required: true, message: 'Informe a cor' }]}
                          >
                            <Input placeholder="Cor" />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              disabled={i === 0}
                              icon={<MinusCircleOutlined />}
                              type="text"
                              onClick={() => remove(name)}
                            >
                            </Button>
                          </Form.Item>
                        </div>
                      ))}

                      <Form.Item>
                        <Button
                          type="link"
                          onClick={() => add('', 0)}
                          icon={<PlusOutlined />}
                        >
                          Adicionar Variação
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>

              </div>
            </div>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
}

