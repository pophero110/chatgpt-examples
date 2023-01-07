import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { textRouter } from "./routers/text";
/**
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  text: textRouter,
});
// export const appRouter = mergeRouters(textRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
