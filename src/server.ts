import express from "express";

const app = express();
const PORT = 6767;

app.listen(PORT, () => {
  console.log(`Servidor ta funcionando e ta rodando em http://localhost:${PORT}`);
});


app.get("/efetuarLogin", (req, res) => {
  res.send( "Vai tomando pae" );
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});
