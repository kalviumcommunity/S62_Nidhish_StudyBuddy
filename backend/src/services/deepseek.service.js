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

module.exports = { zeroShot };
