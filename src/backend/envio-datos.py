from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)
openai.api_key = os.getenv("OPENAI_API_KEY")

NORMAS_CHATGPT = """
Tienes que crear una imagen de un roadmap de lo que te pida el usuario siguiendo las indicaciones que te de. La imagen debe ser en formato PNG y tener un estilo visual minimalista con cajas de texto rectangulares de color azul claro y flechas de color gris oscuro conectándolas. El diseño del roadmap debe ser horizontal, mostrando las fases principales de izquierda a derecha.
Además, tienes que darme una breve descripción de la imagen que has creado (máximo tres frases) resaltando la estructura general del roadmap. También debes proporcionar un resumen del roadmap en formato de lista con viñetas, indicando los principales hitos y sus correspondientes acciones. Finalmente, indica si algún paso del roadmap requiere conocimientos técnicos específicos, mencionando brevemente cuáles.
"""
@app.route('/recogidaDatos', methods=['POST'])
def recogida_datos():
    data = request.get_json()
    prompt = data.get('prompt', '')
    checkbox = data.get('checkboxes', True)

    if not prompt:
        return jsonify({'error': 'No input provided'}), 400

    promptConNormas = f"{NORMAS_CHATGPT}\n\nPrompt del usuario: {prompt}"

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": promptConNormas}
            ],
            temperature=0.7,
            max_tokens=1500,
            n=1,
            stop=None
        )
        respuesta_chatgpt = response.choices[0].message.content
        return jsonify({'respuesta': respuesta_chatgpt})
    except Exception as e:
        print(f"Error al comunicarse con OpenAI: {e}")
        return jsonify({'error': 'Error al procesar la solicitud'}), 500

if __name__ == '__main__':
    app.run(debug=True)