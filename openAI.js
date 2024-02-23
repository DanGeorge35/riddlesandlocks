const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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",
});

async function generateOpenAIResponse(word) {
  let ask = "Give me a riddle that has the answer of : " + word;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: ask }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
}

// Example usage

module.exports = { generateOpenAIResponse };
