import{r as a,j as e,c as u,R as x}from"./client-CpnIEXJV.js";const g=()=>{const[s,o]=a.useState(null),[c,n]=a.useState(""),[r,l]=a.useState(""),d=t=>{o(t.target.files[0])},m=async()=>{if(!s)return;const t=new FormData;t.append("file",s),t.append("caption",r);try{const p=await(await fetch("/api/users/upload",{method:"POST",body:t})).json();n(p.message)}catch(i){console.error(i),n("Error uploading picture")}};return e.jsxs("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-4 max-w-sm",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"file",className:"block text-sm font-medium text-gray-700",children:"Picture"}),e.jsx("input",{type:"file",id:"file",name:"file",onChange:d,className:"focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"caption",className:"block text-sm font-medium text-gray-700",children:"Caption"}),e.jsx("input",{type:"text",id:"caption",name:"caption",value:r,onChange:t=>l(t.target.value),placeholder:"Caption",className:"focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{type:"button",onClick:m,disabled:!s,class:"btn btn-outline-primary m-5",children:"Upload"})})]}),e.jsx("div",{children:e.jsx("p",{className:"text-sm text-gray-500",children:c})})]})};function h(){return e.jsx("div",{class:"container",children:e.jsx("div",{class:"row justify-content-center",children:e.jsx(g,{})})})}u.createRoot(document.getElementById("uploadVideo")).render(e.jsx(x.StrictMode,{children:e.jsx(h,{})}));
