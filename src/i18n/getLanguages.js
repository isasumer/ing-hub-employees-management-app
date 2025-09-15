import { enMessages } from "./en";
import { trMessages } from "./tr";

export class MLHelper {
    static currentLangugage = (localStorage.getItem('appLanguage') || navigator.language).replace('-', '-').toLowerCase();
    static supportedLanguages = ["en-en", "tr-tr"];

    static updateLanguage(lang) {
        this.currentLangugage = lang.toLowerCase();
        localStorage.setItem('appLanguage', lang);
    }
}

window.addEventListener('app-language', (e) => {
    MLHelper.updateLanguage(e.detail);
});

export const messages = {
    "tr": trMessages,
    "en": enMessages
};

export function getMessages(message) {

    const localeMessages = messages[MLHelper.currentLangugage] || messages['en-en'];
    return (localeMessages[message] || "") ;

}