# Coding with visibility fasten development speed.

> Sometime just `console.log` isn't enough to see a lot of JSON response

presenting *Code Print* to make more visibility on not just code but data also

## installation

    yarn add react-code-print


```ts
import {Code} from "react-code-print"

const person = {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
});


<Code value={{ person }} />

```

![React Code Print](https://github.com/md-adil/react-components/blob/master/assets/person-code-print.png?raw=true)
