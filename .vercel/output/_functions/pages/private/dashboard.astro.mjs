import { c as createComponent, r as renderComponent, b as renderTemplate } from "../../chunks/astro/server_tsOAALlV.mjs";
import "kleur/colors";
import { $ as $$Layout, U as UserButton } from "../../chunks/Layout_dC7IRO5r.mjs";
import { r } from "../../chunks/internal_CWyUhqTg.mjs";
const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "UserButton", UserButton, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "UserButton.UserProfilePage", UserButton.UserProfilePage, { "label": "account" })} ${renderComponent($$result3, "UserButton.UserProfilePage", UserButton.UserProfilePage, { "label": "security" })} ` })} ` })}`;
}, "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/Private/dashboard.astro", void 0);
const $$file = "C:/Users/marti/OneDrive/Escritorio/progresso-dev/src/pages/Private/dashboard.astro";
const $$url = "/Private/dashboard";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
