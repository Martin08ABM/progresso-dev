import { c as createComponent, r as renderComponent, d as renderScript, b as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_tsOAALlV.mjs";
import "kleur/colors";
import { $ as $$Layout } from "../chunks/Layout_dC7IRO5r.mjs";
import { r } from "../chunks/internal_CWyUhqTg.mjs";
const $$Payment = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ProgressoDev - Versión Pro" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-row w-3/4 mx-auto mt-10 text-center gap-6"> <div class="bg-white border-2 border-neutral-700 shadow-md rounded-lg p-6 max-w-sm w-full md:w-1/3 mx-auto"> <h1 class="text-2xl mb-4">Versión Gratuita</h1> <ul class="text-left mb-4"> <li class="mb-2">- Generación de Roadmaps LIMITADOS</li> <li class="mb-2">- No se guardan</li> <li class="mb-2">- No hay soporte en caso de duda</li> <li class="mb-2">- Generación de Roadmaps en Español</li> </ul> <a href="/"><button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
Quedarse
</button></a> </div> <div class="bg-white border-2 border-neutral-700 shadow-md rounded-lg p-6 max-w-sm w-full md:w-1/3 mx-auto"> <h1 class="text-2xl mb-4">Versión Pro – 2,90 €</h1> <ul class="text-left mb-4"> <li class="mb-2">- Generación de Roadmaps ILIMITADOS</li> <li class="mb-2">- Poder almacenarlos en la web</li> <li class="mb-2">- Pedir ayuda a la IA en caso de no entender algo</li> <li class="mb-2">- Generación de Roadmaps en Español</li> <li class="mb-2">- Generación de Roadmaps en Inglés</li> </ul> <button id="checkout-button" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
Pagar
</button> <p id="error-message" class="text-red-500 mt-2 hidden"></p> </div> </div> ` })} ${renderScript($$result, "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/payment.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/payment.astro", void 0);
const $$file = "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/payment.astro";
const $$url = "/payment";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Payment,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
