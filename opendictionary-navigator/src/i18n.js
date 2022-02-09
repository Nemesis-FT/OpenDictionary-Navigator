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
                        line1: "Condivisione and Condivisione-Navigator are constellation software created by Fermitech Softworks based on Gestione.",
                        line2: "Condivisione-Navigator uses",
                        line3: "developed by Steffo."
                    },
                    descriptions: {
                        line1: "Condivisione is the webapp that allows schools to coordinate free lessons among their students.",
                        blob: "The navigator allows you to explore the constellation of Consivisione instances, that belong to different schools. To connect, enter the Condivisione url of your school, or visit it directly. It is possible to add a Condivisione instance to the official constellation, hosted by the 'Planetarium' service."
                    },
                    buttons: {
                        connect: "Connect",
                        disconnect: "Disconnect",
                        login: "Login"
                    },
                    form_names: {
                        instance_address: "Instance address"
                    },
                    status_msgs: {
                        checking: "Checking..."
                    },
                    login_page: {
                        message: "To proceed, please provide your Condivisione credentials." +
                            " If you're not signed up, you can create an account for free.",
                        login_button: "Login",
                        legal_notice: "Sign up must be done by users older than 13. If the user is underage, this action must be approved by parent or tutor.",
                        labels: {
                            email: "Email",
                            password: "Password",
                            name: "Name",
                            surname: "Surname",
                            class_name: "Class number",
                            personal_email: "User's email",
                            parent_email: "Parent's email",
                            confirm_password: "Confirm password"
                        },
                        register_button: "Sign up",
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