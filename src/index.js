/**
 * @author Vipin Kumar
 * @summary  Check JWT is expired or not
 * @description A global JWT validator utility check weather expired or not.
 * @public
 */

import jwt_decode from "jwt-decode";

export default function isJwtTokenExpired(token, optionalKey=null) {
    if (typeof(token) !== 'string' || !token) throw new Error('Invalid JWT token');

    let IsJwtTokenExpired = false;
    const decode = jwt_decode(token);
    const currentTime = new Date().getTime()/1000;

    if (optionalKey === null)
        if (currentTime > decode.exp) IsJwtTokenExpired = true;
    else
        if (decode.hasOwnProperty(optionalKey))
            if (currentTime > decode.get(optionalKey)) IsJwtTokenExpired = true;
        else
            throw new Error('Invalid optionalKey');
    
    return IsJwtTokenExpired;
}