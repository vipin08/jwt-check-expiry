import isJwtTokenExpired, { decode }  from './index';

if(window){
    (window as any).JwtHelper = {isJwtTokenExpired,decode};
}