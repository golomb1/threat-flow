import { exposeThemeContext } from "./theme/theme-context";
import { exposeWindowContext } from "./window/window-context";
import { exposeLanguageContext } from "./language/language-context";

export default function exposeContexts() {
  exposeWindowContext();
  exposeThemeContext();
  exposeLanguageContext();
}
