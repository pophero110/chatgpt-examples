import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const textRouter = createTRPCRouter({
  categorizor: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return "test" + input.text;
    }),
});
