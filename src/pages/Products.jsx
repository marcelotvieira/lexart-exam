import { Card, Empty, Form, Input, List, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../Components/MainLayout";
import { ProductItem } from "../Components/ProductItem";
import { getProducts } from "../actions";

export default function Products() {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState()
  const navigate = useNavigate()
  const [form] = useForm()


  const nome = searchParams.get('nome')
  const marca = searchParams.get('marca')

  const handleSubmit = (values) => {
    const nome = values.nome ?? '';
    const marca = values.marca ?? '';
    const qString = new URLSearchParams({ marca, nome }).toString()
    console.log(qString)
    return navigate(`?${qString}`, { replace: true })
  }


  useEffect(() => {
    setProducts(null)
    const getData = async () => {
      const params = {
        nome: nome || '',
        marca: marca || '',
      }
      const products = await getProducts(params);
      if (!products.ok) return //TODO
      const data = await products.json()
      setProducts(data.products);
      setBrands(data.brands)
    }
    getData()
  }, [nome, marca])


  return (
    <MainLayout>
      <div className="flex gap1 wrappable">
        <Card size="small" style={{ flex: 1, minWidth: 280 }} loading={!brands}>
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item id="nome" name="nome" label="Pesquisa">
              <Input.Search onSearch={() => form.submit()} enterButton name="nome" type="text" />
            </Form.Item>
            <Form.Item
              name="marca"
              label="Filtrar por marca"
            >
              <Select
                defaultValue=""
                onChange={() => form.submit()}
                placeholder="Selecione a marca."
                loading={!brands}
                options={brands && [
                  {
                    label: 'Todas',
                    value: '',
                  },
                  ...brands.map((b) => ({
                    label: b,
                    value: b
                  }))]} />
            </Form.Item>

          </Form>
        </Card>

        <Card title="Produtos" size="small" style={{ flex: 3, minWidth: 280 }} loading={!products}>
          <List
            bordered
            pagination
            style={{ maxHeight: '90vh', overflowY: 'scroll' }}
          >
            {products && products.length > 0 ? products.map((p) => (
              <List.Item style={{ borderBottom: '.5rem solid rgb(var(--callout-soft-rgb))' }}>
                <ProductItem product={p} />
              </List.Item>

            )) :
              <Empty description="Sem resultados" />
            }
          </List>
        </Card>
      </div>
    </MainLayout>

  )
}