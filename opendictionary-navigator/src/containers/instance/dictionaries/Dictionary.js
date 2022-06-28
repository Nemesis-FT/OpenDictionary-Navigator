import React, {useEffect, useState} from "react";
import {Box, Button, Dialog, Form, Heading, Image, Panel, Chapter} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {useHistory, useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useTranslation, Trans} from 'react-i18next';
import {faAdd, faPencil} from "@fortawesome/free-solid-svg-icons";

export default function Dictionary(props) {
    const {t, i18n} = useTranslation();
    const [visible, setVisible] = useState(false)
    const {userData} = useAppContext()
    return (
        <Panel>
            <Chapter style={{alignItems: "center"}}>

                    <Panel style={{minWidth: "unset"}}>{props.dictionary.name} ({props.dictionary.language})</Panel>
                {userData && userData.admin_of.length != 0 && (
                    <div>
                        <Button onClick={event => {
                            props.setId(props.dictionary.id);
                        }}><FontAwesomeIcon icon={faPencil}/></Button>
                    </div>
                )}
            </Chapter>

        </Panel>
    );
}