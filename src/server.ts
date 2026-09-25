import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import produtoRoutes from "./routes/ProductsRoute";
import "dotenv/config";
import UsuarioRoute from "./routes/UsuarioRoute";
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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Servidor rodando");   
});
 
