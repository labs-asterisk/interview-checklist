import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

import { type AttemptingState } from "../../../types/problem-data";

export const attemptRouter = router({
  getProblemAttemptingStates: protectedProcedure.query(async ({ ctx }) => {
    const userDirtyProblems = await ctx.prisma.userProblem.findMany({
      where: { userId: ctx.session.user.id },
    });

    console.log({
      user: ctx.session.user,
      dirtyProblemCount: userDirtyProblems.length,
    });

    return userDirtyProblems;
  }),
  attemptProblem: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
        newAttemptingState: z.enum([
          "Untouched",
          "Attempting",
          "Unimplemented",
          "Solved",
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log({ input, user: ctx.session.user });

      const { slug: problemSlug, newAttemptingState } = input;
      const { id: userId } = ctx.session.user;

      try {
        const userProblems = await ctx.prisma.userProblem.findMany({
          where: { userId, problemSlug },
        });

        console.log("init", { userProblems });

        if (userProblems.length !== 0) {
          console.log(
            "updated AS: ",
            await ctx.prisma.userProblem.update({
              where: { id: userProblems[0]?.id },
              data: { attemptingState: newAttemptingState as AttemptingState },
            })
          );
        } else {
          console.log(
            "created AS: ",
            await ctx.prisma.userProblem.create({
              data: {
                userId,
                problemSlug,
                attemptingState: newAttemptingState,
              },
            })
          );
        }

        return {
          status: "success",
        };
      } catch (e) {
        console.error(e);

        return {
          status: "error",
        };
      }
    }),
});
