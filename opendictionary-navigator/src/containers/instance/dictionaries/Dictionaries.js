import React, {useEffect, useState} from "react";
import {Button, Chapter, Heading, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {useHistory, useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useTranslation, Trans} from 'react-i18next';
import schema from "../../config";
import Dictionary from "./Dictionary";
import Style from "../../ServerSelector.module.css";
import ServerFav from "../../ServerFav";
import {faAdd, faShare} from "@fortawesome/free-solid-svg-icons";
import EntryEdit from "../entries/EntryEdit";
import Modal from "../../components/Modal";
import DictionaryEditor from "./DictionaryEditor";

export default function Dictionaries() {
    const {t, i18n} = useTranslation();
    const {url} = useParams();
    const {instanceIp, setInstanceIp} = useAppContext()
    const [dictionaries, setDictionaries] = useState(null)
    const {userData, setUserData} = useAppContext()
    const [editor, setEditor] = useState(false)
    const [id, setId] = useState(null)
    const [mode, setMode] = useState("create")
    const [target, setTarget] = useState(null);

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if(id!==null){
            setEditor(true)
            let d = null;
            dictionaries.forEach(element=>{
                if(element.id===id){
                    d = element;
                    return;
                }
            })
            setTarget(d)
            setMode("edit")
        }
    }, [id])

    function cleanup(){
        setEditor(false);
        setMode("create")
        setId(null);
        setTarget(null);

    }

    async function load() {
        const response = await fetch(schema + instanceIp + "/api/dictionary/v1/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.DOMAIN
            },
        });
        if (response.status === 200) {
            let values = await response.json()
            setDictionaries(values)
            console.debug(values)
        }
    }

    return (
        <div>
            <Heading level={3}>{t("dashboard.dictionaries.list")}</Heading>
            <Panel style={{minWidth: "unset"}}>
            {dictionaries ? (
                <div>{dictionaries.map(dict => <Dictionary dictionary={dict} key={dict.id} setId={setId}/>)}</div>
            ) : (
                <div>{t("dashboard.dictionaries.no_dicts")}</div>
            )}
            {userData && userData.admin_of.length != 0 && (
                <Button onClick={event => {
                    setEditor(true);
                }}><FontAwesomeIcon icon={faAdd}/></Button>
            )}
            </Panel>
            <Modal show={editor} onClose={()=>{cleanup()}}>
                <DictionaryEditor dictionary={target} mode={mode}/>

            </Modal>
        </div>
    );
}