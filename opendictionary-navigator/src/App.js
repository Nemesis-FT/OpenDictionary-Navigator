import Routes from "./Routes";
import './App.css';
import {AppContext} from "./libs/Context"
import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from "react-router-dom";
import {Bluelib, Footer} from "@steffo/bluelib-react";
import {Button, Select, Panel, LayoutThreeCol} from "@steffo/bluelib-react";
import {useTranslation, Trans} from 'react-i18next';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLanguage} from "@fortawesome/free-solid-svg-icons";
import {Auth0Provider} from "@auth0/auth0-react";
import "./i18n"
import schema from "./containers/config";
import Modal from "./containers/components/Modal";

function App() {
    const history = useHistory();
    const [instanceIp, setInstanceIp] = useState("");
    const [userData, setUserData] = useState(null);
    const [instanceData, setInstanceData] = useState(null);
    const [connected, setConnected] = useState(false);
    const [token, setToken] = useState("")
    const [hidden, setHidden] = useState(true)
    const [language, setLanguage] = useState("en")
    const [mode, setMode] = useState("main");

    const {t, i18n} = useTranslation();
    const lngs = {
        en: {nativeName: 'English'},
        it: {nativeName: 'Italiano'}
    };

    useEffect(() => {
        onLoad();
    }, []);


    async function onLoad() {
        document.body.style = 'background: #161616;';
        let a = localStorage.getItem("lang")
        if (a) {
            await i18n.changeLanguage(a)
            setLanguage(a)
        } else {
            setLang("en")
        }
    }

    function setLang(lang) {
        i18n.changeLanguage(lang)
        localStorage.setItem("lang", lang)
        setLanguage(lang)
    }


    return (

            <Bluelib theme={"amber"} backgroundColor={"#161616"} accentColor={"#346751"} foregroundColor={"#ECDBBA"}>
                <LayoutThreeCol>
                    <LayoutThreeCol.Center>
                        <div className="App">
                            <AppContext.Provider value={{
                                instanceIp,
                                setInstanceIp,
                                connected,
                                setConnected,
                                token,
                                setToken,
                                instanceData,
                                setInstanceData,
                                userData,
                                setUserData,
                                mode,
                                setMode
                            }}>
                                <Routes/>


                            </AppContext.Provider>

                            <div className="Fermitech-Footer">
                                <div>
                                    <Button onClick={(e) => {
                                        setHidden(!hidden)
                                    }}><FontAwesomeIcon icon={faLanguage}/></Button>
                                    {hidden ? (<div></div>) : (<div>
                                        <Select onChange={e => setLang(e.target.value)} value={language}>
                                            {Object.keys(lngs).map((lng) => (
                                                <option value={lng}>
                                                    {lngs[lng].nativeName}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>)}

                                </div>
                                <Footer><p>{t('footer.line1')}</p> {t('footer.line2')} <a
                                    href={"https://github.com/Steffo99/bluelib-react"}>bluelib-react</a> {t('footer.line3')}
                                </Footer>
                            </div>
                        </div>
                    </LayoutThreeCol.Center>
                </LayoutThreeCol>
            </Bluelib>
    );
}

export default App;
