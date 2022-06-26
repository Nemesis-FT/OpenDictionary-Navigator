import React, {useEffect, useState} from "react";
import {Panel, Button} from "@steffo/bluelib-react";
import {useAuth0} from "@auth0/auth0-react";
import schema from "../config";
import {useAppContext} from "../../libs/Context";


export default function ProfileBadge() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const {logout} = useAuth0();
    const {instanceIp, setInstanceIp} = useAppContext()
    const {token, setToken} = useAppContext();
    const {userData, setUserData} = useAppContext();

    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently({
                    audience: 'test',
                    scope: "openid email profile"
                });
                const response = await fetch(schema + instanceIp + "/api/user/v1/self", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(await response.json());
                setToken(token);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [getAccessTokenSilently]);


    if (isLoading) {
        return "";
    }

    return (
        isAuthenticated &&
        <Panel>
            <Panel>
                Logged in as {user.email}
            </Panel>
            <Button onClick={() => logout({returnTo: window.location.origin})}>
                Log Out
            </Button>
        </Panel>

    );
}