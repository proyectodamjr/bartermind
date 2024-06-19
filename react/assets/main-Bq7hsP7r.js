import{R as o,r as g,j as i,c as b}from"./client-BSvFEBJr.js";var v={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},h=o.createContext&&o.createContext(v),y=["attr","size","title"];function O(e,t){if(e==null)return{};var r=w(e,t),n,a;if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function w(e,t){if(e==null)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},d.apply(this,arguments)}function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?m(Object(r),!0).forEach(function(n){x(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function x(e,t,r){return t=P(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function P(e){var t=S(e,"string");return typeof t=="symbol"?t:t+""}function S(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function j(e){return e&&e.map((t,r)=>o.createElement(t.tag,f({key:r},t.attr),j(t.child)))}function E(e){return t=>o.createElement(N,d({attr:f({},e.attr)},t),j(e.child))}function N(e){var t=r=>{var{attr:n,size:a,title:l}=e,s=O(e,y),c=a||r.size||"1em",u;return r.className&&(u=r.className),e.className&&(u=(u?u+" ":"")+e.className),o.createElement("svg",d({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,s,{className:u,style:f(f({color:e.color||r.color},r.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),l&&o.createElement("title",null,l),e.children)};return h!==void 0?o.createElement(h.Consumer,null,r=>t(r)):t(v)}function C(e){return E({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(e)}const D=({setResults:e})=>{const[t,r]=g.useState(""),n=s=>{fetch("/search",{method:"POST",body:JSON.stringify({query:s}),headers:{"Content-Type":"application/json"}}).then(c=>c.json()).then(c=>{e({results:c.results,usuarios:c.usuarios})})},a=s=>{r(s),s.trim()===""?e({results:[],usuarios:[]}):n(s)},l=({key:s})=>{s==="Enter"&&(window.location.href=`/resultado.html?query=${t}`)};return i.jsxs("div",{className:"input-wrapper",children:[i.jsx(C,{id:"search-icon"}),i.jsx("input",{placeholder:"Buscar...",value:t,onChange:s=>a(s.target.value),onKeyDown:l})]})},p=({result:e,type:t})=>{const r=()=>{t==="usuario"?window.location.href=`/perfilUsuario.html?id=${e.id}`:t==="video"&&(window.location.href=`/resultado.html?id=${e.id}`)};return i.jsx("div",{className:"search-result",onClick:r,children:t==="usuario"?e.nombre:e.titulo})},_=({results:e,usuarios:t})=>(console.log("hola"),i.jsxs("div",{className:"results-list",children:[i.jsx("div",{children:"hola"}),t.map(r=>i.jsx(p,{result:r,type:"usuario"},r.id)),e.map(r=>i.jsx(p,{result:r,type:"video"},r.id)).filter(r=>console.log(r))]}));function z(){const[e,t]=g.useState({results:[],usuarios:[]});return i.jsx("div",{className:"App",children:i.jsxs("div",{className:"search-bar-container",children:[i.jsx(D,{setResults:t}),e&&(e.results.length>0||e.usuarios.length>0)&&i.jsx(_,{results:e.results,usuarios:e.usuarios})]})})}b.createRoot(document.getElementById("root")).render(i.jsx(o.StrictMode,{children:i.jsx(z,{})}));
