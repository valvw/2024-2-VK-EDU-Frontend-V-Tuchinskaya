(()=>{"use strict";var e={2:(e,t,o)=>{o.d(t,{A:()=>s});var n=o(601),r=o.n(n),a=o(314),i=o.n(a)()(r());i.push([e.id,'body{font-family:Arial,sans-serif;background-color:#1e1e1e;margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100vh;color:#ddd}.chat-container{width:100%;max-width:400px;background-color:#2c2c2c;box-shadow:0 0 10px rgba(0,0,0,.5);border-radius:10px;overflow:hidden;display:flex;flex-direction:column;height:99vh}@media screen and (max-width: 480px){.chat-container{max-width:100%}}.top-bar{background-color:#333;padding:15px;display:flex;align-items:center;justify-content:space-between;color:#fff}.top-bar .left-icons,.top-bar .right-icons{display:flex;align-items:center}.top-bar .material-icons{font-size:24px;margin-right:10px;cursor:pointer;transition:color .3s ease}.top-bar .material-icons:hover{color:#ddd}.user-info{flex:1;display:flex;align-items:center;padding-left:1.5em;flex-direction:row}.user-info .material-icons{font-size:40px;margin-right:10px}.user-info .username-container{display:flex;flex-direction:column;align-items:flex-start}.user-info .username{font-weight:bold;font-size:16px}.user-info .status{font-size:12px;color:#ddd}.messages-container{flex:1;overflow-y:auto;padding:10px;scroll-behavior:smooth;scrollbar-width:none}.messages-container::-webkit-scrollbar-track{display:none}.messages{padding:10px;overflow-y:auto;display:flex;flex-direction:column;justify-content:flex-end}.message{margin-bottom:10px;display:flex;align-items:flex-end}.message .message-content{position:relative;width:auto;padding:0 10px;border-radius:10px;max-width:75%;background-color:#444;color:#ddd;z-index:1;word-wrap:break-word}.message .message-content:before{content:"";position:absolute;bottom:0;width:25px;height:20px;border-radius:70% 0 90% 0;z-index:-1;background-color:inherit}.message .message-content p{margin:.8em 0 0 0}.message .message-info{display:flex;justify-content:flex-end;align-items:center;font-size:12px;color:#999;margin:.5em 0 .5em calc(.8em + 30%);text-align:right}.message .message-info .message-time{margin-right:8px;color:#999}.message .message-info .message-status{font-size:12px;color:#007bff}.message.send{justify-content:flex-start}.message.send .message-content{margin-left:10px}.message.send .message-content:before{left:-7px;transform:matrix(0.3, -0.7, 0.6, 0.1, 0, 0) skewX(8deg) scaleY(-1) rotate(10deg)}.message.you{justify-content:flex-end}.message.you .message-content{background-color:#007bff;color:#fff;margin-right:10px}.message.you .message-content:before{right:-7px;transform:matrix(0.3, 0.8, -0.6, 0.1, 0, 0) skewX(-8deg) scaleY(1) rotate(-10deg)}.message.you .message-info{color:#fff}.message.you .message-info .message-time{color:#fff}.message.you .message-info .message-status{color:#ddd}.input-container{display:flex;align-items:center;padding:15px;background-color:#333;border-top:1px solid #555;position:relative}.input-container textarea{flex:1;padding:8px;margin:0 5px;width:100%;border:1px solid #555;border-radius:20px;background-color:#444;color:#ddd;font-size:14px;line-height:1.5;resize:none;overflow:hidden;box-sizing:border-box}.input-container textarea:focus{border-color:#777;outline:none}.input-container .attach-icon{color:#ddd;cursor:pointer;font-size:24px;border-radius:50%;background-color:#555;transition:filter .3s ease}.input-container .attach-icon:hover{filter:brightness(1.3)}.clear-btn{position:fixed;bottom:20px;right:20px;padding:10px 15px;background-color:#007bff;color:#fff;border:none;border-radius:10px;font-size:16px;cursor:pointer;box-shadow:0px 4px 12px rgba(0,0,0,.1);transition:background-color .3s ease,transform .3s ease}.clear-btn:hover{background-color:#0056b3}.clear-btn:active{background-color:#004494}@media screen and (max-width: 510px){.clear-btn{display:none}}',""]);const s=i},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var o="",n=void 0!==t[5];return t[4]&&(o+="@supports (".concat(t[4],") {")),t[2]&&(o+="@media ".concat(t[2]," {")),n&&(o+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),o+=e(t),n&&(o+="}"),t[2]&&(o+="}"),t[4]&&(o+="}"),o})).join("")},t.i=function(e,o,n,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(n)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var d=0;d<e.length;d++){var l=[].concat(e[d]);n&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),o&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=o):l[2]=o),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),t.push(l))}},t}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var t=[];function o(e){for(var o=-1,n=0;n<t.length;n++)if(t[n].identifier===e){o=n;break}return o}function n(e,n){for(var a={},i=[],s=0;s<e.length;s++){var c=e[s],d=n.base?c[0]+n.base:c[0],l=a[d]||0,f="".concat(d," ").concat(l);a[d]=l+1;var p=o(f),u={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)t[p].references++,t[p].updater(u);else{var m=r(u,n);n.byIndex=s,t.splice(s,0,{identifier:f,updater:m,references:1})}i.push(f)}return i}function r(e,t){var o=t.domAPI(t);return o.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;o.update(e=t)}else o.remove()}}e.exports=function(e,r){var a=n(e=e||[],r=r||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var s=o(a[i]);t[s].references--}for(var c=n(e,r),d=0;d<a.length;d++){var l=o(a[d]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}a=c}}},659:e=>{var t={};e.exports=function(e,o){var n=function(e){if(void 0===t[e]){var o=document.querySelector(e);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(e){o=null}t[e]=o}return t[e]}(e);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(o)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,o)=>{e.exports=function(e){var t=o.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(o){!function(e,t,o){var n="";o.supports&&(n+="@supports (".concat(o.supports,") {")),o.media&&(n+="@media ".concat(o.media," {"));var r=void 0!==o.layer;r&&(n+="@layer".concat(o.layer.length>0?" ".concat(o.layer):""," {")),n+=o.css,r&&(n+="}"),o.media&&(n+="}"),o.supports&&(n+="}");var a=o.sourceMap;a&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(n,e,t.options)}(t,e,o)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={id:n,exports:{}};return e[n](a,a.exports,o),a.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.nc=void 0;var n=o(72),r=o.n(n),a=o(825),i=o.n(a),s=o(659),c=o.n(s),d=o(56),l=o.n(d),f=o(540),p=o.n(f),u=o(113),m=o.n(u),g=o(2),x={};x.styleTagTransform=m(),x.setAttributes=l(),x.insert=c().bind(null,"head"),x.domAPI=i(),x.insertStyleElement=p(),r()(g.A,x),g.A&&g.A.locals&&g.A.locals})();