import{r as s,j as t}from"./sweetalert.min-EJX1vm67.js";const h=({setCategory:a})=>{const[n,o]=s.useState([]),[r,c]=s.useState(""),i=async()=>{try{const p=await(await fetch("/categorias",{method:"POST",headers:{"Content-Type":"application/json"}})).json();o(p.results)}catch(e){console.error("Error fetching data:",e)}};s.useEffect(()=>{i()},[]);const l=e=>{c(e.target.value),a(e.target.value)};return t.jsx("div",{className:"input-wrapper",children:t.jsxs("select",{value:r,onChange:l,children:[t.jsx("option",{value:"",children:"Seleccione una opción"}),n.map(e=>t.jsx("option",{value:e.nombre,children:e.nombre},e.id))]})})};export{h as S};