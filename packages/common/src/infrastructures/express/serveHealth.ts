import { Application, Request, Response } from "express";

export default (app: Application) => {
  app.get("/health", async (_: Request, res: Response) => {
    res.status(200).json({
      status: "GOOD",
    });
  });
};
