import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { attemptRouter } from "./attempt";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  attempt: attemptRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
