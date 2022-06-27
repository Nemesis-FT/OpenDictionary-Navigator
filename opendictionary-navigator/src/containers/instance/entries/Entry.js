import {Panel, Button, Chapter} from "@steffo/bluelib-react";
import {useTranslation, Trans} from 'react-i18next';
import React, {useEffect, useState} from "react";
import {faGlasses, faPencil, faShare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppContext} from "../../../libs/Context";
import schema from "../../config";
import MDEditor from '@uiw/react-md-editor';

export default function Entry(props) {
    const {t, i18n} = useTranslation();
    const [visible, setVisible] = useState(false)
    const {instanceIp, setInstanceIp} = useAppContext();
    const {userData, setUserData} = useAppContext();
    const [editable, setEditable] = useState(false);

    useEffect( () => {
            if(userData==null){
                return;
            }
            if(userData.admin_of.length!==0){
                setEditable(true)
            }
            else if(props.entry.author_id===userData.id){
                setEditable(true)
            }
        }
        , [userData])

    const data = {
        title: props.entry.term,
        text: props.entry.term,
        url: window.location.origin+"/od/"+instanceIp+"/t/"+props.entry.id
    }
    return (
        <Panel style={{minWidth: "unset"}}>
            {props.entry.term}
            <Panel style={{minWidth: "unset"}}>
                <MDEditor.Markdown source={props.entry.definition} style={{ whiteSpace: 'pre-wrap', background:"transparent"}} />
            </Panel>
            <Chapter>
                <div><Button onClick={event => {
                    props.setId(props.entry.id)
                }}><FontAwesomeIcon icon={faGlasses}/></Button></div>

                <div><Button onClick={event => {
                    navigator.share(data)
                }}><FontAwesomeIcon icon={faShare}/></Button></div>

            </Chapter>
            {userData ? (
                <Chapter>
                    <div><Button onClick={event => {
                        props.setId(props.entry.id); props.setEdit(true);
                    }}><FontAwesomeIcon icon={faPencil}/></Button></div>

                    <div><Button onClick={event => {
                        navigator.share(data)
                    }}><FontAwesomeIcon icon={faTrash}/></Button></div>
                </Chapter>
            ):(<div></div>)}
        </Panel>
    );
}