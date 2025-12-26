import { Router, Request, Response } from "express";
import { tokens } from "../data/tokens";
import { TokenCategory } from "../types/token";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const category = req.query.category as TokenCategory | undefined;

  let result = tokens;

  if (category) {
    result = tokens.filter((t) => t.category === category);
  }

  res.json(result);
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const token = tokens.find((t) => t.id === id);

  if (!token) {
    return res.status(404).json({ message: "Token not found" });
  }

  res.json(token);
});

export default router;
