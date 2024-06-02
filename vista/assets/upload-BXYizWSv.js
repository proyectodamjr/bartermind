import{r as a,j as e,c as g,R as h}from"./client-CpnIEXJV.js";const j=()=>{const[o,i]=a.useState([]),[l,n]=a.useState("");a.useEffect(()=>{const s="/categorias";(async()=>{try{const p=await(await fetch(s)).json();i(p)}catch(c){console.error("Error fetching data:",c)}})()},[]);const r=s=>{n(s.target.value)};return e.jsxs("div",{children:[e.jsx("label",{htmlFor:"dropdown",children:"Selecciona una opción:"}),e.jsxs("select",{id:"dropdown",value:l,onChange:r,children:[e.jsx("option",{value:"",children:"Seleccione una opción"}),o.map(s=>e.jsx("option",{value:s.value,children:s.label},s.id))]})]})},f=()=>{const[o,i]=a.useState(null),[l,n]=a.useState(""),[r,s]=a.useState(""),[d,c]=a.useState(""),p=t=>{i(t.target.files[0])},u=async()=>{if(!o)return;const t=new FormData;t.append("file",o),t.append("caption",r),t.append("category",d);try{const x=await(await fetch("/api/users/upload",{method:"POST",body:t})).json();n(x.message)}catch(m){console.error(m),n("Error uploading picture")}};return e.jsxs("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-4 max-w-sm",children:[e.jsxs("div",{class:"mt-3",children:[e.jsx("label",{htmlFor:"file",className:"block text-sm font-medium text-gray-700",children:"Video"}),e.jsx("input",{type:"file",id:"file",name:"file",onChange:p,className:"focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"})]}),e.jsxs("div",{class:"mt-3",children:[e.jsx("label",{htmlFor:"caption",className:"block text-sm font-medium text-gray-700",children:"Título"}),e.jsx("input",{type:"text",id:"caption",name:"caption",value:r,onChange:t=>s(t.target.value),placeholder:"Título",className:"focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"})]}),e.jsxs("div",{class:"mt-3",children:[e.jsx("label",{htmlFor:"category",className:"block text-sm font-medium text-gray-700",children:"Categoría"}),e.jsx("input",{type:"text",id:"category",name:"category",value:d,onChange:t=>c(t.target.value),placeholder:"categoría",className:"focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"}),e.jsx(j,{})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{type:"button",onClick:u,disabled:!o,class:"btn btn-outline-primary mt-3",children:"Upload"})})]}),e.jsx("div",{children:e.jsx("p",{className:"text-sm text-gray-500",children:l})})]})};function y(){return e.jsx("div",{class:"container",children:e.jsx("div",{class:"row justify-content-center",children:e.jsx(f,{})})})}g.createRoot(document.getElementById("uploadVideo")).render(e.jsx(h.StrictMode,{children:e.jsx(y,{})}));
