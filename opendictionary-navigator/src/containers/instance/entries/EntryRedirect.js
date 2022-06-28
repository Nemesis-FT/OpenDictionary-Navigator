import {Panel, Button, Heading, Chapter} from "@steffo/bluelib-react";
import {useTranslation, Trans} from 'react-i18next';
import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {useParams} from "react-router-dom";
import schema from "../../config";
import ProfileBadge from "../../components/ProfileBadge";
import EntryDetails from "./EntryDetails";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShare} from "@fortawesome/free-solid-svg-icons";

export default function EntryRedirect() {
    const {t, i18n} = useTranslation();
    const {url} = useParams();
    const {id} = useParams();
    const [entry, setEntry] = useState(null)

    useEffect( () => {
        (async () => {
            try {
                console.debug(schema + url + "/api/entry/v1/"+id)
                const response = await fetch(schema + url + "/api/entry/v1/"+id);
                setEntry(await response.json())
            } catch (e) {
                console.error(e);
            }

        })();}
    , [])
    return (
        <div>
            <br/>
            <a href={window.location.origin+"/od/"+url}> {t("dashboard.entry.conn")} </a>
            {entry ? (
                <Panel style={{minWidth: "unset"}}>
                    <Heading level={1}>{entry.term}</Heading>
                    <Panel style={{minWidth: "unset"}}>
                        <i>{entry.definition}</i>
                    </Panel>
                    <Panel>
                        <ReactMarkdown>{entry.examples}</ReactMarkdown>
                    </Panel>
                    <hr/>
                    <p>
                        {t("dashboard.entry.part")} {entry.dictionary.name} {t("dashboard.entry.for")} {entry.dictionary.language} {t("dashboard.entry.language")}.{" "}
                        {t("dashboard.entry.created")} {entry.author.username}.
                    </p>
                    <Chapter>
                        <div>
                            <Button onClick={event => {
                                navigator.share({
                                    title: entry.term,
                                    text: entry.definition,
                                    url: window.location.origin+"/od/"+url+"/t/"+entry.id
                                })
                            }}><FontAwesomeIcon icon={faShare}/></Button>
                        </div>
                    </Chapter>

                </Panel>
            ) : (
                <Panel>
                    {t("dashboard.entry.loading")}
                </Panel>
            )}
        </div>
    );
}