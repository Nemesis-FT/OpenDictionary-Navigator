import React, {useEffect, useState} from "react";
import {Box, Button, Dialog, Form} from "@steffo/bluelib-react";
import {useAppContext} from "../libs/Context";
import {useHistory} from "react-router-dom";
import Style from "./ServerSelector.module.css"
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ServerFav from "./ServerFav";
import schema from "./config";
import {useTranslation, Trans} from 'react-i18next';

export default function ServerSelector() {
    const [address, setAddress] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const {connected, setConnected} = useAppContext();
    const {instanceIp, setInstanceIp} = useAppContext();
    const {instanceData, setInstanceData} = useAppContext();
    const [favList, setFavList] = useState([])
    const [hidden, setHidden] = useState(true)
    let history = useHistory();
    const {t, i18n} = useTranslation();


    useEffect(() => {
        conn_check()
    }, [address])

    useEffect(() => {
        if (localStorage.getItem("favs")) {
            let favs = JSON.parse(localStorage.getItem("favs"))
            console.debug(favs)
            if(favs.length===0){
                favs=null;
            }
            setFavList(favs)
        }

    }, [connected])


    async function conn_check() {
        if(address===""){
            setInstanceData(null)
            setIsValid(false);
            return;
        }
        setIsChecking(true);
        try {
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
                console.debug(values.server)
                setInstanceData(values)
                setIsChecking(false)
                setIsValid(true)

            } else {
                setIsChecking(false);
            }
        } catch (e) {
            setIsChecking(false);
        }

    }

    async function connect() {
        if (!isValid) {
            return
        }
        setInstanceIp(address)
        localStorage.setItem("instanceIp", address)
        setConnected(true)
        console.debug("Connecting... " + address)
        history.push("/od/" + address)
        localStorage.setItem("instanceIp", address);
    }

    return (
        <div>
            <Box style={{minWidth: "unset"}}>

                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setAddress(e)} value={address} required={true}
                                    placeholder={"opendictionary.site.org"} label={t("root.form_names.instance_address")} validity={isValid}>
                        </Form.Field>
                    </Form.Row>
                </Form>
                <Form.Row>
                    {isChecking ? (
                        <div>{t("root.status_msgs.checking")}</div>
                    ):(<div/>)}

                    {isValid ? (
                        <div>
                            <Dialog bluelibClassNames={"color-lime"} style={{minWidth: "unset"}}>
                                {instanceData.server.name}
                                <p> {instanceData.type} v. {instanceData.version} </p>
                            </Dialog>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}

                    <Button children={t("root.buttons.connect")} disabled={!isValid} onClick={e => connect()}>

                    </Button>
                </Form.Row>
            </Box>

            <Button onClick={(e) => {
                setHidden(!hidden)
            }}><FontAwesomeIcon icon={faQuestionCircle}/></Button>
            {hidden ? (<div></div>) : (
                <p>
                    {t("root.descriptions.blob")}
                </p>)}


                {favList ? (
                    <Box className={Style.Scrollable} style={{minWidth: "unset"}}>
                    <div>{favList.map(fav => <ServerFav fav={fav} setFav={setFavList} favList={favList}/>)}</div>
                    </Box>
                ) : (
                   <div/>
                )}
        </div>
    );
}