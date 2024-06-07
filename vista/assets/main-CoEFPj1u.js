import{R as a,r as d,j as s,c as v,s as p}from"./sweetalert.min-DNEjjZ1c.js";var g={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},h=a.createContext&&a.createContext(g),x=["attr","size","title"];function b(e,t){if(e==null)return{};var n=O(e,t),r,i;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)r=o[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function O(e,t){if(e==null)return{};var n={};for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}function m(){return m=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},m.apply(this,arguments)}function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?j(Object(n),!0).forEach(function(r){w(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function w(e,t,n){return t=N(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e){var t=P(e,"string");return typeof t=="symbol"?t:t+""}function P(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function y(e){return e&&e.map((t,n)=>a.createElement(t.tag,f({key:n},t.attr),y(t.child)))}function S(e){return t=>a.createElement(E,m({attr:f({},e.attr)},t),y(e.child))}function E(e){var t=n=>{var{attr:r,size:i,title:o}=e,c=b(e,x),l=i||n.size||"1em",u;return n.className&&(u=n.className),e.className&&(u=(u?u+" ":"")+e.className),a.createElement("svg",m({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,r,c,{className:u,style:f(f({color:e.color||n.color},n.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),o&&a.createElement("title",null,o),e.children)};return h!==void 0?a.createElement(h.Consumer,null,n=>t(n)):t(g)}function C(e){return S({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(e)}const _=({setResults:e})=>{const[t,n]=d.useState(""),r=o=>{fetch("/search",{method:"POST",body:JSON.stringify({query:o}),headers:{"Content-Type":"application/json"}}).then(c=>c.json()).then(c=>{const l=c.results.map(u=>u.nombre);e(l)})},i=o=>{n(o),r(o)};return s.jsxs("div",{className:"input-wrapper",children:[s.jsx(C,{id:"search-icon"}),s.jsx("input",{placeholder:"Buscar...",value:t,onChange:o=>i(o.target.value)})]})},T=({result:e})=>s.jsx("div",{className:"search-result",onClick:t=>alert(`You selected ${e}!`),children:e}),R=({results:e})=>s.jsx("div",{className:"results-list",children:e.map(t=>s.jsx(T,{result:t}))});function V(){const[e,t]=d.useState([]);return s.jsx("div",{className:"App",children:s.jsxs("div",{className:"search-bar-container",children:[s.jsx(_,{setResults:t}),e&&e.length>0&&s.jsx(R,{results:e})]})})}v.createRoot(document.getElementById("root")).render(s.jsx(a.StrictMode,{children:s.jsx(V,{})}));const z=({videoUrl:e})=>s.jsx("div",{className:"video-wrapper",children:s.jsx("video",{className:"video-player",controls:!0,children:s.jsx("source",{src:e,type:"video/mp4"})})}),I=()=>{const[e,t]=d.useState([]);d.useEffect(()=>{(async()=>{try{const c=(await(await fetch("/api/videos")).json()).videos.map(l=>({...l,enlace:`./uploads/${l.enlace}`}));t(c)}catch(i){console.error("Error fetching videos:",i)}})()},[]);const n=async r=>{try{const i=await fetch("/api/comentarios",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comentario:"Quiere hacer un Trueque contigo!",idCurso:r.idCurso,usuarios_id:r.usuarios_id,comentarista_id1:1,video_id:r.id})}),o=await i.json();i.ok?p("¡Comentario insertado!","El comentario se ha insertado correctamente.","success"):p("Error",o.message,"error")}catch(i){console.error("Error inserting comment:",i),p("Error","No se pudo insertar el comentario.","error")}};return s.jsx("div",{className:"container d-flex flex-column align-items-center",children:e.map(r=>s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-12 col-md-8 col-lg-8",children:s.jsx("div",{className:"video-item w-100 d-flex flex-column justify-content-end mb-4 position-relative",children:s.jsx(z,{videoUrl:r.enlace})},r.id)}),s.jsxs("div",{className:"col-12 col-md-4 col-lg-4",children:[s.jsx("h5",{children:r.titulo}),s.jsx("button",{className:"btn btn-primary",onClick:()=>n(r),children:"Trueque"})]})]}))})};function B(){return s.jsx("div",{className:"container-videos",children:s.jsx(I,{})})}v.createRoot(document.getElementById("rootVideo")).render(s.jsx(a.StrictMode,{children:s.jsx(B,{})}));
