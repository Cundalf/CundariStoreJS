/**
 * Se utiliza para migrar los articulos desde la API publica.
 */

import React, { useState, useEffect } from "react";
import { getProducts } from "../Services/ItemsServices";
import firebase from "../Config/Firebase";

function Migrate() {
    const [msg, setMSG] = useState("");

    useEffect(
        () => {
            async function request() {
                const { data } = await getProducts();
                data.map(async product => {
                    console.log(product);
                    await firebase.db.collection("productos").add(product);
                });

                setMSG("Migracion finalizada");
            }
            request();
        },
        []
    );

    return (
        <div>
            {msg}
        </div>
    );
}

export default Migrate;