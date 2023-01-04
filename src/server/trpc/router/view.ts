import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const viewRouter = router({
  getGrid: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log({ input });
      const { userId } = input;

      const userProbs = await ctx.prisma.userProblem.findMany({
        where: { userId },
      });

      return userProbs;
    }),
});
