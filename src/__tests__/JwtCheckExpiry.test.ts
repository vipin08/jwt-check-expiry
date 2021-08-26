import isJwtTokenExpired, { decode } from '../index';

const validToken: string =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTYyOTI4NTczMiwiZXhwIjoyNTI5Mjg5MzMyfQ==.LaV1duyFh0S7raWFDU73p9RNaMP044sBAQoUZx1D79Y';
const validTokenWithOptionKey: string =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTYyOTI4NTczMiwidG9rZW5fZXhwIjoyNTI5Mjg5MzMyfQ==.LaV1duyFh0S7raWFDU73p9RNaMP044sBAQoUZx1D79Y'; 
const expiredTokenWithOptionKey: string =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTYyOTI4NTczMiwidG9rZW5fZXhwIjoxNTI5Mjg5MzMyfQ==.LaV1duyFh0S7raWFDU73p9RNaMP044sBAQoUZx1D79Y';   
const invalidToken: string = 'invalid.token.jwt';
const validTokenExpectedResponse = {
  payload: {
    sub: '1234567890',
    name: 'John Doe',
    admin: true,
    iat: 1629285732,
    exp: 2529289332,
  },
  header: {
    typ: 'JWT',
    alg: 'HS256',
  },
};

test('Check Token Expiration', () => {
  let isExpired = isJwtTokenExpired(validToken);
  expect(isExpired).toBe(false);
});

test('Check Token Expiration With Optional Key', () => {
  let isExpired = isJwtTokenExpired(validTokenWithOptionKey,'token_exp');
  expect(isExpired).toBe(false);
});

test('Check Token Expiration With Optional Key Without Passing OptionKey Name as Parameter', () => {
  let isExpired = isJwtTokenExpired(validTokenWithOptionKey);
  expect(isExpired).toBe(true);
});

test('Check Expired Token Expiration With Optional Key', () => {
  let isExpired = isJwtTokenExpired(expiredTokenWithOptionKey, 'token_exp');
  expect(isExpired).toBe(true);
});

test('Check If Token Is Empty String', () => {
  let haveException = false;
  try {
    isJwtTokenExpired('');
  } catch (err) {
    haveException = true;
  }
  expect(haveException).toBe(true);
});

test('Check Valid Token Validation', () => {
  // For Valid token
  let haveException = false;
  try {
    decode(validToken);
  } catch (err) {
    haveException = true;
    console.log(err);
  }
  expect(haveException).toBe(false);
});

test('Check Token Validation', () => {
  // For Valid token
  let haveException = false;
  try {
    decode(invalidToken);
  } catch (err) {
    haveException = true;
  }
  expect(haveException).toBe(true);
});

test('Check Decoded Token values', () => {
  let decodedToken = decode(validToken);
  expect(decodedToken.payload.sub).toBe(validTokenExpectedResponse.payload.sub);
  expect(decodedToken.payload.name).toBe(validTokenExpectedResponse.payload.name);
  expect(decodedToken.payload.admin).toBe(validTokenExpectedResponse.payload.admin);
  expect(decodedToken.payload.iat).toBe(validTokenExpectedResponse.payload.iat);
  expect(decodedToken.payload.exp).toBe(validTokenExpectedResponse.payload.exp);
  expect(decodedToken.header.alg).toBe(validTokenExpectedResponse.header.alg);
  expect(decodedToken.header.typ).toBe(validTokenExpectedResponse.header.typ);
});
