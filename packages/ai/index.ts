import { OpenRouter } from "@openrouter/sdk";
import secrets from "@repo/secrets";

const ai = new OpenRouter({
  apiKey: secrets.OPENROUTER_API_KEY,
});

export default ai


// async function main() {
//   console.log({ secrets });
//   const completion: any = await openRouter.chat.send({
//     chatGenerationParams: {
//       model: "google/gemini-3-flash-preview",
//       messages: [
//         {
//           role: "user",
//           content: "What is the meaning of life?",
//         },
//       ],
//       stream: false,
//     },
//   });
//   console.log(completion.choices[0].message);
//   if (completion) {
//     console.log(completion.choices[0].message);
//   }
// }

// main();
