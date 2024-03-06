import { Badge, Collapse, Descriptions, Table } from "antd";

export function ProductItem({ product }) {
  return (
    <Descriptions>
      <Descriptions.Item label="Nome">{product.name}</Descriptions.Item>
      <Descriptions.Item label="Marca">{product.brand}</Descriptions.Item>
      <Descriptions.Item label="Modelo">{product.model}</Descriptions.Item>

      <div>
        <Descriptions.Item >
          <Collapse
            size="small"
            style={{ width: '100%' }}
            items={[{
              key: '1', label: <b>Variações</b>, children: (
                <Table
                  locale={{
                    emptyText: "Sem Variações"
                  }}
                  pagination={false}
                  size="small"
                  bordered
                  dataSource={product.Data.map((d) => ({
                    ...d,
                    price: Number(d.price).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  }))}
                  columns={[
                    {
                      title: 'Cor',
                      dataIndex: 'color',
                      render: (text) => <div className="flex gap05 aligendc-center">
                        {text} <Badge color={text} />
                      </div>,
                    },
                    {
                      title: 'Preço',
                      dataIndex: 'price',
                    },
                  ]} />
              )
            }]}
          />


        </Descriptions.Item>
      </div>
    </Descriptions>
  )
}