# OrgSync Logger Node

A simple logging utility for OrgSync's node services.

### Install

```bash
npm install orgsync-logger
```

### Usage

```js
var log = require('orgsync-logger');

log.configure({
  name: 'my-app',
  colors: true, // forced to `false` when `dir` is set
  level: 'info',
  metrics: true,
  dir: 'log' // absolute, or relative to command CWD, or falsey for stdout
});
```

### Test

```bash
npm test
```
