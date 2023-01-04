import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const viewRouter = router({
  getSharingLink: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    const { NEXTAUTH_URL: nextAuthUrl } = process.env;
    const url = nextAuthUrl?.endsWith("/")
      ? nextAuthUrl.slice(0, -1)
      : nextAuthUrl;

    return `${url}/view/${userId}`;
  }),
  getGrid: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log({ input });
      const { userId } = input;

      try {
        const user = await ctx.prisma.user.findFirst({
          where: { id: userId },
        });

        console.log("found user: ", { user });

        if (user === null) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "This user does not exist.",
          });
        }

        const userProbs = await ctx.prisma.userProblem.findMany({
          where: { userId },
        });

        return { user, userProbs };
      } catch (e) {
        // throw new TRPCError({
        //   code: "INTERNAL_SERVER_ERROR",
        //   message: "An unknown error occured.",
        //   cause: e,
        // });

        console.error("error", e);
      }
    }),
});
