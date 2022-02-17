import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    footer: {
                        line1: "OpenDictionary and OpenDictionary-Navigator are constellation software created by Fermitech Softworks based on Gestione.",
                        line2: "OpenDictionary-Navigator uses",
                        line3: "developed by Steffo."
                    },
                    root:{
                        descriptions: {
                            line1: "OpenDictionary Navigator is the webapp that allows you to explore self-hosted community dictionaries.",
                            blob: "In order to visit an instance, please provide its address. If an OpenDictionary server is listening on that url, it will be detected by the app."
                        },
                        form_names: {
                            instance_address: "Instance address"
                        },
                        status_msgs: {
                            checking: "Checking..."
                        },
                        buttons: {
                            connect: "Connect",
                        },
                    },
                    dashboard:{
                        entry:{
                            search: "Search by term",
                            search_label: "Term:",
                            loading: "Loading term definition...",
                            part: "Part of",
                            for: "for the",
                            language: "language",
                            created: "Created by "
                        },
                        button:{
                            search: "Search",
                            back: "Back to menu",
                        },
                        dictionaries:{
                            list: "Consult one of the dictionaries"
                        }
                    },
                    not_found: {
                        message1: "You've lost yourself while exploring the constellation.",
                        message2: "The navigator can't help you with finding something that does not exist.",
                        message3: "Head back to the start",
                    },
                    alerts:{
                        login_error: "Incorrect credentials.",
                        register_success: "Sign up successful.",
                    }

                }
            },
        }
    });

export default i18n;