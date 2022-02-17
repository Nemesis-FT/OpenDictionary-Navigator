import React, {useEffect} from "react";
import Style from "./Home.module.css";
import {Heading, Image, Panel, LayoutThreeCol} from "@steffo/bluelib-react";
import ServerSelector from "./ServerSelector";
import {useTranslation, Trans} from 'react-i18next';
import schema from "./config";
import {useHistory} from "react-router-dom";
import {useAppContext} from "../libs/Context";

export default function Home() {
    const {t, i18n} = useTranslation();
    const history = useHistory()
    const {instanceData, setInstanceData} = useAppContext();
    const {instanceIp, setInstanceIp} = useAppContext();
    const {connected, setConnected} = useAppContext();

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

    useEffect(() => {
        if (localStorage.getItem("instanceIp")) {
            let address = localStorage.getItem("instanceIp")
            setInstanceIp(address)
            setConnected(true)
            get_server_data(address)
            history.push("/od/"+address)
        }
    }, [])

    return (
        <div className={Style.Home}>

            <div className={Style.lander} style={{minWidth: "unset"}}>
                <Image src={"logo.svg"} width={"92px"} height={"92px"}/>
                <Heading level={1}>OpenDictionary Navigator</Heading>
                <p className="text-muted">
                    {t("root.descriptions.line1")}
                </p>

            </div>
            <Panel style={{minWidth: "unset"}}>
                <ServerSelector/>
            </Panel>
        </div>

    );
}