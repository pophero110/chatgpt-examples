import { useState } from "react";

function PromptBox({
  loading,
  submitHandler,
}: {
  loading: boolean;
  submitHandler: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const onChangeHandler = (e: { target: any }) => {
    setValue(e.target.value);
  };
  return (
    <div className="flex">
      <input
        onChange={onChangeHandler}
        value={value}
        type="text"
        placeholder="Enter the words that you want categorize"
        className="block w-full rounded-l-md border border-slate-300 bg-white pl-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
      />
      <button
        // disabled={loading}
        onClick={() => {
          submitHandler(value);
        }}
        className="rounded-r-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
      >
        submit
      </button>
    </div>
  );
}

function OutputBox({ output }: { output: string }) {
  return (
    <textarea
      readOnly
      value={output}
      className="w-full rounded-md border border-slate-300 bg-white p-2 italic text-slate-400 shadow-sm sm:text-sm"
    ></textarea>
  );
}

export default function PromptBoxContainer({
  output,
  loading,
  submitHandler,
}: {
  output: string;
  loading: boolean;
  submitHandler: (text: string) => void;
}) {
  return (
    <div className="grid gap-2 rounded-md bg-slate-100 p-2">
      <h3 className="text-sm font-bold italic">Categorizor</h3>
      <PromptBox loading={loading} submitHandler={submitHandler}></PromptBox>
      <OutputBox output={output}></OutputBox>
    </div>
  );
}
