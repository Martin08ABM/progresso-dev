import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_tsOAALlV.mjs";
import "kleur/colors";
import { $ as $$Layout } from "../chunks/Layout_CZzJ32_Z.mjs";
import { createClient } from "@supabase/supabase-js";
import { v4 } from "uuid";
import { r } from "../chunks/internal_CWyUhqTg.mjs";
const SUPABASE_URL = void 0;
const SUPABASE_ANON_KEY = void 0;
const UID_STORAGE_KEY = "progressodev_uuid";
class UserTracker {
  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    this.uid = null;
    this.initializeUid();
  }
  // Inicializa el identificador único del usuario
  initializeUid() {
    try {
      const storedUid = localStorage.getItem(UID_STORAGE_KEY);
      if (storedUid) {
        this.uid = storedUid;
        this.updateUserVisit();
      } else {
        this.createNewUser();
      }
    } catch (error) {
      console.error("Error al inicializar UID:", error);
    }
  }
  // Crea un nuevo usuario en Supabase y almacena el UID localmente
  async createNewUser() {
    try {
      const newUid = v4();
      this.uid = newUid;
      localStorage.setItem(UID_STORAGE_KEY, newUid);
      const userData = {
        uniqueId: newUid,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        lastVisited: (/* @__PURE__ */ new Date()).toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || null,
        timesVisited: 1,
        isPro: this.checkIfUserIsPro()
      };
      const { error } = await this.supabase.from("user_identifiers").insert(userData);
      if (error) {
        console.error("Error al crear identificador en Supabase:", error);
      }
    } catch (error) {
      console.error("Error al crear nuevo usuario:", error);
    }
  }
  // Actualiza los datos de visita del usuario
  async updateUserVisit() {
    if (!this.uid) return;
    try {
      const { data, error: fetchError } = await this.supabase.from("user_identifiers").select("timesVisited").eq("uniqueId", this.uid).single();
      if (fetchError) {
        console.error("Error al obtener datos del usuario:", fetchError);
        return;
      }
      const { error: updateError } = await this.supabase.from("user_identifiers").update({
        lastVisited: (/* @__PURE__ */ new Date()).toISOString(),
        timesVisited: (data?.timesVisited || 0) + 1,
        isPro: this.checkIfUserIsPro(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || null
      }).eq("uniqueId", this.uid);
      if (updateError) {
        console.error("Error al actualizar datos del usuario:", updateError);
      }
    } catch (error) {
      console.error("Error al actualizar visita:", error);
    }
  }
  // Verifica si el usuario tiene estatus PRO
  checkIfUserIsPro() {
    try {
      let getCookie2 = function(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
        return null;
      };
      return getCookie2("proPayed") === "true";
    } catch (error) {
      console.error("Error al verificar estatus Pro:", error);
      return false;
    }
  }
  // Actualiza el estado PRO del usuario
  async updateProStatus(isPro) {
    if (!this.uid) return;
    try {
      const { error } = await this.supabase.from("user_identifiers").update({ isPro }).eq("uniqueId", this.uid);
      if (error) {
        console.error("Error al actualizar estado PRO:", error);
      }
    } catch (error) {
      console.error("Error al actualizar estado PRO:", error);
    }
  }
  // Registra una acción del usuario
  async trackUserAction(actionType, actionData) {
    if (!this.uid) return;
    try {
      const { error } = await this.supabase.from("user_actions").insert({
        userId: this.uid,
        actionType,
        actionData,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (error) {
        console.error("Error al registrar acción:", error);
      }
    } catch (error) {
      console.error("Error al registrar acción del usuario:", error);
    }
  }
  /**
   * Obtiene el identificador único
   */
  getUid() {
    return this.uid;
  }
}
const userTracker = new UserTracker();
const $$Exito = createComponent(($$result, $$props, $$slots) => {
  document.addEventListener("DOMContentLoaded", () => {
    if (getCookie("proPayed") === "true") {
      userTracker.updateProStatus(true);
    }
  });
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
}, "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/exito.astro", void 0);
const $$file = "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/exito.astro";
const $$url = "/exito";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Exito,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
