import { TOKEN } from "./constants";
import  jwt_decode  from "jwt-decode";

export function setToken(token){
    localStorage.setItem(TOKEN, token);
}

export function getToken(){
    return localStorage.getItem(TOKEN)
}

export function decodeToken(token){
    return jwt_decode(token);
}