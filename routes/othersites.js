import { getJokes, createJoke } from "../controller/controller.js";
import express from "express";
const router = express.Router();

router.get("/api/othersites", async (request, response) => {
  try {
    response.sendFile("/othersites.html", { root: "../public/api" });
  } catch (e) {
    sendStatus(e, response);
  }
});

function sendStatus(e, response) {
  console.error("Exception: " + e);
  if (e.stack) console.error(e.stack);
  response.status(500).send(e);
}

export default router;
