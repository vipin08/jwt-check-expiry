/**
 * @author Vipin Kumar, Parveen Kumar
 * @summary  Check JWT is expired or not
 * @description A global JWT validator utility check weather expired or not.
 * @public
 */

export default function isJwtTokenExpired(token, optionalKey = undefined) {
  if (typeof token !== 'string' || !token) throw new Error('Invalid JWT token');
  let IsJwtTokenExpired = false;
  const decodedToken = decode(token);
  const currentTime = new Date().getTime() / 1000;

  if (optionalKey)
    if (currentTime > decodedToken.payload.exp) IsJwtTokenExpired = true;
    else if (decodedToken.payload.hasOwnProperty(optionalKey))
      if (currentTime > decodedToken.payload.get(optionalKey)) IsJwtTokenExpired = true;
      else throw new Error('Invalid optionalKey');

  return IsJwtTokenExpired;
}

export function decode(token) {
  let header = {};
  let payload = {};
  try {
    [header, payload] = token
      .split('.')
      .map((encodedString, index) =>
        index !== 2 ? JSON.parse(atob(encodedString)) : '{}',
      );
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
  return { header, payload };
}
