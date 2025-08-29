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

module.exports = { zeroShot, oneShot, multiShot };
