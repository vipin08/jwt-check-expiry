# jwt-check-expiry

## Purpose

Check weather JWT is expired in the client without requiring a secret.

## Installation

`npm i jwt-check-expiry`

or 

`yarn add jwt-check-expiry`


## Usage

```js
import isJwtTokenExpired, { decode } from 'jwt-check-expiry';

console.log('isExpired is:', isJwtTokenExpired('<your-jwt-token>'));

console.log('Decoded token :', decode('<your-jwt-token>'));

```
