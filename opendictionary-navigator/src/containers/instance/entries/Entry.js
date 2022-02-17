import {Panel, Button} from "@steffo/bluelib-react";
import {useTranslation, Trans} from 'react-i18next';
import React, {useState} from "react";
import {faGlasses} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Entry(props) {
    const {t, i18n} = useTranslation();
    const [visible, setVisible] = useState(false)
    return (
        <Panel style={{minWidth: "unset"}}>
            {props.entry.term}
            <Panel style={{minWidth: "unset"}}>
                <i>{props.entry.definition}</i>
            </Panel>
            <Button onClick={event => {props.setId(props.entry.id)}}><FontAwesomeIcon icon={faGlasses}/></Button>
        </Panel>
    );
}