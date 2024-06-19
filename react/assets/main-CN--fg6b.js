import{R as u,r as m,j as s,c as b,s as d}from"./sweetalert.min-EJX1vm67.js";/* empty css               */var x={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},v=u.createContext&&u.createContext(x),E=["attr","size","title"];function N(e,t){if(e==null)return{};var r=S(e,t),n,c;if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(c=0;c<l.length;c++)n=l[c],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function S(e,t){if(e==null)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},h.apply(this,arguments)}function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(c){return Object.getOwnPropertyDescriptor(e,c).enumerable})),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?y(Object(r),!0).forEach(function(n){P(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function P(e,t,r){return t=C(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function C(e){var t=_(e,"string");return typeof t=="symbol"?t:t+""}function _(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function w(e){return e&&e.map((t,r)=>u.createElement(t.tag,p({key:r},t.attr),w(t.child)))}function T(e){return t=>u.createElement(D,h({attr:p({},e.attr)},t),w(e.child))}function D(e){var t=r=>{var{attr:n,size:c,title:l}=e,o=N(e,E),i=c||r.size||"1em",a;return r.className&&(a=r.className),e.className&&(a=(a?a+" ":"")+e.className),u.createElement("svg",h({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,o,{className:a,style:p(p({color:e.color||r.color},r.style),e.style),height:i,width:i,xmlns:"http://www.w3.org/2000/svg"}),l&&u.createElement("title",null,l),e.children)};return v!==void 0?u.createElement(v.Consumer,null,r=>t(r)):t(x)}function V(e){return T({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(e)}const R=({setResults:e})=>{const[t,r]=m.useState(""),n=o=>{fetch("/search",{method:"POST",body:JSON.stringify({query:o}),headers:{"Content-Type":"application/json"}}).then(i=>i.json()).then(i=>{e({results:i.results,usuarios:i.usuarios})})},c=o=>{r(o),n(o)},l=({key:o})=>{o==="Enter"&&(window.location.href=`/resultado/${t}`)};return s.jsxs("div",{className:"input-wrapper",children:[s.jsx(V,{id:"search-icon"}),s.jsx("input",{placeholder:"Buscar...",value:t,onChange:o=>c(o.target.value),onKeyDown:l})]})},g=({result:e,type:t})=>{const r=()=>{window.location.href=`/perfilUsuario.html?id=${e.id}`};return s.jsx("div",{className:"search-result",onClick:r,children:t==="usuario"?e.nombre:e.titulo})},z=({results:e,usuarios:t})=>s.jsxs("div",{className:"results-list",children:[t.map(r=>s.jsx(g,{result:r,type:"usuario"},r.id)),e.map(r=>s.jsx(g,{result:r,type:"video"},r.id))]});function I(){const[e,t]=m.useState({results:[],usuarios:[]});return s.jsx("div",{className:"App",children:s.jsxs("div",{className:"search-bar-container",children:[s.jsx(R,{setResults:t}),e&&(e.results.length>0||e.usuarios.length>0)&&s.jsx(z,{results:e.results,usuarios:e.usuarios})]})})}b.createRoot(document.getElementById("root")).render(s.jsx(u.StrictMode,{children:s.jsx(I,{})}));const B=({videoUrl:e})=>s.jsx("div",{className:"video-wrapper",children:s.jsx("video",{className:"video-player",controls:!0,children:s.jsx("source",{src:e,type:"video/mp4"})})}),q=()=>{const[e,t]=m.useState([]),[r,n]=m.useState([]);m.useEffect(()=>{const o=async()=>{try{const O=(await(await fetch("/api/videos")).json()).videos.map(j=>({...j,enlace:`./uploads/${j.enlace}`}));t(O)}catch(a){console.error("Error fetching videos:",a)}},i=async()=>{try{const f=await(await fetch("/api/user")).json();n(f)}catch(a){console.error("Error fetching user data:",a)}};o(),i()},[]);const c=async o=>{try{const i=await fetch("/api/comentarios",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comentario:"Quiere hacer un Trueque contigo!",idCurso:o.idCurso,usuarios_id:o.usuarios_id,comentarista_id1:1,video_id:o.id})}),a=await i.json();i.ok?d("¡Trueque enviado!","El comentario se ha enviado correctamente.","success"):d("Error",a.message,"error")}catch(i){console.error("Error inserting comment:",i),d("Error","No se pudo enviar el comentario.","error")}},l=async o=>{try{const i=await fetch("/api/eliminarVideo",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({comentario:"Tu video ha sido eliminado por un administrador",idCurso:o.idCurso,usuarios_id:o.usuarios_id,comentarista_id1:1,video_id:o.id})}),a=await i.json();i.ok?d("¡Video eliminado!","El video ha sido eliminado correctamente.","success"):d("Error",a.message,"error")}catch(i){console.error("Error inserting comment:",i),d("Error","No se pudo eliminar el video.","error")}};return s.jsx("div",{className:"container d-flex flex-column",children:e.map(o=>s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-12 col-md-8 col-lg-8 ",children:s.jsx("div",{className:"video-item w-100 d-flex flex-column justify-content-end mb-4 position-relative",children:s.jsx(B,{videoUrl:o.enlace})},o.id)}),s.jsxs("div",{className:"col-12 col-md-4 col-lg-4 mb-4",children:[s.jsx("h5",{children:o.titulo}),s.jsx("button",{className:"btn btn-primary",onClick:()=>c(o),children:"Trueque"}),s.jsx("br",{}),r.admin==="S"&&s.jsx("button",{className:"btn btn-danger mt-1",onClick:()=>l(o),children:"Eliminar"})]})]}))})};function L(){return s.jsx("div",{className:"container-videos",children:s.jsx(q,{})})}b.createRoot(document.getElementById("rootVideo")).render(s.jsx(u.StrictMode,{children:s.jsx(L,{})}));