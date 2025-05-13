import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_tsOAALlV.mjs";
import "kleur/colors";
import { $ as $$Layout } from "../chunks/Layout_CZzJ32_Z.mjs";
import { r } from "../chunks/internal_CWyUhqTg.mjs";
const $$Astro = createAstro();
const $$BuenaPrompt = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BuenaPrompt;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ProgressoDev - ¿Cómo hacer una buena prompt?" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full"> <div class="w-[100% - 14px] flex flex-col items-center justify-center text-center p-4 ml-8 "> <h1 class="text-3xl font-bold mb-4">¿Cómo hacer una buena prompt?</h1> <div class="text-left"> <p class="text-lg mb-4">Aprende a crear prompts efectivos para obtener mejores resultados.</p> <p class="text-lg mb-4">Una buena prompt para que le genere un buen roadmap debe de seguir estos parámetros. Aquí hay algunos consejos:</p> <ul class="list-disc list-inside mb-4 decoration-none text-left"> <li>Sea claro y específico en lo que quiera aprender.</li> <li>Proporcione contexto relevante (tengo experiencia haciendo ...).</li> <li>Digale claramente como quiere que sea su camino de aprendizaje</li> <li>Si tiene alguna dificultad en algún campo digalo (no me se manejar con redes, ...)</li> <li>Si tiene un tiempo estimado para aprenderlo digalo (me gustaría aprenderlo en 6 meses)</li> <li>Si tiene un objetivo claro digalo (me gustaría conseguir un trabajo como ...)</li> <li>Diga como quiere aprender (de una forma más práctica o más teórica, siguiendo algún método especial ...)</li> <li>Si tiene algún recurso que le gustaría usar digalo (me gustaría usar este libro o este curso ...)</li> <li>Si tiene alguna preferencia por un lenguaje de programación digalo (me gustaría aprender esto, pero centrandome más en Python, Java, ...)</li> <li>Si tiene alguna preferencia por un tipo de proyecto digalo (me gustaría hacer un proyecto de ...)</li> <p class="text-[12px] mt-2 ml-4 text-red-600">*El contexto extra puede darlo con las etiquetas debajo de la barra de escritura</p> </ul> <h1 class="text-2xl font-bold mt-4 mb-4">Ejemplo de una buena prompt:</h1> <p>Quiero aprender desarrollo web frontend en 8 meses, especializándome en Astro, React y Tailwind CSS, además de gestión de estado (Redux Toolkit/Zustand) y testing (Jest/React Testing Library). Tengo experiencia básica en HTML, CSS y JavaScript.
                    Busco un camino de aprendizaje práctico, construyendo proyectos reales (portafolio, gestión de tareas/blog). Mi dificultad principal son los conceptos de redes y despliegue. Idealmente, me gustaría alcanzar un nivel junior en 6 meses.
                    Prefiero aprender de forma práctica, con ejemplos y ejercicios. Agradecería recomendaciones de cursos online que cubran estas tecnologías. Aunque mi foco es JavaScript, no tengo preferencia por otro lenguaje.
                    ¿Podrías ayudarme a crear un plan de aprendizaje y recomendarme recursos para lograr mi objetivo de ser desarrollador frontend junior en 8 meses, considerando mi experiencia, preferencias y mi dificultad con el despliegue?</p> </div> </div> </div> ` })}`;
}, "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/buena-prompt.astro", void 0);
const $$file = "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/buena-prompt.astro";
const $$url = "/buena-prompt";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$BuenaPrompt,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
