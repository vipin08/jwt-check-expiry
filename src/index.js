/**
 * @author Vipin Kumar, Parveen Kumar
 * @summary  Check JWT is expired or not
 * @description A global JWT validator utility check weather expired or not.
 * @public
 */

export default function isJwtTokenExpired(token, optionalKey=null) {
    if (typeof(token) !== 'string' || !token) throw new Error('Invalid JWT token');
    let IsJwtTokenExpired = false;
    const decodedToken =  decode(token);
    const currentTime = new Date().getTime()/1000;

    if (optionalKey === null)
        if (currentTime > decodedToken.payload.exp) IsJwtTokenExpired = true;
    else
        if (decodedToken.payload.hasOwnProperty(optionalKey))
            if (currentTime > decodedToken.payload.get(optionalKey)) IsJwtTokenExpired = true;
        else
            throw new Error('Invalid optionalKey');
    
    return IsJwtTokenExpired;
}

export const decode = (token) =>{
    let header = {};
    let payload = {};
    try{
        [ header, payload ] = token.split('.').map( (encoded_string,index) => index != 2 ? JSON.parse(atob(encoded_string)) : '{}' );
    }
    catch(err){
        throw new Error('Invalid JWT token');
    }
    return { header: header, payload: payload };
}