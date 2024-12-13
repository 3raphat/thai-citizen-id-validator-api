import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import { validateThaiCitizenId } from "./utils";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Thai Citizen ID Validator API",
          description:
            "A lightweight, fast API for validating Thai citizen ID numbers.",
          version: "1.0.0",
        },
      },
    })
  )
  .get("/validate", ({ query: { id } }) => validateThaiCitizenId(id), {
    query: t.Object({
      id: t.String(),
    }),
  })
  .get("/validate/:id", ({ params: { id } }) => validateThaiCitizenId(id), {
    params: t.Object({
      id: t.String(),
    }),
  })
  .post("/validate", ({ body: { id } }) => validateThaiCitizenId(id), {
    body: t.Object({
      id: t.String(),
    }),
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
