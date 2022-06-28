import {Panel, Button, Heading, Chapter, Form} from "@steffo/bluelib-react";
import {useTranslation, Trans} from 'react-i18next';
import React, {useEffect, useState} from "react";
import {faGlasses} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from "react-markdown";
import schema from "../../config";
import {useAppContext} from "../../../libs/Context";

export default function DictionaryEditor(props) {
    const {t, i18n} = useTranslation();
    const [name, setName] = useState(" ")
    const [lang, setLang] = useState(" ")
    const {token, setToken} = useAppContext()
    const {instanceIp, setInstanceIp} = useAppContext()

    useEffect(e=>{
        if(props.dictionary!=null) {
            setName(props.dictionary.name)
            setLang(props.dictionary.language)
            console.debug(props.dictionary)
        }
        else{
            setName("")
            setLang("")
        }
    }, [props])

    async function update() {
        try {
            let method = "POST"
            let id = ""
            if(props.mode === "edit"){
                method = "PUT"
                id = props.dictionary.id
            }
            const response = await fetch(schema + instanceIp + "/api/dictionary/v1/" + id , {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    language: lang,
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
                {props.mode === "edit" && (
                    <div>
                    <Heading level={1}>Editing {props.dictionary.name}</Heading>

                </div>)
                }
                {props.mode === "create" && (
                    <div>
                        <Heading level={1}>Create new dictionary</Heading>
                    </div>)
                }
                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setName(e)} value={name} required={true}
                                    placeholder={"..."} label={t("Name")}>
                        </Form.Field>
                        <Form.Field onSimpleChange={e => setLang(e)} value={lang} required={true}
                                    placeholder={"..."} label={t("Language")}>
                        </Form.Field>
                    </Form.Row>
                </Form>
            </Panel>
            <Button bluelibClassNames={"color-lime"} onClick={() => {
                update()
            }}>
                {props.mode === "edit" && ("Update")}
                {props.mode === "create" && ("Create")}
            </Button>
        </div>
    )
        ;
}