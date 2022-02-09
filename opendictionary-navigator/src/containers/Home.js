import React from "react";
import Style from "./Home.module.css";
import {Heading, Image, Panel, LayoutThreeCol} from "@steffo/bluelib-react";
import ServerSelector from "./ServerSelector";

export default function Home() {
    return (
        <div className={Style.Home}>

            <div className={Style.lander} style={{minWidth: "unset"}}>
                <Image src={"logo192.png"} width={"92px"} height={"92px"}></Image>
                <Heading level={1}>OpenDictionary Navigator</Heading>
                <p className="text-muted"></p>

            </div>
            <Panel style={{minWidth: "unset"}}>
                <ServerSelector/>
            </Panel>
        </div>

    );
}