import { z } from "zod";
import { Classification } from "../../../services/classification";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TextProcessor } from "../../../services/textProcessor";

export const textRouter = createTRPCRouter({
  categorizor: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .query(async ({ input }) => {
      const service = new Classification(input.text, TextProcessor);
      const result = await service.process();
      return result;
    }),
});
