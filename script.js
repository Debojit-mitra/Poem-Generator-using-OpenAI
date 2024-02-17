const OPENAI_API_KEY = "YOUR-OPEN-AI-KEY";

if (!OPENAI_API_KEY.startsWith("sk-")) {
  alert("Invalid OpenAI API key. Please provide a valid key in script.js");
}

const form = document.getElementById("form");
const prompt = document.getElementById("prompt");
const output = document.getElementById("output");

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_PARAMS = {
  temperature: 0.7,
  max_tokens: 100,
  frequency_penalty: 0.5,
  presence_penalty: 0.5,
  stop: ["\n\n"],
};

const generatePoem = async (prompt) => {
  const headers = new Headers({
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  });

  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You only generate poems using the user input.",
      },
      {
        role: "user",
        content: `Generate a poem from ${prompt}`,
      },
    ],
  });

  const options = {
    method: "POST",
    headers,
    body,
  };

  const response = await fetch(OPENAI_URL, options);
  const data = await response.json();

  return data.choices[0].message.content;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const promptValue = prompt.value;

  // Show loading icon
  const loading = document.getElementById("loading");
  loading.style.display = "block";

  output.textContent = "";

  const poem = await generatePoem(promptValue);

  // Hide loading icon
  loading.style.display = "none";

  output.textContent = poem;
});
