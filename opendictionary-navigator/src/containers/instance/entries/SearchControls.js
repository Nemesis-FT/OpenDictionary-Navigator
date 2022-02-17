import React, {useEffect, useState} from "react";
import {Box, Button, Dialog, Form, Heading, Image, Panel, Chapter} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {useHistory, useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useTranslation, Trans} from 'react-i18next';

import schema from "../../config";

export default function SearchControls(props) {
    const {t, i18n} = useTranslation();
    const [page, setPage] = useState(1);

    function change_page(increase) {
        if(increase){
            setPage(page+1);
        }
        else{
            setPage(page-1);
        }
        props.setPage(page)
    }

    return (
        <div>
            <Chapter>
                <div>
                <Button children={"<"} disabled={page - 1 <= 0} onClick={event => {change_page(false)}}/></div>
                <Panel style={{minWidth: "unset"}}>{page}</Panel>
                <div>
                <Button children={">"} disabled={page + 1 > props.maxPages} onClick={event => {change_page(true)}}/></div>
            </Chapter>
        </div>
    );
}