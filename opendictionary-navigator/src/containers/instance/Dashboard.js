import React, {useEffect, useState} from "react";
import {Box, Button, Dialog, Form, Heading, Image, Chapter} from "@steffo/bluelib-react";
import {useAppContext} from "../../libs/Context";
import {useHistory, useParams} from "react-router-dom";
import Style from "./Dashboard.module.css"
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useTranslation, Trans} from 'react-i18next';
import Dictionary from "./dictionaries/Dictionary";
import schema from "../config";
import Dictionaries from "./dictionaries/Dictionaries";
import EntrySearcher from "./entries/EntrySearcher";
import {Auth0Context, useAuth0} from "@auth0/auth0-react";
import ProfileBadge from "../components/ProfileBadge";


export default function Dashboard() {
    const {t} = useTranslation();
    const {url} = useParams();
    const {instanceData, setInstanceData} = useAppContext()
    const {instanceIp, setInstanceIp} = useAppContext()
    const {mode, setMode} = useAppContext()
    const {loginWithRedirect, user, isAuthenticated, } = useAuth0();

    useEffect(() => {
        setInstanceIp(url)
        get_server_data(url)
    }, [])

    async function get_server_data(address) {
        const response = await fetch(schema + address + "/api/server/v1/planetarium", {
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
            setInstanceData(values)
        }
    }

    return (
        <div>
            {instanceData ? (

                    <div className={Style.top}>
                        <div style={{minWidth: "unset"}}>
                            {instanceData.server.logo_uri !== "" && (
                                <Image src={url} width={"92px"} height={"92px"}></Image>
                            )}
                            <Heading level={1}>{instanceData.server.name}</Heading>
                            <p className="text-muted">
                                {instanceData.server.motd}
                            </p>
                            {!isAuthenticated  && (
                                <Button onClick={()=>loginWithRedirect()}>Login</Button>)}
                            <ProfileBadge/>
                        </div>
                        {mode !== "main" && (
                            <Button onClick={event => {
                                setMode("main")
                            }}>{t("dashboard.button.back")}</Button>
                        )}
                        {mode !== "dictionary" && (
                            <EntrySearcher setMode={setMode} mode={mode}/>
                        )}
                        {mode !== "search" && (
                            <Dictionaries/>
                        )}
                        {mode !== "main" && (
                            <Button onClick={event => {
                                setMode("main")
                            }}>{t("dashboard.button.back")}</Button>
                        )}
                    </div>
            ) : (
                <div/>
            )}
            <br/>
        </div>
    );
}