import { Card, Form, Input } from "antd";
import MainLayout from "../Components/MainLayout";

export default function NewProduct() {
  return (
    <MainLayout>
      <Card>
        <Form>
          <Form.Item>
            <Input />
          </Form.Item>
        </Form>
      </Card>
    </MainLayout>
  )
}