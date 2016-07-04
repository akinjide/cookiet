# Cookiet

*A small JavaScript cookies library.*


![Cookies Sketch](_static/multicookie-sketch.png)


## Note
**No jQuery needed.**

## Installation

## Usage
Once you have `cookiet`, you can use it to easily create a cookie by providing

#### cookiet.create([argsObject]);

```javascript
cookiet.create({
  name: 'hello', // Cookie name
  value: 'world', // Cookie value
  expire: 30, // Cookie will expire 30 days from creation date
  path: '/', // path for the website. '/' for the whole website. <Optional>
  domain: 'helloworld.com', // Locked to which domain <Optional>
  secure: true, // Use SSL, for website with SSL Certificate <Optional>
  httpOnly: false // Use httpOnly flag <Optional>
});
```

Note:
* (Optional) domain = ex: domain.com. If not set, it would be available for all subdomains.
* (Optional) secure = Use SSL while transferring cookie to server
* (Optional) httpOnly -  Using the HttpOnly flag when generating a cookie helps mitigate the risk of client side script accessing the protected cookie (if the browser supports it). (https://www.owasp.org/index.php/HttpOnly)


#### cookiet.read([argObject]);
```javascript
var cookie = cookiet.read({
  name: 'hello'
});

console.log(cookie) // world
```
Returns null if the cookies does not exist.


#### cookiet.listAsObject(void); Return all cookies.
```javascript
var cookies = cookiet.listAsObject();
console.log(cookies.name); // world
```

Returns a key-value hash of available cookies on the document.  If there are no available cookies, an empty hash is returned.


#### cookiet.listAsArray(void); Return all cookies.
```javascript
var cookies = cookiet.listAsArray();
console.log(cookies); // [["hello", "world"]]
```

Returns a 2-dimensional key-value array of available cookies on the document.  If there are no available cookies, an empty array is returned.


#### cookiet.listAsString(void); Return all cookies.
```javascript
var cookies = cookiet.listAsString();
console.log(cookies); // "0 hello=world"
```

Returns a index key-value string of available cookies on the document.  If there are no available cookies, an empty array is returned.


#### cookiet.keys(void); Return all cookie keys.
```javascript
var cookies = cookiet.keys();
console.log(cookies[0]); // ["hello"]
```

Returns an array of keys of set cookies. If no cookies have been set, returns an empty array.


#### cookiet.values(void); Return all cookie keys.
```javascript
var cookies = cookiet.values();
console.log(cookies[0]); // ["world"]
```

Returns an array of values of set cookies. If no cookies have been set, returns an empty array.


#### cookiet.exists([argObject]);
```javascript
var cookie = cookiet.exists({
  name: 'hello'
});
console.log(cookies[0]); // true
```

Returns true if `name` is the key of a cookie, otherwise returns false.


#### cookiet.remove([argsObject]);
```javascript
// {name: '', path: '', domain: ''}
cookiet.remove({
  name: 'mycookie',
  path: '/'
});
```

No return value.
