import OpenAI from "openai";
import "dotenv/config";
import { r } from "../../chunks/internal_CWyUhqTg.mjs";
console.log("Variables de entorno cargadas (OPENAI_API_KEY): ", process.env.OPENAI_API_KEY);
console.log("Variables de entorno cargadas (SUPABASE_URL): ", process.env.SUPABASE_URL);
console.log("Variables de entorno cargadas (SUPABASE_ANON_KEY): ", process.env.SUPABASE_ANON_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const NORMAS_CHATGPT = `
Eres un asistente que genera roadmaps visuales. Cuando recibas un prompt, debes:
    1. Crear una descripción de una imagen que represente el roadmap.
    2. Generar un prompt adecuado para DALL·E-3 que permita crear esa imagen empieza con "Prompt para la imagen: ".
    3. Proporcionar una breve descripción textual del roadmap.
    4. Crear un resumen con viñetas de los hitos del roadmap.
    5. Indicar si algún paso requiere conocimientos técnicos, y cuáles.
`;
async function POST({ request }) {
  try {
    const req = await request.json();
    const { prompt, userId } = req;
    if (!prompt) {
      return new Response(JSON.stringify({ error: "No input provided" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    if (userId) {
      const { data: userData, error: userError } = await supabase.from("user_identifiers").select("is_pro, times_visited").eq("unique_id", userId).single();
      if (!userError && userData && !userData.is_pro && userData.times_visited > 3) {
        return new Response(JSON.stringify({
          error: "Has alcanzado el límite de solicitudes gratuitas. Actualiza a la versión PRO para continuar."
        }), {
          status: 403,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    }
    const prompt_con_normas = `${NORMAS_CHATGPT}

Prompt del usuario: ${prompt}`;
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt_con_normas }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });
    const respuestaChat = chatResponse.choices[0].message.content;
    const lines = respuestaChat.split("\n");
    const lineaPrompt = lines.find((line) => line.toLowerCase().includes("prompt para la imagen"));
    const promptVisual = lineaPrompt ? lineaPrompt.split(":").slice(1).join(":").trim() : null;
    if (!promptVisual) {
      return new Response(JSON.stringify({ error: "No se encontró prompt visual" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: promptVisual,
      size: "1920x1080",
      n: 1
    });
    const imageUrl = imageResponse.data[0].url;
    if (userId) {
      await supabase.from("user_actions").insert({
        user_id: userId,
        action_type: "roadmap_generated",
        action_data: {
          userPrompt: prompt,
          generatedImageUrl: imageUrl,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    return new Response(JSON.stringify([
      { tipo: "imagen", contenido: imageUrl },
      { tipo: "texto", contenido: respuestaChat }
    ]), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al comunicarse con OpenAI:", error);
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
