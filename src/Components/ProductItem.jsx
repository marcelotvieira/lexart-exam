import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Badge, Button, Collapse, Descriptions, Popconfirm, Table } from "antd";
import { deleteProduct } from "../actions";

export function ProductItem({ product }) {
  const handleDelete = async () => {
    await deleteProduct(product.id)
    window.location.reload()
  }

  return (
    <Descriptions layout="vertical">
      <Descriptions.Item label="Nome">{product.name}</Descriptions.Item>
      <Descriptions.Item label="Marca">{product.brand}</Descriptions.Item>
      <Descriptions.Item label="Modelo">{product.model}</Descriptions.Item>
      <Descriptions.Item label="Gerenciar">
        <div className="flex wrappable aligned-center gap05">
          <Button href={`/products/update/${product.id}`} icon={<EditFilled />} />
          <Popconfirm
            onConfirm={handleDelete}
            description="Excluir o item e suas variações?"
            okText="Excluir"
            cancelText="Cancelar"
          >

            <Button icon={<DeleteFilled />} />
          </Popconfirm>
        </div>
      </Descriptions.Item>

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