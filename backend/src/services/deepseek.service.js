const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const zeroShot = async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "What is the meaning of life?",
        },
      ],
      model: "deepseek/deepseek-r1:free",
    });

    return res.status(200).send({ message: completion.choices[0].message });
  } catch (error) {
    console.error("Error in zero shot", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};
const multiShot = async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
          Example 1:
Q: Write a Python function to add two numbers.
A:
def add(a, b):
    return a + b

Example 2:
Q: Write a Python function to check if a number is even.
A:
def is_even(n):
    return n % 2 == 0

Now your turn:
Q: Write a Python function to find the factorial of a number.
A:

          `,
        },
      ],
      model: "deepseek/deepseek-r1:free",
    });

    return res.status(200).send({ message: completion.choices[0].message });
  } catch (error) {
    console.error("Error in multi shot", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};
const oneShot = async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
          Example:  
Text: 'I love this movie!'  
Sentiment: Positive  

Now classify this text:  
Text: "This food tastes terrible."  
Sentiment:

          `,
        },
      ],
      model: "deepseek/deepseek-r1:free",
    });

    return res.status(200).send({ message: completion.choices[0].message });
  } catch (error) {
    console.error("Error in one shot", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};
const dynamicPrompt = async (req, res) => {
  try {
    const user_name = "Nidhish";
    const city = "Delhi";

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Write a welcome message for ${user_name} who just signed up from ${city}.`,
        },
      ],
      model: "deepseek/deepseek-r1:free",
    });

    return res.status(200).send({ message: completion.choices[0].message });
  } catch (error) {
    console.error("Error in  dynamic prompt", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};
const COTPrompt = async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Q: If there are 12 apples and you eat 4, how many are left? 
Explain your reasoning step by step.
`,
        },
      ],
      model: "deepseek/deepseek-r1:free",
    });

    return res.status(200).send({ message: completion.choices[0].message });
  } catch (error) {
    console.error("Error in  COT prompt", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};
const SystemUserPrompt = async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful travel assistant that always responds politely and gives concise answers.",
        },
        {
          role: "user",
          content: "Find me the cheapest flight from Delhi to Mumbai tomorrow.",
        },
      ],
      model: "deepseek/deepseek-r1:free",
    });

    return res.status(200).send({ message: completion.choices[0].message });
  } catch (error) {
    console.error("Error in  System and User prompt", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};
const StopSequence = async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "List 3 fruits each seperate with a , in a csv format",
        },
      ],
      model: "deepseek/deepseek-r1:free",
      stop: [","],
    });

    return res.status(200).send({ message: completion.choices[0].message });
  } catch (error) {
    console.error("Error in  Stop sequence", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  zeroShot,
  oneShot,
  multiShot,
  dynamicPrompt,
  COTPrompt,
  SystemUserPrompt,
  StopSequence,
};
