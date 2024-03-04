import { Button } from "antd"
import { useAuth } from "./Components/AuthProvider"
import AuthWrapper from "./Components/ProtectedWrapper"

export default function App() {
  const { logout } = useAuth()
  return (
    <AuthWrapper>
      <div>
        <h1>Root</h1>
        <a href="/products">Produtos</a>
        <Button onClick={logout} type="primary">Sair</Button>
      </div>
    </AuthWrapper>
  )
}