import { MenuItemConstructorOptions } from 'electron';
import type { i18n } from 'i18next';

// Contains a whitelist of languages for our app
const whitelistMap: Record<string, string> = {
  // de: 'Deutsche', // German
  en: 'English',
  // ja: '日本語' // Japanese
  // af: 'Afrikaans', //Afrikaans
  // ar: 'عربى', // Arabic
  // am: 'አማርኛ', // Amharic
  // bg: 'български', // Bulgarian
  // ca: 'Català', // Catalan
  // cs: 'čeština', // Czech
  // da: 'Dansk', // Danish
  // el: 'Ελληνικά', // Greek
  // es: 'Español', // Spanish
  // et: 'Eestlane', // Estonian
  // fa: 'فارسی', // Persian
  // fi: 'Suomalainen', // Finnish
  // fil: 'Pilipino', // Filipino
  // fr: 'Français', // French
  // gu: 'ગુજરાતી', // Gujarati
  he: 'עברית', // Hebrew
  // hi: 'हिंदी', // Hindi
  // hr: 'Hrvatski', // Croatian
  // hu: 'Magyar', // Hungarian
  // id: 'Indonesia', // Indonesian
  // it: 'Italiano', // Italian
  // kn: 'ಕನ್ನಡ', // Kannada
  // ko: '한국어', // Korean
  // lt: 'Lietuvis', // Lithuanian
  // lv: 'Latvietis', // Latvian
  // ml: 'മലയാളം', // Malayalam
  // mr: 'मराठी', // Marathi
  // ms: 'Melayu', // Malay
  // nl: 'Nederlands', // Dutch
  // no: 'norsk', // Norwegian
  // pl: 'Polskie', // Polish
  // pt: 'Português', // Portuguese
  // ro: 'Română', // Romanian
  // ru: 'Pусский', // Russian
  // sk: 'Slovenský', // Slovak
  // sr: 'Српски', // Serbian
  // sv: 'Svenska', // Swedish
  // sw: 'Kiswahili', // Swahili
  // ta: 'தமிழ்', // Tamil
  // te: 'తెలుగు', // Telugu
  // th: 'ไทย', // Thai
  // tr: 'Türk', // Turkish
  // uk: 'Українська', // Ukranian
  // vi: 'Tiếng Việt', // Vietnamese
  // zh_CN: '简体中文' // Chinese
};

const whitelist = (function () {
  const keys: string[] = Object.keys(whitelistMap);
  return {
    langs: keys,
    buildSubmenu: function (i18nextMainBackend: i18n): MenuItemConstructorOptions[] {
      const submenu: MenuItemConstructorOptions[] = [];
      for (const key of keys) {
        submenu.push({
          label: whitelistMap[key],
          type: 'radio',
          checked: i18nextMainBackend.language === key,
          click: () => i18nextMainBackend.changeLanguage(key)
        });
      }
      return submenu;
    }
  };
})();

export default whitelist;