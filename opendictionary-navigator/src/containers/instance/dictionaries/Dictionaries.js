import React, {useEffect, useState} from "react";
import {Chapter, Heading} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {useHistory, useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useTranslation, Trans} from 'react-i18next';
import schema from "../../config";
import Dictionary from "./Dictionary";
import Style from "../../ServerSelector.module.css";
import ServerFav from "../../ServerFav";

export default function Dictionaries() {
    const {t, i18n} = useTranslation();
    const {url} = useParams();
    const {instanceIp, setInstanceIp} = useAppContext()
    const [dictionaries, setDictionaries] = useState(null)

    useEffect(() => {
        load()
    }, [])

    async function load(){
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
        }
    }

    return (
        <div>
            <Heading level={3}>{t("dashboard.dictionaries.list")}</Heading>
            {dictionaries ? (
                    <Chapter>{dictionaries.map(dict => <Dictionary dictionary={dict} key={dict.id}/>)}</Chapter>
            ) : (
                <div>{t("dashboard.dictionaries.no_dicts")}</div>
            )}

        </div>
    );
}