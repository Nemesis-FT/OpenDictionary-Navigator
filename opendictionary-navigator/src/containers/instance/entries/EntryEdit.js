import {Panel, Button, Heading, Chapter, Form} from "@steffo/bluelib-react";
import {useTranslation, Trans} from 'react-i18next';
import React, {useState} from "react";
import {faGlasses} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from "react-markdown";
import schema from "../../config";
import {useAppContext} from "../../../libs/Context";

export default function EntryEdit(props) {
    const {t, i18n} = useTranslation();
    const [visible, setVisible] = useState(false)
    const [def, setDef] = useState(props.entry.definition)
    const [ex, setEx] = useState(props.entry.examples)
    const [term, setTerm] = useState(props.entry.term)
    const {token, setToken} = useAppContext()
    const {instanceIp, setInstanceIp} = useAppContext()
    console.debug(props.entry.definition)
    console.debug(props.entry.examples)

    async function update(){
        try {
            const response = await fetch(schema + instanceIp + "/api/entry/v1/"+props.entry.id, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    term: term,
                    definition: def,
                    examples: ex,
                    dictionary_id: props.entry.dictionary_id
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
                <Heading level={1}>Editing {props.entry.term}</Heading>
                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setTerm(e)} value={term} required={true}
                                    placeholder={"..."} label={t("Term")}>
                        </Form.Field>
                    </Form.Row>
                </Form>
                <Heading level={3}>Definition</Heading>
                <MDEditor
                    value={def}
                    onChange={setDef}
                />
                <Heading level={3}>Examples</Heading>
                <MDEditor
                    value={ex}
                    onChange={setEx}
                />
            </Panel>
            <Button bluelibClassNames={"color-lime"} onClick={() => {update()}}>
                Update
            </Button>
        </div>
    )
        ;
}