import Routes from "./Routes";
import './App.css';
import {AppContext} from "./libs/Context"
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Bluelib, Footer} from "@steffo/bluelib-react";
import {Button, Select, Panel, LayoutThreeCol} from "@steffo/bluelib-react";
import {useTranslation, Trans} from 'react-i18next';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLanguage} from "@fortawesome/free-solid-svg-icons";
import "./i18n"

function App() {
    const [instanceIp, setInstanceIp] = useState("");
    const [user, setUser] = useState(null);
    const [instanceData, setInstanceData] = useState(null);
    const [connected, setConnected] = useState(false);
    const [token, setToken] = useState("")
    const [hidden, setHidden] = useState(true)
    const [language, setLanguage] = useState("en")
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const lngs = {
        en: {nativeName: 'English'},
        it: {nativeName: 'Italiano'}
    };
    useEffect(() => {
        onLoad();
    }, []);

    function onLoad() {
        if (localStorage.getItem("instanceIp") && history) {
            setInstanceIp(localStorage.getItem("instanceIp"))
            setConnected(true)
            history.push("/od/" + instanceIp)
        }
        let a = localStorage.getItem("lang")
        if (a) {
            i18n.changeLanguage(a)
            setLanguage(a)
        } else {
            setLang("en")
        }
        document.body.style = 'background: #112031;';
    }

    function setLang(lang) {
        i18n.changeLanguage(lang)
        localStorage.setItem("lang", lang)
        setLanguage(lang)
    }


    return (


        <Bluelib theme={"amber"} backgroundColor={"#112031"} accentColor={"#D4ECDD"} foregroundColor={"#93B5C6"}>
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
                        user,
                        setUser
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
