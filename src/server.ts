import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import produtoRoutes from "./routes/ProductsRoute";
import "dotenv/config";
const app = express();
const PORT = process.env.PORTA ?? 3000;


app.use(cors({
  origin: "localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use("/login", authRoutes);
app.use("/produto", produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Servidor rodando");   
});
 
