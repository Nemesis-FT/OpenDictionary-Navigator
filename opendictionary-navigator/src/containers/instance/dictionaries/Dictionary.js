import React, {useEffect, useState} from "react";
import {Box, Button, Dialog, Form, Heading, Image, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {useHistory, useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useTranslation, Trans} from 'react-i18next';

export default function Dictionary(props) {
    const {t, i18n} = useTranslation();
    const [visible, setVisible] = useState(false)
    return (
        <Panel style={{minWidth: "unset"}}>
            {props.dictionary.name}
            <Panel style={{minWidth: "unset"}}>
                {props.dictionary.language}
            </Panel>

        </Panel>
    );
}