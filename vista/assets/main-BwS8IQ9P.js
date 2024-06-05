import{R as c,r as h,j as i,c as v}from"./client-D4xa3Uje.js";var j={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},f=c.createContext&&c.createContext(j),b=["attr","size","title"];function y(e,t){if(e==null)return{};var r=x(e,t),n,a;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function x(e,t){if(e==null)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},d.apply(this,arguments)}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?p(Object(r),!0).forEach(function(n){O(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function O(e,t,r){return t=w(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function w(e){var t=P(e,"string");return typeof t=="symbol"?t:t+""}function P(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function g(e){return e&&e.map((t,r)=>c.createElement(t.tag,m({key:r},t.attr),g(t.child)))}function N(e){return t=>c.createElement(S,d({attr:m({},e.attr)},t),g(e.child))}function S(e){var t=r=>{var{attr:n,size:a,title:s}=e,l=y(e,b),u=a||r.size||"1em",o;return r.className&&(o=r.className),e.className&&(o=(o?o+" ":"")+e.className),c.createElement("svg",d({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,l,{className:o,style:m(m({color:e.color||r.color},r.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),s&&c.createElement("title",null,s),e.children)};return f!==void 0?c.createElement(f.Consumer,null,r=>t(r)):t(j)}function E(e){return N({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(e)}const C=({setResults:e})=>{const[t,r]=h.useState(""),n=s=>{fetch("/search",{method:"POST",body:JSON.stringify({query:s}),headers:{"Content-Type":"application/json"}}).then(l=>l.json()).then(l=>{const u=l.results.map(o=>o.nombre);e(u)})},a=s=>{r(s),n(s)};return i.jsxs("div",{className:"input-wrapper",children:[i.jsx(E,{id:"search-icon"}),i.jsx("input",{placeholder:"Buscar...",value:t,onChange:s=>a(s.target.value)})]})},R=({result:e})=>i.jsx("div",{className:"search-result",onClick:t=>alert(`You selected ${e}!`),children:e}),_=({results:e})=>i.jsx("div",{className:"results-list",children:e.map(t=>i.jsx(R,{result:t}))});function z(){const[e,t]=h.useState([]);return i.jsx("div",{className:"App",children:i.jsxs("div",{className:"search-bar-container",children:[i.jsx(C,{setResults:t}),e&&e.length>0&&i.jsx(_,{results:e})]})})}v.createRoot(document.getElementById("root")).render(i.jsx(c.StrictMode,{children:i.jsx(z,{})}));const I=({videoUrl:e})=>i.jsx("div",{className:"mb-4",children:i.jsx("video",{class:"w-25",controls:!0,children:i.jsx("source",{src:e,type:"video/mp4"})})}),B=()=>{const e=["./uploads/file-1717352902382-66689332.mp4","./uploads/file-1717352902382-66689332.mp4"];return i.jsx("div",{className:"videos-container",children:e.map(t=>i.jsx(I,{videoUrl:t}))})};function D(){return i.jsx("div",{className:"container-videos",children:i.jsx(B,{})})}v.createRoot(document.getElementById("rootVideo")).render(i.jsx(c.StrictMode,{children:i.jsx(D,{})}));
