import { jsx } from "react/jsx-runtime";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { router } from "./routes";
function App() {
  return  jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(RouterProvider, { router }) }) });
}
export {
  App as default
};
