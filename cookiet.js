/*global define:{}*/
(function (document, window) {
  'use strict';

  /** @param {String}  */
  function encode(value) { return encodeURIComponent(value); }

  /** @param {String}  */
  function decode(value) { return decodeURIComponent(value); }

  /** @param  {Array} @return {Boolean} */
  function isArray(value) { return value instanceof Array; }


  /**
   * [cookiet A small, simple JavaScript cookies library.
   *          Akinjide Bankole <https://www.akinjide.me>.
   *          Released under the MIT license
   * ]
   *
   * @type {Object}
   */
  var cookiet = {
    /**
     * Get a cookie value.
     *
     * @param  {Object} params
     * @param  {String} params.name  cookie name or key.
     * @return {String} Cookie value.
     */
    read: function(params) {
      var name = params.name;

      if (!name) return;

      var parts = document.cookie.split(name + '=');

      if (parts.length === 2) return decode(parts.pop().split(';').shift());

      // Force a return of undefined if not found
      return;
    },

    /**
     * Set cookie.
     *
     * @param  {Object} params
     * @param  {String} params.name    cookie name or key.
     * @param  {String} params.value   cookie value.
     * @param  {Number} params.exdays  cookie expires (days)
     * @param  {String} params.path    <Optional> set path. '/' the whole website.
     * @param  {String} params.domain  <Optional> set domain.
     * @param  {String} params.secure  <Optional> Use SSL when sending the cookie
                                        to the server.
     * @param  {String} params.httpOnly  <Optional> Using the HttpOnly flag when
                                         generating a cookie helps mitigate the
                                         risk of client side script accessing the
                                         protected cookie (if the browser supports it).
                                        (https://www.owasp.org/index.php/HttpOnly)
     * @return {Boolean}  True if successful.
     */
    create: function(params) {
      params.name   = params.name   || false;
      params.value  = params.value  || '';
      params.expires = params.expires || false;
      params.path   = params.path   || '/';

      if (params.name) {
        var cookie = encode(params.name) + '=' + encode(params.value) + ';';
        var path    = 'path=' + params.path + ';';
        var domain  = params.domain ? 'domain=' + params.domain + ';' : '';
        var secure  = params.secure ? 'secure;' : '';
        var httpOnly  = params.httpOnly ? 'httpOnly;' : '';
        var expires = '';

        if (params.expires) {
          // using "expires" because IE doesn't support "max-age".
          params.expires = new Date(new Date().getTime() +
            parseInt(params.expires, 10) * 1000 * 60 * 60 * 24);
          expires = 'expires=' + params.expires.toUTCString() + ';';
        }

        document.cookie = cookie + expires + path + domain + secure + httpOnly;

        return true;
      }

      return false;
    },

    /**
     * Get all Cookie keys.
     *
     * @return {Array}
     */
    keys: function() {
      var keys = [];
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var len = cookies.length;

      if (!cookies) return cookies;

      while (len--) {
        var key = cookies[len].split('=');
        keys.push(decode(key[0]));
      }

      return keys;
    },

    /**
     * Get all Cookie values.
     *
     * @return {Array}
     */
    values: function() {
      var values = [];
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var len = cookies.length;

      if (!cookies) return cookies;

      while (len--) {
        var value = cookies[len].split('=');
        values.push(decode(value[1]));
      }

      return values;
    },

    /**
     * Checks if cookie exists.
     *
     * @param  {Object} params
     * @param  {String} params.name   cookie name or key.
     * @return {Boolean} True if exists.
     */
    exists: function(params) {
      if (!params || !params.name) return;
      if (this.read(params)) return true;

      return false;
    },

    /**
     * Get all Cookies as String.
     *
     * @return {String}
     */
    listAsString: function() {
      var cookiesStr = '';
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var len = cookies.length;
      var cookie;

      if (!cookies) return cookiesStr;

      while (len--) {
        cookie = cookies[len].split('=');
        cookiesStr += [len] + ' ' + decode(cookie[0]) + '=' + decode(cookie[1]) + '\n';
      }

      return cookiesStr.trim();
    },

    /**
     * Get all Cookies as Hash.
     *
     * @return {Object}
     */
    listAsObject: function() {
      var cookiesObj = {};
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var len = cookies.length;
      var cookie;

      if (!cookies) return cookiesObj;

      while (len--) {
        cookie = cookies[len].split('=');
        cookiesObj[decode(cookie[0])] = decode(cookie[1]);
      }

      return cookiesObj;
    },

    /**
     * Get all Cookies as Array hash.
     *
     * @return {Array}
     */
    listAsArray: function() {
      var cookiesArr = [];
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var len = cookies.length;
      var cookie;

      if (!cookies) return cookiesArr;

      while (len--) {
        cookie = cookies[len].split('=');
        cookiesArr.push({ name: decode(cookie[0]), value: decode(cookie[1]) });
      }

      return cookiesArr;
    },

    /**
     * Get all Cookies as 2d-Array.
     *
     * @return {Array} 2-Dimensional
     */
    listAs2dArray: function() {
      var cookiesArr = [];
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var len = cookies.length;
      var cookie;

      if (!cookies) return cookiesArr;

      while (len--) {
        cookie = cookies[len].split('=');
        cookiesArr.push([decode(cookie[0]), decode(cookie[1])]);
      }

      return cookiesArr;
    },

    /**
     * Remove Cookie by name, path or domain.
     *
     * @param  {Object} params
     * @param  {String} params.name  cookie name or key.
     * @param  {String} params.path  cookie path.
     * @param  {String} params.domain  cookie domain.
     * @return {Boolean}
     */
    remove: function(params) {
      if (!params) return;

      if (this.read(params)) {
        return this.create({
          name: params.name,
          value: '',
          expires: -1,
          path: params.path,
          domain: params.domain
        });
      }

      return false;
    },

    /**
     * Clear Cookies or Cookie by either an Array property value or
     * String property value.
     *
     * Note: Calling the method without any param will remove all Cookies.
     *
     * @param  {Object}
     * @param  {String|Array|null} params.name   cookie name or key.
     * @return {Undefined}
     */
    clear: function(params) {

      function RUN(cut) {
        for (var i = 0; i < cut.length; i++)
          this.remove({ name: cut[i] });
      }

      if (!params) {
        var keys = this.keys();

        RUN.call(this, keys);

        return;
      }

      if (isArray(params.name)) {
        var names = params.name;

        RUN.call(this, names);
      } else {
        this.remove(params);
      }
    },

    /**
     * Checks browser if Cookies are enabled.
     *
     * @return {Boolean}
     */
    enabled: function() {
      if (navigator.cookieEnabled) {
        this.create({ name: 'test', value: '$0bee9a46d9d9f14cwjafa&45f&dg88' });
        var found = this.read({ name: 'test' }) === '$0bee9a46d9d9f14cwjafa&45f&dg88';
        this.remove({ name: 'test' });

        return found ? true : false;
      } else {
          return false;
      }
    },

    /** Cookie length. @return {Number} */
    get length () {
      return document.cookie.split('; ').length;
    },

    /** Cookiet help. @return {Object} */
    get help () {
      return Object.keys(this);
    },

    /** cookiet version. @return {String} */
    get VERSION () {
      return '1.2';
    }
  };

  // Check if is Node.js, AMD
  // or else we set it to window
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return cookiet;
    });
  } else {
    window.cookiet = cookiet;
  }
}(document, window));
