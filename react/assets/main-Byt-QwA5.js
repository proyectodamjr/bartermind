import{R as c,r as p,j as s,S as b,c as O}from"./SelectDropdown-Cwjh9o_Z.js";var y={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},h=c.createContext&&c.createContext(y),w=["attr","size","title"];function x(e,t){if(e==null)return{};var r=P(e,t),n,i;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function P(e,t){if(e==null)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},d.apply(this,arguments)}function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?g(Object(r),!0).forEach(function(n){S(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function S(e,t,r){return t=C(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function C(e){var t=E(e,"string");return typeof t=="symbol"?t:t+""}function E(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function j(e){return e&&e.map((t,r)=>c.createElement(t.tag,f({key:r},t.attr),j(t.child)))}function N(e){return t=>c.createElement(I,d({attr:f({},e.attr)},t),j(e.child))}function I(e){var t=r=>{var{attr:n,size:i,title:o}=e,m=x(e,w),u=i||r.size||"1em",a;return r.className&&(a=r.className),e.className&&(a=(a?a+" ":"")+e.className),c.createElement("svg",d({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,m,{className:a,style:f(f({color:e.color||r.color},r.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),o&&c.createElement("title",null,o),e.children)};return h!==void 0?c.createElement(h.Consumer,null,r=>t(r)):t(y)}function D(e){return N({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(e)}const R=({setResults:e,handleCategory:t,category:r})=>{const[n,i]=p.useState(""),o=a=>{fetch("/search",{method:"POST",body:JSON.stringify({query:a}),headers:{"Content-Type":"application/json"}}).then(l=>l.json()).then(l=>{e({results:l.results,usuarios:l.usuarios})})},m=a=>{i(a),a.trim()===""?e({results:[],usuarios:[]}):o(a)},u=({key:a})=>{if(a==="Enter"){const l=`/resultado.html?query=${encodeURIComponent(n)}&category=${encodeURIComponent(r)}`;window.location.href=l}};return s.jsxs("div",{className:"input-wrapper",children:[s.jsx(D,{id:"search-icon"}),s.jsx("input",{placeholder:"Buscar...",value:n,onChange:a=>m(a.target.value),onKeyDown:u}),s.jsx(b,{handleCategory:t})]})},v=({result:e,type:t})=>{const r=()=>{t==="usuario"?window.location.href=`/perfilUsuario.html?id=${e.id}`:t==="video"&&(window.location.href=`/resultado.html?id=${e.id}`)};return s.jsx("div",{className:"search-result",onClick:r,children:t==="usuario"?e.nombre:e.titulo})},_=({results:e,usuarios:t,category:r=0})=>{var n=e;return r!=0&&(n=e.filter(i=>parseInt(i.categoria_id)===parseInt(r))),s.jsxs("div",{className:"results-list",children:[parseInt(r)===0&&t.map(i=>s.jsx(v,{result:i,type:"usuario"},i.id)),n.map(i=>s.jsx(v,{result:i,type:"video"},i.id))]})};function z(){const[e,t]=p.useState({results:[],usuarios:[]}),[r,n]=p.useState(0),i=o=>{n(o)};return s.jsx("div",{className:"App",children:s.jsxs("div",{className:"search-bar-container",children:[s.jsx(R,{setResults:t,handleCategory:i,category:r}),e&&(e.results.length>0||e.usuarios.length>0)&&s.jsx(_,{results:e.results,usuarios:e.usuarios,category:r})]})})}O.createRoot(document.getElementById("root")).render(s.jsx(c.StrictMode,{children:s.jsx(z,{})}));
