import { Request, Response } from "express";
import { ComparadorService } from "../services/ComparadorService";

const comparadorService = new ComparadorService();

export class ComparadorController {
  comparar(req: Request, res: Response) {
    try {
      const { produtoA, produtoB } = req.query;

      if (!produtoA || !produtoB) {
        return res.status(400).json({
          erro: "Informe produtoA e produtoB.",
        });
      }

      const resultado = comparadorService.comparar(
        String(produtoA),
        String(produtoB)
      );

      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json({
        erro:
          error instanceof Error
            ? error.message
            : "Erro ao comparar produtos.",
      });
    }
  }
}