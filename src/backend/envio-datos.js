require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

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

app.post('/recogidaDatos', async (req, res) => {
    const { prompt } = req.body;
    console.log("ENVIO-DATOS ESTA FUNCIONANDO");
    if (!prompt) {
        return res.status(400).json({ error: 'No input provided' });
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
        return res.status(500).json({ error: 'No se encontró prompt visual' });
        }

        // Paso 2: generar imagen con DALL·E-3
        const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: promptVisual,
        size: "1024x1024",
        n: 1,
        });

        const imageUrl = imageResponse.data[0].url;

        return res.json({
        respuesta: respuestaChat,
        imagen: imageUrl,
        });

    } catch (error) {
        console.error("Error al comunicarse con OpenAI:", error);
        return res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
