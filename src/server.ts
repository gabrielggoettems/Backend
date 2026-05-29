import express from "express";
import { usuario } from "./data/Mock";

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`deu bom familia http://localhost:${PORT}`);
});

app.get("/listarUsuarios/:codigo", (req, res) => {
  const codigo = req.params.codigo;

  for (const user of usuario)  {
    if (user.codigo === Number(codigo)) {
      return res.status(200).json(user);
    }
  }
  return res.status(404).json({ message: "Usuario não encontrado" });
});