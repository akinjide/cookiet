## Getting started

## Note
**No jQuery needed.**


## Installation

### Direct download

```javascript
<script src="/path/to/js.cookiet.min.js"></script>
```

### Source Download

``` console
$ git clone git@github.com:akinjide/cookiet.git
```

Once you have `cookiet`, you can use it to easily create a cookie by providing

#### `create` 

Create a cookie, valid across the entire site, that expires 30 days from now.

```javascript
cookiet.create({
  name: 'hello', // name
  value: 'world', // value
  expire: 30, // expires 30 days from creation date
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


#### `read` 

```javascript
var cookie = cookiet.read({
  name: 'hello'
});

console.log(cookie) // world
```

Returns null if the cookies does not exist.


#### `keys` 

```javascript
var cookies = cookiet.keys();
console.log(cookies[0]); 

// ["hello"]
```

Returns an array of keys of set cookies. If no cookies have been set, returns an empty array.


#### `values`

```javascript
var cookies = cookiet.values();
console.log(cookies[0]); 

// ["world"]
```

Returns an array of values of set cookies. If no cookies have been set, returns an empty array.


#### `exists` 

```javascript
var cookie = cookiet.exists({
  name: 'hello'
});

console.log(cookies[0]); // true
```

Returns true if `name` is the key of a cookie, otherwise returns false.


#### `listAsObject` 

```javascript
var cookies = cookiet.listAsObject();
console.log(cookies); 

// { hello: "world" }
```

Returns a key-value hash of available cookies on the document. If there are no available cookies, an empty hash is returned.


#### `listAsString`

```javascript
var cookies = cookiet.listAsString();
console.log(cookies); 

// "0 hello=world"
```

Returns a index key-value string of available cookies on the document. If there are no available cookies, an empty array is returned.


#### `listAsArray`

```javascript
var cookies = cookiet.listAsArray();
console.log(cookies); 

// [{ hello: "world" }]
```

Returns a key-value hash array of available cookies on the document. If there are no available cookies, an empty array is returned.


#### `listAs2dArray`

```javascript
var cookies = cookiet.listAs2dArray();
console.log(cookies); 

// [["hello", "world"]]
```

Returns a 2-dimensional key-value array of available cookies on the document. If there are no available cookies, an empty array is returned.


#### `remove`

```javascript
// {name: '', path: '', domain: ''}
cookiet.remove({
  name: 'hello',
  path: '/'
});
```

No return value.


#### `clear`

```javascript
cookiet.clear({
  name: 'hello', // ['hello']
});
```

No return value.


#### `enabled`

```javascript
console.log(cookiet.enabled()); 

// true
```

Returns true if cookie is `enabled` or supported, otherwise returns false.


#### `length`

```javascript
console.log(cookiet.length); 

// 1
```

Returns length of cookies.


#### `help`

```javascript
console.log(cookiet.help); 

// ["read", "create", "keys", "values", "exists", "listAsString", "listAsObject", "listAsArray", "listAs2dArray", "remove", "clear", "enabled", "length", "help", "VERSION"]
```

Returns all methods supported.


#### `VERSION`

```javascript
console.log(cookiet.length); 

// 1.2
```

Returns cookiet version number.

