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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<MainLayout />}>
        <Route path="/loja" element={<Loja />} />
        <Route path="/comparacao" element={<Comparacao />} />
        <Route path="/carrinho" element={<Carrinho />} />
         <Route path="/produtos" element={<ProdutosLoja />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
