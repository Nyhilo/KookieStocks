# KookieStocks

Gives a basic overview of how much profit you will make selling stocks in CookieClicker.

Numbers are calculated assuming you buy everything you want for a given stock then sell everything later.
Numbers are only calculated from the most recent purchase you made, so it table is most accurate if you're always buying max and selling all.

To install with TamperMonkey, use the following:

```javascript
// ==UserScript==
// @name         KookieStocks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display purchase and profit information for the CookieClicker Dough Jones.
// @author       silentclowd
// @match        http://orteil.dashnet.org/cookieclicker/
// @grant        none
// ==/UserScript==

var code = "(" + (function() {
    var checkReady = setInterval(function() {
        if (typeof Game.ready !== 'undefined' && Game.ready) {
            Game.LoadMod('https://nyhilo.github.io/KookieStocks/kookiestocks.js');
            clearInterval(checkReady);
        }
    }, 1000);
}).toString() + ")()";

window.eval(code);
```
