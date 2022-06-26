import {Panel, Button, Chapter} from "@steffo/bluelib-react";
import {useTranslation, Trans} from 'react-i18next';
import React, {useState} from "react";
import {faGlasses, faShare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppContext} from "../../../libs/Context";

export default function Entry(props) {
    const {t, i18n} = useTranslation();
    const [visible, setVisible] = useState(false)
    const {instanceIp, setInstanceIp} = useAppContext();
    const data = {
        title: props.entry.term,
        text: props.entry.definition,
        url: window.location.origin+"/od/"+instanceIp+"/t/"+props.entry.id
    }
    return (
        <Panel style={{minWidth: "unset"}}>
            {props.entry.term}
            <Panel style={{minWidth: "unset"}}>
                <i>{props.entry.definition}</i>
            </Panel>
            <Chapter>
                <div><Button onClick={event => {
                    props.setId(props.entry.id)
                }}><FontAwesomeIcon icon={faGlasses}/></Button></div>

                <div><Button onClick={event => {
                    navigator.share(data)
                }}><FontAwesomeIcon icon={faShare}/></Button></div>
            </Chapter>
        </Panel>
    );
}