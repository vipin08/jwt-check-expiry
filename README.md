# jwt-check-expiry

## Purpose

Check weather JWT is expired in the client without requiring a secret.

## Installation

`npm i jwt-check-expiry`

or 

`yarn add jwt-check-expiry`


## Usage

```js
import { isJwtTokenExpired } from 'jwt-check-expiration';

console.log('isExpired is:', isJwtTokenExpired('JWT-token'));
```
