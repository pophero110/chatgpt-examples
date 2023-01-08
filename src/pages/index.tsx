//@ts-nocheck
import { useState } from "react";
import { createTRPCProxyClient, httpLink } from "@trpc/client";
import PromptContainer from "../../components/PromptBoxContainer";
import type { AppRouter } from "../server/api/root";
import superjson from "superjson";
export default function Index() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const client = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpLink({
        url: "http://localhost:3000/api/trpc",
      }),
    ],
  });

  const submitHandler = async (e, text: string) => {
    e.preventDefault();
    setLoading(true);
    if (text.length === 0) {
      setLoading(false);
      setOutput("Can not submit empty text");
    } else {
      const result = await client.text.categorizor.query({ text });
      if (result) {
        setLoading(false);
        setOutput(result);
      }
    }
  };
  return (
    <div className="grid grid-cols-1 gap-2">
      <PromptContainer
        output={output}
        loading={loading}
        submitHandler={submitHandler}
        inputType="input"
        title="Categorizor"
      ></PromptContainer>
      <PromptContainer
        output={output}
        loading={loading}
        submitHandler={submitHandler}
        inputType="textarea"
        title="Summarizer"
      ></PromptContainer>
    </div>
  );
}
