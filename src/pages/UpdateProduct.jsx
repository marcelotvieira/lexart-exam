import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import MainLayout from "../Components/MainLayout";
import { getProductDetails, updateProduct } from "../actions";

export default function UpdateProduct() {
  const { id: productId } = useParams()
  const [loading, setLoading] = useState(false);
  const [api, holder] = useNotification();
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const productData = await getProductDetails(productId);
        const data = await productData.json()
        form.setFieldsValue(data);
        form.setFieldValue('data', data.Data.map((d) => ({ price: d.price, color: d.color })))
      } catch (error) {
        console.error('Erro ao obter produto:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [productId, form]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await updateProduct(productId, values);
      form.resetFields();
      api.success({ description: 'Produto atualizado' });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      api.error({ description: 'Erro ao atualizar produto' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {holder}
      <div className="">
        <Card title="Atualizar Produto" style={{ width: 'fit-content' }}>
          <Form
            loading={loading}
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
                <Form.List name="data" >
                  {(fields, { add, remove }) => (
                    <>
                      <p style={{ marginBottom: '.5rem' }}>* Variações</p>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className="flex aligned-center gap05">
                          <Form.Item
                            {...restField}
                            name={[name, 'price']}
                            rules={[{ required: true, message: 'Informe o preço' }]}
                          >
                            <Input placeholder="Preço" type="number" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'color']}
                            rules={[{ required: true, message: 'Informe a cor' }]}
                          >
                            <Input placeholder="Cor" />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              disabled={index === 0}
                              icon={<MinusCircleOutlined />}
                              type="text"
                              onClick={() => remove(name)}
                            />
                          </Form.Item>
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          type="link"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Adicionar Variação
                        </Button>

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
