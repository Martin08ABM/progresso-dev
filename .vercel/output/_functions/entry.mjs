import { r as renderers } from "./chunks/internal_CWyUhqTg.mjs";
import { c as createExports } from "./chunks/entrypoint_WAcwTvC0.mjs";
import { manifest } from "./manifest_gadRzQn3.mjs";
const serverIslandMap = /* @__PURE__ */ new Map();
;
const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/api/checkout.astro.mjs");
const _page2 = () => import("./pages/api/conectionaopenai.astro.mjs");
const _page3 = () => import("./pages/buena-prompt.astro.mjs");
const _page4 = () => import("./pages/exito.astro.mjs");
const _page5 = () => import("./pages/payment.astro.mjs");
const _page6 = () => import("./pages/private/dashboard.astro.mjs");
const _page7 = () => import("./pages/index.astro.mjs");
const pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/api/checkout.js", _page1],
  ["src/pages/api/conectionAOpenAI.js", _page2],
  ["src/pages/buena-prompt.astro", _page3],
  ["src/pages/exito.astro", _page4],
  ["src/pages/payment.astro", _page5],
  ["src/pages/Private/dashboard.astro", _page6],
  ["src/pages/index.astro", _page7]
]);
const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  actions: () => import("./_noop-actions.mjs"),
  middleware: () => import("./_astro-internal_middleware.mjs")
});
const _args = {
  "middlewareSecret": "88385e02-9370-428f-8e78-327c7ac3641e",
  "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
