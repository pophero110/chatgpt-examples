jest.mock("../src/server/openaiClient");
import { Classification } from "../src/services/classification";
import { openaiClient } from "../src/server/openaiClient";

//playgroud
//https://beta.openai.com/playground/p/default-classification?model=text-davinci-003

const createCompletion = jest.fn(() => {
  return {
    status: 200,
    data: {
      choices: [
        {
          text: "",
        },
      ],
    },
  };
});
const setCreateCompletion = (text: string) => {
  createCompletion.mockImplementation(() => {
    return {
      status: 200,
      data: {
        choices: [
          {
            text,
          },
        ],
      },
    };
  });
};

//@ts-ignore
openaiClient.createCompletion = createCompletion;

test("with single word", async () => {
  setCreateCompletion("Logistics and Delivery Services");
  const service = new Classification("Fedex,");
  const result = await service.process();

  expect(result).toBe("Logistics and Delivery Services");
});

// Resonse Exmaple:
// Retail: Walmart
// Healthcare: Johnson & Johnson
// Financial Services: Goldman Sachs
// Telecommunications: Verizon
// Fast Food: McDonald's
// Financial Services: Visa
// Logistics: Fedex
test("with sequence of words", async () => {
  setCreateCompletion(
    "\nRetail: Walmart\nHealthcare: Johnson & Johnson\nFinancial Services: Goldman Sachs\nTelecommunications: Verizon\nFast Food: McDonald's\nFinancial Services: Visa\nLogistics: FedEx"
  );
  const service = new Classification(
    "Walmart,Johnson & Johnson,Goldman Sachs,Verizon,McDonald's,Visa,Fedex"
  );
  const result = await service.process();

  expect(result).toBe(
    "Retail: Walmart,Healthcare: Johnson & Johnson,Financial Services: Goldman Sachs,Telecommunications: Verizon,Fast Food: McDonald's,Financial Services: Visa,Logistics: FedEx"
  );
});

test("with invalid input", async () => {
  setCreateCompletion("");
  const service = new Classification("asdfzxv");
  const result = await service.process();

  expect(result).toBe("");
});
