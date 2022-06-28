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
                            created: "Created by ",
                            create: "Add new entry",
                            definition: "Definition",
                            term: "Term",
                            dictionary: "Dictionary",
                            examples: "Examples",
                            create_btn: "Create entry",
                            edit: "Editing ",
                            update_btn: "Update entry",
                            conn: "Connect to the instance",

                        },
                        button:{
                            search: "Search",
                            back: "Back to menu",
                        },
                        dictionaries:{
                            list: "Available dictionaries",
                            edit: "Editing ",
                            create: "Create a new dictionary",
                            name: "Name",
                            language: "Language",
                            update_btn: "Update dictionary",
                            create_btn: "Create dictionary"
                        },
                        account:{
                            login: "Logged in as ",
                            logout: "Logout"
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
            it: {
                translation: {
                    footer: {
                        line1: "OpenDictionary e OpenDictionary-Navigator sono software a costellazione creati da Fermitech Softworks sulla base di Gestione.",
                        line2: "OpenDictionary-Navigator utilizza",
                        line3: "sviluppata da Steffo."
                    },
                    root:{
                        descriptions: {
                            line1: "OpenDictionary Navigator è la webapp che ti fa esplorare dizionari personali.",
                            blob: "Per visitare un'istanza, fornisci un indirizzo valido. Se a quell'indirizzo è attiva un'istanza di OpenDictionary, l'applicazione ti consentirà di connetterti ad essa."
                        },
                        form_names: {
                            instance_address: "Indirizzo istanza"
                        },
                        status_msgs: {
                            checking: "Verifica..."
                        },
                        buttons: {
                            connect: "Connettiti",
                        },
                    },
                    dashboard:{
                        entry:{
                            search: "Cerca per termine",
                            search_label: "Termine:",
                            loading: "Caricamento della definizione ...",
                            part: "Elemento del",
                            for: "per il",
                            language: "",
                            created: "Creato da ",
                            create: "Aggiungi un nuovo termine",
                            definition: "Definizione",
                            term: "Termine",
                            dictionary: "Dizionario",
                            examples: "Esempi",
                            create_btn: "Conia termine",
                            edit: "Modifica di ",
                            update_btn: "Aggiorna termine",
                            conn: "Collegati all'istanza",

                        },
                        button:{
                            search: "Cerca",
                            back: "Torna al menu",
                        },
                        dictionaries:{
                            list: "Dizionari disponibili",
                            edit: "Modifica di ",
                            create: "Crea un nuovo dizionario",
                            name: "Nome",
                            language: "Lingua",
                            update_btn: "Aggiorna dizionario",
                            create_btn: "Crea dizionario"
                        },
                        account:{
                            login: "Accesso eseguito con ",
                            logout: "Logout"
                        }
                    },
                    not_found: {
                        message1: "Durante la tua esplorazione della costellazione ti sei perso.",
                        message2: "Il navigatore non può aiutarti a trovare qualcosa che non esiste.",
                        message3: "Torna all'inizio.",
                    },
                    alerts:{
                        login_error: "Credenziali errate.",
                        register_success: "Registrazione completata.",
                    }

                }
            },
        }
    });

export default i18n;