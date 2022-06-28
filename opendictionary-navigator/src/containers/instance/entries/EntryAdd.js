import {Panel, Button, Heading, Select, Form} from "@steffo/bluelib-react";
import {useTranslation, Trans} from 'react-i18next';
import React, {useEffect, useState} from "react";
import {faGlasses} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from "react-markdown";
import schema from "../../config";
import {useAppContext} from "../../../libs/Context";
import Dictionary from "../dictionaries/Dictionary";

export default function EntryAdd() {
    const {t, i18n} = useTranslation();
    const [def, setDef] = useState("")
    const [ex, setEx] = useState("")
    const [term, setTerm] = useState("")
    const [dict, setDict] = useState(null)
    const [dictionaries, setDictionaries] = useState(null)
    const {token} = useAppContext()
    const {instanceIp} = useAppContext()
    const [options, setOptions] = useState({})

    useEffect(e => {
        load();
    }, [])

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
            let tmp = []
            values.forEach(e=>{
                tmp[e.name]=e.id;
            })
            setOptions(tmp)
        }
    }

    async function update(){
        try {
            const response = await fetch(schema + instanceIp + "/api/entry/v1/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    term: term,
                    definition: def,
                    examples: ex,
                    dictionary_id: dict
                })
            });
            let data = await response.json()
            console.debug(data)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <Panel style={{minWidth: "unset"}}>
                <Heading level={1}>{t("dashboard.entry.create")}</Heading>
                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setTerm(e)} value={term} required={true}
                                    placeholder={"..."} label={t("dashboard.entry.term")}>
                        </Form.Field>
                        <Form.Select onSimpleChange={e => {setDict(e); console.log(e);}} label={t("dashboard.entry.dictionary")} options={options}>

                        </Form.Select>
                    </Form.Row>

                </Form>
                <Heading level={3}>{t("dashboard.entry.definitions")}</Heading>
                <MDEditor
                    value={def}
                    onChange={setDef}
                />
                <Heading level={3}>{t("dashboard.entry.examples")}</Heading>
                <MDEditor
                    value={ex}
                    onChange={setEx}
                />
            </Panel>
            <Button bluelibClassNames={"color-lime"} onClick={() => {update()}}>
                {t("dashboard.entry.create_btn")}
            </Button>
        </div>
    )
        ;
}