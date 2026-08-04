import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/public/login/Login";
import Cadastro from "./pages/public/register/Cadastro";
import Home from "./pages/public/Home/Home";
import MainLayout from "./layout/mainLayout";
import Loja from "./loja/Loja";
import Comparacao from "./pages/sideBarAbas/Comparacao";
import Carrinho from "./pages/sideBarAbas/Carrinho";
import ProdutosLoja from "./pages/public/ProdutosLoja/ProdutosLoja";
import FazerCadastroDeProduto from "./pages/public/saveproducts/SaveProducts";
import Seguranca from "./component/menu/Segurança";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<MainLayout />}>
        <Route path="/loja" element={<Loja />} />
        <Route path="/comparacao" element={<Comparacao />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/produtos" element={<ProdutosLoja />} />
        <Route path="/saveProdutos" element={<FazerCadastroDeProduto />} />
      </Route>

      <Route path="/" element={<Login />} />

      <Route
        path="/produtos"
        element={
          <Seguranca>
            <Cadastro />
          </Seguranca>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
