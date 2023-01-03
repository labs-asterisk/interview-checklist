import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const attemptRouter = router({
  attemptProblem: protectedProcedure
    .input(z.object({ slug: z.string(), newAttemptingState: z.string() }))
    .mutation(({ ctx, input }) => {
      console.log({ input, user: ctx.session.user });
      // console.log({ ctxUser: ctx.session.user });
      // console.log({ user: ctx.?session.?user });

      return {
        test: "hello",
      };

      // return {
      //   greeting: `Hello ${input?.text ?? "world"}`,
      // };
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});
