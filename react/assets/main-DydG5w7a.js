import{R as c,r as h,j as a,S as y,c as b}from"./SelectDropdown-C0Sii46j.js";var v={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},p=c.createContext&&c.createContext(v),O=["attr","size","title"];function w(e,t){if(e==null)return{};var r=x(e,t),n,i;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function x(e,t){if(e==null)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u.apply(this,arguments)}function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?m(Object(r),!0).forEach(function(n){P(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function P(e,t,r){return t=S(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function S(e){var t=C(e,"string");return typeof t=="symbol"?t:t+""}function C(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function j(e){return e&&e.map((t,r)=>c.createElement(t.tag,d({key:r},t.attr),j(t.child)))}function E(e){return t=>c.createElement(N,u({attr:d({},e.attr)},t),j(e.child))}function N(e){var t=r=>{var{attr:n,size:i,title:o}=e,f=w(e,O),s=i||r.size||"1em",l;return r.className&&(l=r.className),e.className&&(l=(l?l+" ":"")+e.className),c.createElement("svg",u({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,f,{className:l,style:d(d({color:e.color||r.color},r.style),e.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),o&&c.createElement("title",null,o),e.children)};return p!==void 0?c.createElement(p.Consumer,null,r=>t(r)):t(v)}function D(e){return E({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(e)}const _=({setResults:e,handleCategory:t})=>{const[r,n]=h.useState(""),i=s=>{fetch("/search",{method:"POST",body:JSON.stringify({query:s}),headers:{"Content-Type":"application/json"}}).then(l=>l.json()).then(l=>{e({results:l.results,usuarios:l.usuarios})})},o=s=>{n(s),s.trim()===""?e({results:[],usuarios:[]}):i(s)},f=({key:s})=>{s==="Enter"&&(window.location.href=`/resultado.html?query=${r}`)};return a.jsxs("div",{className:"input-wrapper",children:[a.jsx(D,{id:"search-icon"}),a.jsx("input",{placeholder:"Buscar...",value:r,onChange:s=>o(s.target.value),onKeyDown:f}),a.jsx(y,{handleCategory:t})]})},g=({result:e,type:t})=>{const r=()=>{t==="usuario"?window.location.href=`/perfilUsuario.html?id=${e.id}`:t==="video"&&(window.location.href=`/resultado.html?id=${e.id}`)};return a.jsx("div",{className:"search-result",onClick:r,children:t==="usuario"?e.nombre:e.titulo})},I=({results:e,usuarios:t,category:r=null})=>{var n=e;return r!=null&&(n=e.filter(i=>parseInt(i.categoria_id)===parseInt(r))),a.jsxs("div",{className:"results-list",children:[t.map(i=>a.jsx(g,{result:i,type:"usuario"},i.id)),n.map(i=>(console.log({result:i}),a.jsx(g,{result:i,type:"video"},i.id)))]})};function z(){const[e,t]=h.useState({results:[],usuarios:[]}),[r,n]=h.useState(null),i=o=>{console.log({categoryApp:o}),n(o)};return a.jsx("div",{className:"App",children:a.jsxs("div",{className:"search-bar-container",children:[a.jsx(_,{setResults:t,handleCategory:i}),e&&(e.results.length>0||e.usuarios.length>0)&&a.jsx(I,{results:e.results,usuarios:e.usuarios,category:r})]})})}b.createRoot(document.getElementById("root")).render(a.jsx(c.StrictMode,{children:a.jsx(z,{})}));
