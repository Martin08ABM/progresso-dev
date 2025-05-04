// Input de texto para enviar el mensaje al servidor
const prompt = document.getElementById("input-text");

// Checkboxes
const checkbox1 = document.getElementById("frontend");
const checkbox2 = document.getElementById("backend");
const checkbox3 = document.getElementById("fullstack");
const checkbox4 = document.getElementById("mobile");
const checkbox5 = document.getElementById("videogames");
const checkbox6 = document.getElementById("dataScience");
const checkbox7 = document.getElementById("devOps");
const checkbox8 = document.getElementById("cibersecurity");
const checkbox9 = document.getElementById("cloudEngineer");
const checkbox10 = document.getElementById("machineLearning");
const checkbox11 = document.getElementById("desktopDeveloper");
const checkbox12 = document.getElementById("linuxExpert");

// Array de checkboxes
const checkboxes = [ checkbox1, checkbox2, checkbox3, checkbox4, checkbox5, checkbox6, checkbox7, checkbox8, checkbox9, checkbox10, checkbox11, checkbox12];
const seleccionados = [];

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            seleccionados.push(this.value);
        } else {
            const index = seleccionados.indexOf(this.value);
            if (index > -1) {
                seleccionados.splice(index, 1);
            }
        }
    });
});

async function enviarDatos() {
    // Cojer los datos introducidos por el usuario
    const mensaje = prompt.value;
    const cajasContexto = seleccionados.values();

    // Datos a enviar a ChatGPT
    const data = {
        prompt: mensaje,
        checkboxes: cajasContexto,
    };
    try {
        const response = await fetch("/src/backend/envio-datos.py", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del backend:', errorData);
            mostrarRespuesta('Hubo un error al procesar tu solicitud.');
            return;
        }
        const data = await response.json();
        mostrarRespuesta(data.respuesta);
    } catch (error) {
        console.error('Error de red:', error);
        mostrarRespuesta('No se pudo conectar con el servidor.');
    }
    function mostrarRespuesta(respuesta) {
        document.getElementById("chatGPTResponse").innerText = respuesta;
    }
}