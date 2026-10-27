import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import produtoRoutes from "./routes/ProductsRoute";
import "dotenv/config";
import UsuarioRoute from "./routes/UsuarioRoute";
import { initializeProducts } from "./database/initializeProducts";
const app = express();
const PORT = process.env.PORTA ?? 3000;


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use("/", authRoutes);
app.use("/login", authRoutes);
app.use("/produto", produtoRoutes);
app.use("/salvar", UsuarioRoute);

app.get("/", (req, res) => {
  res.send("Servidor rodando");   
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

initializeProducts().catch((erro) => {
  console.error("N\u00e3o foi poss\u00edvel inicializar os produtos:", erro);
});
 
