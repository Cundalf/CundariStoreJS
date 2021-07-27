import instance from "../Config/Axios";
import firebase from "../Config/Firebase";

// Funcion vieja
export function getProducts(query = "") {
    return instance.get("items" + query);
}

// Firebase
export async function getProduct(id) {
    try {
        let product = await firebase.db.doc("productos/" + id).get();
        return product;
    } catch (e) {
        console.log("error", e);
        return null;
    }
}

export async function getAllProducts(order = 'id') {
    try {
        let products = await firebase.db.collection("productos").orderBy(order).get();
        return products.docs;
    } catch (e) {
        console.log("error", e);
        return null;
    }
}

export async function getTopProduct() {
    try {
        let products = await firebase.db.collection("productos").get();
        return products.docs[0];
    } catch (e) {
        console.log("error", e);
        return null;
    }
}