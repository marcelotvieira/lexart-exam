import { Card, Empty, Form, Input, List, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../Components/MainLayout";
import { ProductItem } from "../Components/ProductItem";
import { getProducts } from "../actions";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const navigate = useNavigate();
  const [form] = useForm();

  const nome = searchParams.get('nome') || '';
  const marca = searchParams.get('marca') || '';

  const handleSubmit = (values) => {
    const { nome, marca } = values;
    const qString = new URLSearchParams({ marca: marca || '', nome: nome || '' }).toString();
    return navigate(`?${qString}`, { replace: true });
  };

  useEffect(() => {
    setProducts(null);
    const getData = async () => {
      const params = { nome, marca, page: currentPage };
      const productsResponse = await getProducts(params);
      if (!productsResponse.ok) return;
      const { products, brands, total } = await productsResponse.json();
      setProducts(products);
      setBrands(brands);
      setTotalItems(total);
    };
    getData();
  }, [nome, marca, currentPage]);

  useEffect(() => {
    const pageParam = parseInt(searchParams.get('page'), 10) || 1;
    setCurrentPage(pageParam);
  }, [searchParams]);

  return (
    <MainLayout>
      <div className="flex gap1 wrappable">
        <Card size="small" style={{ flex: 1, minWidth: 280 }} loading={!brands}>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="nome" label="Pesquisa">
              <Input.Search onSearch={form.submit} enterButton name="nome" type="text" />
            </Form.Item>
            <Form.Item name="marca" label="Filtrar por marca">
              <Select
                defaultValue=""
                onChange={form.submit}
                placeholder="Selecione a marca."
                loading={!brands}
                options={[
                  { label: 'Todas', value: '' },
                  ...(brands ? brands.map(b => ({ label: b, value: b })) : [])
                ]}
              />
            </Form.Item>
          </Form>
        </Card>

        <Card title="Produtos" size="small" style={{ flex: 3, minWidth: 280 }} loading={!products}>
          <List
            size="small"
            pagination={{
              current: currentPage,
              pageSize: 6,
              total: totalItems,
              onChange: setCurrentPage,
              showSizeChanger: false,
            }}
            dataSource={products}
            renderItem={product => (
              <List.Item style={{ borderBottom: '1px solid lightgray' }}>
                <ProductItem product={product} />
              </List.Item>
            )}
            locale={{ emptyText: <Empty description="Sem resultados" /> }}
          />
        </Card>
      </div>
    </MainLayout>
  );
}
