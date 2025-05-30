import { createClerkClient } from "@clerk/backend";
import { createClerkRequest, constants, AuthStatus, createRedirect, signedOutAuthObject, signedInAuthObject } from "@clerk/backend/internal";
import { isDevelopmentFromSecretKey } from "@clerk/shared/keys";
import { handleNetlifyCacheInDevInstance } from "@clerk/shared/netlifyCacheHandler";
import { isHttpOrHttps } from "@clerk/shared/proxy";
import { handleValueOrFn } from "@clerk/shared/utils";
import { clerkJsScriptUrl } from "@clerk/shared/loadClerkJsScript";
import { isTruthy } from "@clerk/shared/underscore";
import { decodeJwt } from "@clerk/backend/jwt";
import { DEV_BROWSER_JWT_KEY, setDevBrowserJWTInURL } from "@clerk/shared/devBrowser";
import "@clerk/shared/pathMatcher";
import "es-module-lexer";
import "./chunks/astro-designed-error-pages_srxAhvFj.mjs";
import "kleur/colors";
import "./chunks/astro/server_tsOAALlV.mjs";
import "clsx";
import "cookie";
import { s as sequence } from "./chunks/index_BdycSl9W.mjs";
async function createAsyncLocalStorage() {
  const { AsyncLocalStorage } = await import("node:async_hooks");
  return new AsyncLocalStorage();
}
var authAsyncStorage = await createAsyncLocalStorage();
const __vite_import_meta_env__ = { "ASSETS_PREFIX": void 0, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_CLERK_PUBLISHABLE_KEY": "pk_live_Y2xlcmsuaG9sYS5ob2xhJA", "SITE": void 0, "SSR": true };
function getContextEnvVar(envVarName, contextOrLocals) {
  const locals = "locals" in contextOrLocals ? contextOrLocals.locals : contextOrLocals;
  if (locals?.runtime?.env) {
    return locals.runtime.env[envVarName];
  }
  return Object.assign(__vite_import_meta_env__, { CLERK_SECRET_KEY: "sk_live_BVLU4EsNtyKwIOmW44pv6HFZNbB5mEzLoZ38tXXjxf", Path: process.env.Path, PUBLIC: process.env.PUBLIC })[envVarName];
}
function getSafeEnv(context) {
  return {
    domain: getContextEnvVar("PUBLIC_CLERK_DOMAIN", context),
    isSatellite: getContextEnvVar("PUBLIC_CLERK_IS_SATELLITE", context) === "true",
    proxyUrl: getContextEnvVar("PUBLIC_CLERK_PROXY_URL", context),
    pk: getContextEnvVar("PUBLIC_CLERK_PUBLISHABLE_KEY", context),
    sk: getContextEnvVar("CLERK_SECRET_KEY", context),
    signInUrl: getContextEnvVar("PUBLIC_CLERK_SIGN_IN_URL", context),
    signUpUrl: getContextEnvVar("PUBLIC_CLERK_SIGN_UP_URL", context),
    clerkJsUrl: getContextEnvVar("PUBLIC_CLERK_JS_URL", context),
    clerkJsVariant: getContextEnvVar("PUBLIC_CLERK_JS_VARIANT", context),
    clerkJsVersion: getContextEnvVar("PUBLIC_CLERK_JS_VERSION", context),
    apiVersion: getContextEnvVar("CLERK_API_VERSION", context),
    apiUrl: getContextEnvVar("CLERK_API_URL", context),
    telemetryDisabled: isTruthy(getContextEnvVar("PUBLIC_CLERK_TELEMETRY_DISABLED", context)),
    telemetryDebug: isTruthy(getContextEnvVar("PUBLIC_CLERK_TELEMETRY_DEBUG", context))
  };
}
function getClientSafeEnv(context) {
  return {
    domain: getContextEnvVar("PUBLIC_CLERK_DOMAIN", context),
    isSatellite: getContextEnvVar("PUBLIC_CLERK_IS_SATELLITE", context) === "true",
    proxyUrl: getContextEnvVar("PUBLIC_CLERK_PROXY_URL", context),
    signInUrl: getContextEnvVar("PUBLIC_CLERK_SIGN_IN_URL", context),
    signUpUrl: getContextEnvVar("PUBLIC_CLERK_SIGN_UP_URL", context)
  };
}
function buildClerkHotloadScript(locals) {
  const publishableKey = getSafeEnv(locals).pk;
  const proxyUrl = getSafeEnv(locals).proxyUrl;
  const domain = getSafeEnv(locals).domain;
  const scriptSrc = clerkJsScriptUrl({
    clerkJSUrl: getSafeEnv(locals).clerkJsUrl,
    clerkJSVariant: getSafeEnv(locals).clerkJsVariant,
    clerkJSVersion: getSafeEnv(locals).clerkJsVersion,
    domain,
    proxyUrl,
    publishableKey
  });
  return `
  <script src="${scriptSrc}"
  data-clerk-js-script
  async
  crossOrigin='anonymous'
  ${publishableKey ? `data-clerk-publishable-key="${publishableKey}"` : ``}
  ${proxyUrl ? `data-clerk-proxy-url="${proxyUrl}"` : ``}
  ${domain ? `data-clerk-domain="${domain}"` : ``}
  ><\/script>
`;
}
var createClerkClientWithOptions = (context, options) => createClerkClient({
  secretKey: getSafeEnv(context).sk,
  publishableKey: getSafeEnv(context).pk,
  apiUrl: getSafeEnv(context).apiUrl,
  apiVersion: getSafeEnv(context).apiVersion,
  proxyUrl: getSafeEnv(context).proxyUrl,
  domain: getSafeEnv(context).domain,
  isSatellite: getSafeEnv(context).isSatellite,
  userAgent: `${"@clerk/astro"}@${"2.6.12"}`,
  sdkMetadata: {
    name: "@clerk/astro",
    version: "2.6.12",
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    environment: Object.assign(__vite_import_meta_env__, { CLERK_SECRET_KEY: "sk_live_BVLU4EsNtyKwIOmW44pv6HFZNbB5mEzLoZ38tXXjxf", Path: process.env.Path, PUBLIC: process.env.PUBLIC }).MODE
  },
  telemetry: {
    disabled: getSafeEnv(context).telemetryDisabled,
    debug: getSafeEnv(context).telemetryDebug
  },
  ...options
});
var clerkClient = (context) => createClerkClientWithOptions(context);
function getAuthKeyFromRequest(req, key) {
  return getHeader(req, constants.Headers[key]);
}
function getHeader(req, name) {
  return req.headers.get(name);
}
var isRedirect = (res) => {
  return [300, 301, 302, 303, 304, 307, 308].includes(res.status) || res.headers.get(constants.Headers.ClerkRedirectTo) === "true";
};
var setHeader = (res, name, val) => {
  res.headers.set(name, val);
  return res;
};
var createGetAuth = ({ noAuthStatusMessage }) => {
  return (req, locals, opts) => {
    const authToken = locals.authToken || getAuthKeyFromRequest(req, "AuthToken");
    const authStatus = locals.authStatus || getAuthKeyFromRequest(req, "AuthStatus");
    const authMessage = locals.authMessage || getAuthKeyFromRequest(req, "AuthMessage");
    const authReason = locals.authReason || getAuthKeyFromRequest(req, "AuthReason");
    if (!authStatus) {
      throw new Error(noAuthStatusMessage);
    }
    const options = {
      authStatus,
      apiUrl: getSafeEnv(locals).apiUrl,
      apiVersion: getSafeEnv(locals).apiVersion,
      authMessage,
      secretKey: opts?.secretKey || getSafeEnv(locals).sk,
      authReason
    };
    if (authStatus !== AuthStatus.SignedIn) {
      return signedOutAuthObject(options);
    }
    const jwt = decodeJwt(authToken);
    return signedInAuthObject(options, jwt.raw.text, jwt.payload);
  };
};
var authAuthHeaderMissing = (helperName = "auth") => `Clerk: ${helperName}() was called but Clerk can't detect usage of clerkMiddleware(). Please ensure that the clerkMiddleware() is used in your Astro Middleware.
    `;
var getAuth = createGetAuth({
  noAuthStatusMessage: authAuthHeaderMissing()
});
var createCurrentUser = (req, context) => {
  return async () => {
    const { userId } = getAuth(req, context.locals);
    if (!userId) {
      return null;
    }
    return clerkClient(context).users.getUser(userId);
  };
};
var serverRedirectWithAuth = (context, clerkRequest, res, opts) => {
  const location = res.headers.get("location");
  const shouldAppendDevBrowser = res.headers.get(constants.Headers.ClerkRedirectTo) === "true";
  if (shouldAppendDevBrowser && !!location && // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  isDevelopmentFromSecretKey(opts.secretKey || getSafeEnv(context).sk) && clerkRequest.clerkUrl.isCrossOrigin(location)) {
    const dbJwt = clerkRequest.cookies.get(DEV_BROWSER_JWT_KEY) || "";
    const url = new URL(location);
    const urlWithDevBrowser = setDevBrowserJWTInURL(url, dbJwt);
    return context.redirect(urlWithDevBrowser.href, 307);
  }
  return res;
};
var CONTROL_FLOW_ERROR = {
  REDIRECT_TO_SIGN_IN: "CLERK_PROTECT_REDIRECT_TO_SIGN_IN"
};
var clerkMiddleware = (...args) => {
  const [handler, options] = parseHandlerAndOptions(args);
  const astroMiddleware = async (context, next) => {
    if (isPrerenderedPage(context)) {
      return next();
    }
    const clerkRequest = createClerkRequest(context.request);
    const requestState = await clerkClient(context).authenticateRequest(
      clerkRequest,
      createAuthenticateRequestOptions(clerkRequest, options, context)
    );
    const locationHeader = requestState.headers.get(constants.Headers.Location);
    if (locationHeader) {
      handleNetlifyCacheInDevInstance({
        locationHeader,
        requestStateHeaders: requestState.headers,
        publishableKey: requestState.publishableKey
      });
      const res = new Response(null, { status: 307, headers: requestState.headers });
      return decorateResponseWithObservabilityHeaders(res, requestState);
    } else if (requestState.status === AuthStatus.Handshake) {
      throw new Error("Clerk: handshake status without redirect");
    }
    const authObject = requestState.toAuth();
    const redirectToSignIn = createMiddlewareRedirectToSignIn(clerkRequest);
    const authObjWithMethods = Object.assign(authObject, { redirectToSignIn });
    decorateAstroLocal(clerkRequest, context, requestState);
    return authAsyncStorage.run(context.locals.auth(), async () => {
      let handlerResult;
      try {
        handlerResult = await handler?.(() => authObjWithMethods, context, next) || await next();
      } catch (e) {
        handlerResult = handleControlFlowErrors(e, clerkRequest, requestState, context);
      }
      if (isRedirect(handlerResult)) {
        return serverRedirectWithAuth(context, clerkRequest, handlerResult, options);
      }
      const response = decorateRequest(context.locals, handlerResult);
      if (requestState.headers) {
        requestState.headers.forEach((value, key) => {
          response.headers.append(key, value);
        });
      }
      return response;
    });
  };
  return astroMiddleware;
};
var isPrerenderedPage = (context) => {
  return (
    // for Astro v5
    "isPrerendered" in context && context.isPrerendered || // for Astro v4
    "_isPrerendered" in context && context._isPrerendered
  );
};
var parseHandlerAndOptions = (args) => {
  return [
    typeof args[0] === "function" ? args[0] : void 0,
    (args.length === 2 ? args[1] : typeof args[0] === "function" ? {} : args[0]) || {}
  ];
};
var createAuthenticateRequestOptions = (clerkRequest, options, context) => {
  return {
    ...options,
    secretKey: options.secretKey || getSafeEnv(context).sk,
    publishableKey: options.publishableKey || getSafeEnv(context).pk,
    signInUrl: options.signInUrl || getSafeEnv(context).signInUrl,
    signUpUrl: options.signUpUrl || getSafeEnv(context).signUpUrl,
    ...handleMultiDomainAndProxy(clerkRequest, options, context)
  };
};
var decorateResponseWithObservabilityHeaders = (res, requestState) => {
  if (requestState.message) {
    res.headers.set(constants.Headers.AuthMessage, encodeURIComponent(requestState.message));
  }
  if (requestState.reason) {
    res.headers.set(constants.Headers.AuthReason, encodeURIComponent(requestState.reason));
  }
  if (requestState.status) {
    res.headers.set(constants.Headers.AuthStatus, encodeURIComponent(requestState.status));
  }
  return res;
};
var handleMultiDomainAndProxy = (clerkRequest, opts, context) => {
  const relativeOrAbsoluteProxyUrl = handleValueOrFn(
    opts?.proxyUrl,
    clerkRequest.clerkUrl,
    getSafeEnv(context).proxyUrl
  );
  let proxyUrl;
  if (!!relativeOrAbsoluteProxyUrl && !isHttpOrHttps(relativeOrAbsoluteProxyUrl)) {
    proxyUrl = new URL(relativeOrAbsoluteProxyUrl, clerkRequest.clerkUrl).toString();
  } else {
    proxyUrl = relativeOrAbsoluteProxyUrl;
  }
  const isSatellite = handleValueOrFn(opts.isSatellite, new URL(clerkRequest.url), getSafeEnv(context).isSatellite);
  const domain = handleValueOrFn(opts.domain, new URL(clerkRequest.url), getSafeEnv(context).domain);
  const signInUrl = opts?.signInUrl || getSafeEnv(context).signInUrl;
  if (isSatellite && !proxyUrl && !domain) {
    throw new Error(missingDomainAndProxy);
  }
  if (isSatellite && !isHttpOrHttps(signInUrl) && // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  isDevelopmentFromSecretKey(opts.secretKey || getSafeEnv(context).sk)) {
    throw new Error(missingSignInUrlInDev);
  }
  return {
    proxyUrl,
    isSatellite,
    domain
  };
};
var missingDomainAndProxy = `
Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.

1) With middleware
   e.g. export default clerkMiddleware({domain:'YOUR_DOMAIN',isSatellite:true});
2) With environment variables e.g.
   PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   PUBLIC_CLERK_IS_SATELLITE='true'
   `;
var missingSignInUrlInDev = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With middleware
   e.g. export default clerkMiddleware({signInUrl:'SOME_URL', isSatellite:true});
2) With environment variables e.g.
   PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   PUBLIC_CLERK_IS_SATELLITE='true'`;
function decorateAstroLocal(clerkRequest, context, requestState) {
  const { reason, message, status, token } = requestState;
  context.locals.authToken = token;
  context.locals.authStatus = status;
  context.locals.authMessage = message;
  context.locals.authReason = reason;
  context.locals.auth = () => {
    const authObject = getAuth(clerkRequest, context.locals);
    const clerkUrl = clerkRequest.clerkUrl;
    const redirectToSignIn = (opts = {}) => {
      const devBrowserToken = clerkRequest.clerkUrl.searchParams.get(constants.QueryParameters.DevBrowser) || clerkRequest.cookies.get(constants.Cookies.DevBrowser);
      return createRedirect({
        redirectAdapter,
        devBrowserToken,
        baseUrl: clerkUrl.toString(),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        publishableKey: getSafeEnv(context).pk,
        signInUrl: requestState.signInUrl,
        signUpUrl: requestState.signUpUrl,
        sessionStatus: requestState.toAuth()?.sessionStatus
      }).redirectToSignIn({
        returnBackUrl: opts.returnBackUrl === null ? "" : opts.returnBackUrl || clerkUrl.toString()
      });
    };
    return Object.assign(authObject, { redirectToSignIn });
  };
  context.locals.currentUser = createCurrentUser(clerkRequest, context);
}
function findClosingHeadTagIndex(chunk, endHeadTag) {
  return chunk.findIndex((_, i) => endHeadTag.every((value, j) => value === chunk[i + j]));
}
function decorateRequest(locals, res) {
  if (res.headers.get("content-type") === "text/html") {
    const encoder = new TextEncoder();
    const closingHeadTag = encoder.encode("</head>");
    const clerkAstroData = encoder.encode(
      `<script id="__CLERK_ASTRO_DATA__" type="application/json">${JSON.stringify(locals.auth())}<\/script>
`
    );
    const clerkSafeEnvVariables = encoder.encode(
      `<script id="__CLERK_ASTRO_SAFE_VARS__" type="application/json">${JSON.stringify(getClientSafeEnv(locals))}<\/script>
`
    );
    const hotloadScript = encoder.encode(buildClerkHotloadScript(locals));
    const stream = res.body.pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          const index = findClosingHeadTagIndex(chunk, closingHeadTag);
          const isClosingHeadTagFound = index !== -1;
          if (isClosingHeadTagFound) {
            controller.enqueue(chunk.slice(0, index));
            controller.enqueue(clerkAstroData);
            controller.enqueue(clerkSafeEnvVariables);
            controller.enqueue(hotloadScript);
            controller.enqueue(closingHeadTag);
            controller.enqueue(chunk.slice(index + closingHeadTag.length));
          } else {
            controller.enqueue(chunk);
          }
        }
      })
    );
    const modifiedResponse = new Response(stream, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers
    });
    return modifiedResponse;
  }
  return res;
}
var redirectAdapter = (url) => {
  const res = new Response(null, {
    status: 307
  });
  setHeader(res, constants.Headers.ClerkRedirectTo, "true");
  return setHeader(res, "Location", url instanceof URL ? url.href : url);
};
var createMiddlewareRedirectToSignIn = (clerkRequest) => {
  return (opts = {}) => {
    const err = new Error(CONTROL_FLOW_ERROR.REDIRECT_TO_SIGN_IN);
    err.returnBackUrl = opts.returnBackUrl === null ? "" : opts.returnBackUrl || clerkRequest.clerkUrl.toString();
    throw err;
  };
};
var handleControlFlowErrors = (e, clerkRequest, requestState, context) => {
  switch (e.message) {
    case CONTROL_FLOW_ERROR.REDIRECT_TO_SIGN_IN:
      return createRedirect({
        redirectAdapter,
        baseUrl: clerkRequest.clerkUrl,
        signInUrl: requestState.signInUrl,
        signUpUrl: requestState.signUpUrl,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        publishableKey: getSafeEnv(context).pk,
        sessionStatus: requestState.toAuth()?.sessionStatus
      }).redirectToSignIn({ returnBackUrl: e.returnBackUrl });
    default:
      throw e;
  }
};
const onRequest$1 = clerkMiddleware();
const onRequest = sequence(
  onRequest$1
);
export {
  onRequest
};
