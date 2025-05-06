import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const NORMAS_CHATGPT = `
Eres un asistente que genera roadmaps visuales. Cuando recibas un prompt, debes:
    1. Crear una descripción de una imagen que represente el roadmap.
    2. Generar un prompt adecuado para DALL·E-3 que permita crear esa imagen empieza con "Prompt para la imagen: ".
    3. Proporcionar una breve descripción textual del roadmap.
    4. Crear un resumen con viñetas de los hitos del roadmap.
    5. Indicar si algún paso requiere conocimientos técnicos, y cuáles.
`;

export async function POST(request) {
    const req = await request.json()
    const { prompt } = req;
    if (!prompt) {
        return new Response(JSON.stringify({ error: 'No input provided' }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
        });
    }

    const prompt_con_normas = `${NORMAS_CHATGPT}\n\nPrompt del usuario: ${prompt}`;

    try {
        // Paso 1: generar respuesta de GPT-4
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "user", content: prompt_con_normas }
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        const respuestaChat = chatResponse.choices[0].message.content;

        // Buscar el prompt visual dentro de la respuesta
        const lines = respuestaChat.split('\n');
        const lineaPrompt = lines.find(line => line.toLowerCase().includes("prompt para la imagen"));
        const promptVisual = lineaPrompt ? lineaPrompt.split(':').slice(1).join(':').trim() : null;

        if (!promptVisual) {
            return new Response(JSON.stringify({ error: 'No se encontró prompt visual' }), {
                status: 500,
                headers: {
                  'Content-Type': 'application/json',
                },
            });
        }

        // Paso 2: generar imagen con DALL·E-3
        const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: promptVisual,
            size: "1024x1024",
            n: 1,
        });

        const imageUrl = imageResponse.data[0].url;

        return new Response(JSON.stringify({
            respuesta: respuestaChat,
            imagen: imageUrl,
        }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Error al comunicarse con OpenAI:", error);
        return new Response(JSON.stringify({ error: 'Error al procesar la solicitud' }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
        });
    }
}