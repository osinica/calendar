/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverDependenciesToBundle: [
    "@react-dnd/asap",
    "@react-dnd/invariant",
    "@react-dnd/shallowequal",
    "dnd-core",
    "react-dnd",
    "react-dnd-html5-backend",
    "redux",
  ],
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  serverModuleFormat: "cjs",
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: false,
  },
};
