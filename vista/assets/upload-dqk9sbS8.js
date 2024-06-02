import{r as a,j as e,c as h,R as g}from"./client-CpnIEXJV.js";const j=({setResults:n})=>{const[c,i]=a.useState([]),[o,r]=a.useState(""),l=async()=>{try{const m=await(await fetch("/categorias",{method:"POST",headers:{"Content-Type":"application/json"}})).json();i(m.results)}catch(t){console.error("Error fetching data:",t)}};a.useEffect(()=>{l()},[]);const d=t=>{r(t.target.value),setCategory(t.target.value)};return e.jsx("div",{className:"input-wrapper",children:e.jsxs("select",{value:o,onChange:d,children:[e.jsx("option",{value:"",children:"Seleccione una opción"}),c.map(t=>e.jsx("option",{value:t.nombre,children:t.nombre},t.id))]})})},f=()=>{const[n,c]=a.useState(null),[i,o]=a.useState(""),[r,l]=a.useState(""),[d,t]=a.useState(""),m=s=>{c(s.target.files[0])},u=async()=>{if(!n)return;const s=new FormData;s.append("file",n),s.append("caption",r),s.append("category",d);try{const x=await(await fetch("/api/users/upload",{method:"POST",body:s})).json();o(x.message)}catch(p){console.error(p),o("Error uploading picture")}};return e.jsxs("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-4 max-w-sm",children:[e.jsxs("div",{class:"mt-3",children:[e.jsx("label",{htmlFor:"file",className:"block text-sm font-medium text-gray-700",children:"Video"}),e.jsx("input",{type:"file",id:"file",name:"file",onChange:m,className:"focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"})]}),e.jsxs("div",{class:"mt-3",children:[e.jsx("label",{htmlFor:"caption",className:"block text-sm font-medium text-gray-700",children:"Título"}),e.jsx("input",{type:"text",id:"caption",name:"caption",value:r,onChange:s=>l(s.target.value),placeholder:"Título",className:"focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"})]}),e.jsxs("div",{class:"mt-3",children:[e.jsx("label",{htmlFor:"category",className:"block text-sm font-medium text-gray-700",children:"Categoría"}),e.jsx(j,{setCategory:t})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{type:"button",onClick:u,disabled:!n,class:"btn btn-outline-primary mt-3",children:"Upload"})})]}),e.jsx("div",{children:e.jsx("p",{className:"text-sm text-gray-500",children:i})})]})};function y(){return e.jsx("div",{class:"container",children:e.jsx("div",{class:"row justify-content-center",children:e.jsx(f,{})})})}h.createRoot(document.getElementById("uploadVideo")).render(e.jsx(g.StrictMode,{children:e.jsx(y,{})}));