import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`deu bom familia http://localhost:${PORT}`);
});

app.get("efetuarLogin", (req, res) => {
  res.send("Rota de login funcionando!");
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});

