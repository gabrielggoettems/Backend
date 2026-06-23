import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import produtoRoutes from "./routes/ProdutoRoute";
import ComparadorRoute from "./routes/ComparadorRoute";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use("/api", produtoRoutes);
app.use("/api", ComparadorRoute);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});