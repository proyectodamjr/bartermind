import{R as o,r as d,j as s,c as v,s as p}from"./sweetalert.min-DNEjjZ1c.js";var g={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},h=o.createContext&&o.createContext(g),x=["attr","size","title"];function b(e,t){if(e==null)return{};var r=O(e,t),n,i;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function O(e,t){if(e==null)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}function m(){return m=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},m.apply(this,arguments)}function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?j(Object(r),!0).forEach(function(n){w(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function w(e,t,r){return t=N(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function N(e){var t=P(e,"string");return typeof t=="symbol"?t:t+""}function P(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function y(e){return e&&e.map((t,r)=>o.createElement(t.tag,f({key:r},t.attr),y(t.child)))}function S(e){return t=>o.createElement(E,m({attr:f({},e.attr)},t),y(e.child))}function E(e){var t=r=>{var{attr:n,size:i,title:a}=e,c=b(e,x),l=i||r.size||"1em",u;return r.className&&(u=r.className),e.className&&(u=(u?u+" ":"")+e.className),o.createElement("svg",m({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,c,{className:u,style:f(f({color:e.color||r.color},r.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),a&&o.createElement("title",null,a),e.children)};return h!==void 0?o.createElement(h.Consumer,null,r=>t(r)):t(g)}function C(e){return S({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(e)}const _=({setResults:e})=>{const[t,r]=d.useState(""),n=a=>{fetch("/search",{method:"POST",body:JSON.stringify({query:a}),headers:{"Content-Type":"application/json"}}).then(c=>c.json()).then(c=>{const l=c.results.map(u=>u.nombre);e(l)})},i=a=>{r(a),n(a)};return s.jsxs("div",{className:"input-wrapper",children:[s.jsx(C,{id:"search-icon"}),s.jsx("input",{placeholder:"Buscar...",value:t,onChange:a=>i(a.target.value)})]})},T=({result:e})=>s.jsx("div",{className:"search-result",onClick:t=>alert(`You selected ${e}!`),children:e}),R=({results:e})=>s.jsx("div",{className:"results-list",children:e.map(t=>s.jsx(T,{result:t}))});function V(){const[e,t]=d.useState([]);return s.jsx("div",{className:"App",children:s.jsxs("div",{className:"search-bar-container",children:[s.jsx(_,{setResults:t}),e&&e.length>0&&s.jsx(R,{results:e})]})})}v.createRoot(document.getElementById("root")).render(s.jsx(o.StrictMode,{children:s.jsx(V,{})}));const z=({videoUrl:e})=>s.jsx("div",{className:"video-wrapper",children:s.jsx("video",{className:"video-player",controls:!0,children:s.jsx("source",{src:e,type:"video/mp4"})})}),I=()=>{const[e,t]=d.useState([]);d.useEffect(()=>{(async()=>{try{const c=(await(await fetch("/api/videos")).json()).videos.map(l=>({...l,enlace:`./uploads/${l.enlace}`}));t(c)}catch(i){console.error("Error fetching videos:",i)}})()},[]);const r=async n=>{try{const i=await fetch("/api/comentarios",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comentario:"Trueque",idCurso:n.idCurso,usuarios_id:1,comentarista_id1:1,video_id:n.id})}),a=await i.json();i.ok?p("¡Comentario insertado!","El comentario se ha insertado correctamente.","success"):p("Error",a.message,"error")}catch(i){console.error("Error inserting comment:",i),p("Error","No se pudo insertar el comentario.","error")}};return s.jsx("div",{className:"container d-flex flex-column align-items-center",children:e.map(n=>s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col",children:s.jsx("div",{className:"video-item w-100 d-flex flex-column align-items-center mb-4 position-relative",children:s.jsx(z,{videoUrl:n.enlace})},n.id)}),s.jsxs("div",{className:"col",children:[s.jsx("h5",{children:n.titulo}),s.jsx("button",{className:"btn btn-primary ",onClick:()=>r(n),children:"Trueque"})]})]}))})};function B(){return s.jsx("div",{className:"container-videos",children:s.jsx(I,{})})}v.createRoot(document.getElementById("rootVideo")).render(s.jsx(o.StrictMode,{children:s.jsx(B,{})}));
