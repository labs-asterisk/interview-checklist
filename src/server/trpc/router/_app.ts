import { router } from "../trpc";
// import { authRouter } from "./auth";
// import { exampleRouter } from "./example";

import { attemptRouter } from "./attempt";
import { viewRouter } from "./view";

export const appRouter = router({
  // example: exampleRouter,
  // auth: authRouter,
  attempt: attemptRouter,
  view: viewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
