import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

import _ from "lodash";

import data from "../../../data/problem_data.json"

import { AttemptingState } from "../../../types/problem-data";

export const viewRouter = router({
  getSolvedSlugs: publicProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const userId = input.userId || ctx.session?.user?.id;

      return await ctx.prisma.userProblem.findMany({
        where: {
          NOT: { attemptingState: "Untouched" as AttemptingState },
          userId,
        },
      });
    }),
  getProgress: protectedProcedure
    .input(z.object({ companyName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { companyName } = input;
      const { id: userId } = ctx.session.user;

      console.log({ data });

      // const allProbsCount = (
      //   await data.sections.filter((o: any) => o.sectionName === companyName)
      // ).length;

      // const allProbsCount = await data.sections.reduce(async (acc, v) => {
      //   if (v.sectionName !== companyName) {
      //     return acc;
      //   }

      //   return acc.concat
      // })

      // const allProbsCount = [
      //   ...data.sections.map((o) => o.sectionName === companyName),
      // ].length;

      const solvingProbsCount = await ctx.prisma.userProblem.count({
        where: {
          userId,
          OR: [
            { attemptingState: "Attempting" },
            { attemptingState: "Unimplemented" },
          ],
        },
      });

      const solvedProbsCount = await ctx.prisma.userProblem.count({
        where: {
          userId,
          attemptingState: "Solved",
        },
      });

      const filteredProbs = _.filter(data.sections, {
        sectionName: companyName,
      });

      // @ts-ignore
      const allProbsCount = filteredProbs[0].problems.length;

      console.log({ allProbsCount, solvingProbsCount, solvedProbsCount });
      return { allProbsCount, solvingProbsCount, solvedProbsCount };
    }),
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
