import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
function PromptBox({
  loading,
  submitHandler,
  value,
  onChangeHandler,
  inputType,
}: {
  loading: boolean;
  submitHandler: (e: MouseEvent, text: string) => void;
  value: string;
  onChangeHandler: (e: ChangeEvent) => void;
  inputType: string;
}) {
  return (
    //TODO
    //Adjust max and min length
    <div className="flex">
      {false ? (
        <input
          maxLength={100}
          minLength={1}
          onChange={onChangeHandler}
          value={value}
          type="text"
          placeholder="Enter the words that you want to categorize"
          className="block w-full rounded-l-md border border-slate-300 bg-white pl-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        />
      ) : (
        <textarea
          rows={4}
          value={value}
          maxLength={200}
          onChange={onChangeHandler}
          placeholder="Enter the text that you want to summarize"
          className="w-full rounded-l-md border border-slate-300 bg-white pl-3 pt-1 italic text-slate-400 shadow-sm sm:text-sm"
        ></textarea>
      )}

      <button
        disabled={loading}
        onClick={(e) => {
          submitHandler(e, value);
        }}
        type="submit"
        className="rounded-r-md bg-blue-500 py-2 px-4 text-white hover:cursor-pointer hover:bg-blue-700 disabled:opacity-75"
      >
        submit
      </button>
    </div>
  );
}

function OutputBox({
  output,
  inputType,
}: {
  output: string;
  inputType: string;
}) {
  return (
    <textarea
      readOnly
      rows={6}
      value={output}
      placeholder={
        inputType === "input"
          ? "Apple: Technology,Facebook: Social Media,Fedex: Delivery Service"
          : ""
      }
      className="w-full rounded-md border border-slate-300 bg-white pl-3 pt-1 italic text-slate-400 shadow-sm sm:text-sm"
    ></textarea>
  );
}

export default function PromptBoxContainer({
  output,
  loading,
  submitHandler,
  inputType,
  title,
}: {
  output: string;
  loading: boolean;
  submitHandler: (e: MouseEvent, text: string) => void;
  inputType: string;
  title: string;
}) {
  const [value, setValue] = useState("");
  const onChangeHandler = (e: { target: any }) => {
    setValue(e.target.value);
  };
  return (
    <div className="grid gap-2 rounded-md bg-slate-100 p-2">
      <div className="flex justify-between">
        <h3 className="text-sm font-bold italic">{title}</h3>
        <div className="flex text-center align-middle text-sm italic">
          <div>characters: {100 - value.length}</div>
        </div>
      </div>
      <form className="grid gap-2">
        <PromptBox
          inputType={inputType}
          loading={loading}
          submitHandler={submitHandler}
          value={value}
          onChangeHandler={onChangeHandler}
        ></PromptBox>
        <OutputBox output={output} inputType={inputType}></OutputBox>
      </form>
    </div>
  );
}
