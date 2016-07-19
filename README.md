Tokenized
=========

Easily create and manage a bucket of tokens

## Package Dependencies
* lodash

## Usage
`npm install --save tokenized`

## Methods

### constructor
Add a token or array of tokens to your bucket when you instantiate it
```javascript
let bucket = new TokenBucket('single-token')
// or
let bucket = new TokenBucket(['token-one','token-two','token-three'])
```
The constructor will accept a single token or an array of tokens.  You can also instantiate
the `TokenBucket` class without a token if you do not have/need one right away.

### addToken(token)
Adds a `token` to your bucket
```javascript
bucket.addToken('single-token')
```
### getToken()
Retrieves a token from your bucket
```javascript
let token = bucket.getToken()
If no tokens are available, `token` will be `null`

### addTokenAtInterval(token, [interval], [intervalValue])
Adds `token` to your bucket at a regular `interval`
```javascript
bucket.addTokenAtInterval('auto-token', 5, 'seconds')
```
* token => your token to add to the bucket
* interval => **default 1** (number) the frequency to add this token to the bucket
* intervalValue => **default ms** (string) value of the frequency number. options are:
`ms / milliseconds` => milliseconds
`s / seconds` => seconds
`m / minutes` => minutes
`h / hours` => hours
`d / days` => days

### stopAddingToken(token)
Stops the automatic adding of `token` that was started by using `addTokenAtInterval`
```javascript
TokenBucket.stopAddingToken('auto-token')
```

## Properties

### limit
Set a limit for the number of tokens in your bucket at any one time.  No tokens will be added above the limit.