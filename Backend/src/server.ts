import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import produtoRoutes from "./routes/ProdutoRoute";
import ComparadorRoute from "./routes/ComparadorRoute";
import { produtos } from "./data/ProdutoMock";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use("/api", produtoRoutes);
app.use("/api", ComparadorRoute);
app.get("/api/produtos", (req, res) => {
  res.json(produtos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});