import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_tsOAALlV.mjs";
import "kleur/colors";
import { $ as $$Layout } from "../chunks/Layout_CZzJ32_Z.mjs";
import { r } from "../chunks/internal_CWyUhqTg.mjs";
const $$TestApi = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "¡Pago Completado! - ProgressoDev Pro" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center justify-center min-h-[70vh] text-center p-6"> <div class="bg-white border-2 border-green-500 shadow-lg rounded-lg p-8 max-w-md"> <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <h1 class="text-3xl font-bold text-green-600 mb-4">¡Pago Completado!</h1> <p class="text-lg mb-6">
Gracias por adquirir ProgressoDev Pro. Ya puedes disfrutar de todas las ventajas.
</p> <ul class="text-left mb-6 bg-gray-50 p-4 rounded-lg"> <li class="flex items-center mb-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg>
Roadmaps ILIMITADOS
</li> <li class="flex items-center mb-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg>
Almacenamiento en la web
</li> <li class="flex items-center mb-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg>
Soporte con IA
</li> <li class="flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg>
Contenido en español e inglés
</li> </ul> <a href="/" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
Ir al Dashboard
</a> </div> </div> ` })}`;
}, "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/test-api.astro", void 0);
const $$file = "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/test-api.astro";
const $$url = "/test-api";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$TestApi,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
