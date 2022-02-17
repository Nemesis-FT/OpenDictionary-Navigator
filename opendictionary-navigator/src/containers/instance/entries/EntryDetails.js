import {Panel, Button, Heading, Chapter} from "@steffo/bluelib-react";
import {useTranslation, Trans} from 'react-i18next';
import React, {useState} from "react";
import {faGlasses} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";

export default function EntryDetails(props) {
    const {t, i18n} = useTranslation();
    const [visible, setVisible] = useState(false)
    return (
        <Panel style={{minWidth: "unset"}}>
            <Heading level={1}>{props.entry.term}</Heading>
            <Panel style={{minWidth: "unset"}}>
                <i>{props.entry.definition}</i>
            </Panel>
            <Panel>
                <ReactMarkdown>{props.entry.examples}</ReactMarkdown>
            </Panel>
            <hr/>
            <p>
                {t("dashboard.entry.part")} {props.entry.dictionary.name} {t("dashboard.entry.for")} {props.entry.dictionary.language} {t("dashboard.entry.language")}.
                {t("dashboard.entry.created")} {props.entry.author.username}.
            </p>

        </Panel>
    );
}