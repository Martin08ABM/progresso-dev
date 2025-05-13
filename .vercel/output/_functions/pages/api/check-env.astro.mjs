import { r } from "../../chunks/internal_CWyUhqTg.mjs";
const __vite_import_meta_env__ = { "ASSETS_PREFIX": void 0, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_CLERK_PUBLISHABLE_KEY": "pk_test_ZnVua3ktdGVybWl0ZS03Ni5jbGVyay5hY2NvdW50cy5kZXYk", "SITE": void 0, "SSR": true };
function GET() {
  try {
    const envInfo = {
      available: {
        STRIPE_SECRET_KEY: "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" ? `${"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".substring(0, 7)}...` : "No disponible",
        SITE: "http://localhost:4321"
      },
      allKeys: Object.keys(Object.assign(__vite_import_meta_env__, { STRIPE_SECRET_KEY: "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", SITE: "http://localhost:4321" })).filter((key) => !key.includes("SECRET"))
      // No incluir claves secretas
    };
    let stripeStatus = "Sin verificar";
    try {
      require("stripe");
      stripeStatus = "Instalado";
    } catch (err) {
      stripeStatus = `No instalado: ${err.message}`;
    }
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      isSSR: typeof window === "undefined",
      stripeStatus
    };
    return new Response(
      JSON.stringify({
        success: true,
        environment: envInfo,
        system: systemInfo
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
        stack: err.stack
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
