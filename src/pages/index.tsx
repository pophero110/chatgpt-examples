import { useState } from "react";
import { createTRPCProxyClient, httpLink, httpBatchLink } from "@trpc/client";
import PromptContainer from "../../components/PromptBoxContainer";
import type { AppRouter } from "../server/api/root";
import { api } from "../utils/api";
export default function Index() {
  const [output, setOutput] = useState("Food Delivery Platform: DoorDash");
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/api/trpc",
      }),
    ],
  });

  const submitHandler = async (text: string) => {
    console.log(text);
    setLoading(true);

    const result = await client.text.categorizor.query({
      json: {
        text: "123",
      },
    });
    console.log(result);
    //@ts-ignore
    setOutput(result.json);
  };
  return (
    <div className="grid grid-cols-1 gap-2">
      <PromptContainer
        output={output}
        loading={loading}
        submitHandler={submitHandler}
      ></PromptContainer>
      <PromptContainer
        output={output}
        loading={loading}
        submitHandler={submitHandler}
      ></PromptContainer>
      <PromptContainer
        output={output}
        loading={loading}
        submitHandler={submitHandler}
      ></PromptContainer>
      <PromptContainer
        output={output}
        loading={loading}
        submitHandler={submitHandler}
      ></PromptContainer>
    </div>
  );
}
