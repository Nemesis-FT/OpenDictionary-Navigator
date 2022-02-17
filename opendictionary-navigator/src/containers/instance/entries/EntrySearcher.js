import React, {useEffect, useState} from "react";
import {Box, Button, Chapter, Dialog, Form, Heading, Image, Panel} from "@steffo/bluelib-react";
import {useAppContext} from "../../../libs/Context";
import {useTranslation, Trans} from 'react-i18next';

import schema from "../../config";
import SearchControls from "./SearchControls";
import Dictionary from "../dictionaries/Dictionary";
import Entry from "./Entry";
import Modal from "../../components/Modal";
import EntryDetails from "./EntryDetails";

export default function EntrySearcher(props) {
    const {t, i18n} = useTranslation();
    const {instanceData, setInstanceData} = useAppContext()
    const {instanceIp, setInstanceIp} = useAppContext()
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(50)
    const [maxPages, setMaxPages] = useState(null)
    const [results, setResults] = useState(null)
    const [enabled, setEnabled] = useState(false)
    const [show, setShow] = useState(false)
    const [id, setId] = useState(null)
    const [entry, setEntry] = useState(null)

    useEffect(() => {
        if (enabled) {
            seek()
        }
    }, [page])

    useEffect(() =>{
        if(id!==null){
            lookup()
            setShow(true)
        }
    }, [id])

    useEffect(() => {
        if(props.mode!=="search"){
            setSearch("")
        }
    }, [props.mode])

    function cleanup(){
        setShow(false);
        setId(null);
    }

    async function seek() {
        console.debug(search)
        const response = await fetch(schema + instanceIp + `/api/entry/v1/search?query=${search}&page=${page}&size=${size}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.DOMAIN
            }
        });
        if (response.status === 200) {
            let values = await response.json()
            setResults(values.items)
        }
    }

    async function search_start(){
        props.setMode("search")
        await seek()
    }

    async function lookup(){
        const response = await fetch(schema + instanceIp + `/api/entry/v1/${id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.DOMAIN
            }
        });
        if (response.status === 200) {
            let values = await response.json()
            setEntry(values)
        }
    }

    return (
        <div>
            <Heading level={3}>{t("dashboard.entry.search")}</Heading>
            <Panel>

                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setSearch(e)} value={search} required={true}
                                    label={t("dashboard.entry.search_label")}>
                        </Form.Field>
                    </Form.Row>
                </Form>
                <br/>
                <Button onClick={event => {
                    search_start()
                }}>{t("dashboard.button.search")}</Button>
            </Panel>
            <div>
                {results && props.mode==="search" ? (
                    <div>
                        <SearchControls maxPages={maxPages} setPage={setPage} page={page}/>
                        <Chapter>{results.map(result => <Entry entry={result} setId={setId} key={result.id}/>)}</Chapter>
                    </div>

                ) : (
                    <div/>
                )}
            </div>
            <Modal show={show} onClose={()=>{cleanup()}}>
                {entry ? (
                    <EntryDetails entry={entry}/>
                ) : (
                    <Panel>
                        {t("dashboard.entry.loading")}
                    </Panel>
                )}

            </Modal>
        </div>
    );
}