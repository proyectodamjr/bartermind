import{r as s,j as e,s as n,c as x,R as p}from"./sweetalert.min-EJX1vm67.js";import{S as h}from"./SelectDropdown-xpaIbWYn.js";const g=()=>{const[c,y]=s.useState(null),[i,f]=s.useState(""),[a,l]=s.useState(""),[r,d]=s.useState(""),m=async()=>{if(!c)return;const t=new FormData;t.append("caption",a),t.append("category",r);try{const u=await(await fetch("/api/users/crearCurso",{method:"POST",body:t})).json();n({title:"Subida exitosa!",text:u.message,icon:"success"}).then(()=>{window.location.href="/misCursos.html"})}catch(o){console.error(o),n({title:"Error",text:data.message,icon:"error"})}};return e.jsxs("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-4 max-w-sm",children:[e.jsxs("div",{class:"mt-3",children:[e.jsx("label",{htmlFor:"caption",className:"block text-sm font-medium text-gray-700",children:"Título del curso"}),e.jsx("input",{type:"text",id:"caption",name:"caption",value:a,onChange:t=>l(t.target.value),placeholder:"Título",className:"focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"})]}),e.jsxs("div",{class:"mt-3",children:[e.jsx("label",{htmlFor:"category",className:"block text-sm font-medium text-gray-700",children:"Categoría"}),e.jsx(h,{setCategory:d})]}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{type:"button",onClick:m,disabled:!a||!r,class:"btn btn-outline-primary mt-3",children:"Upload"}),e.jsx("a",{class:"btn btn-outline-danger mt-3 ms-3",href:"/misCursos.html",children:"Cancelar"})]})]}),e.jsx("div",{children:e.jsx("p",{className:"text-sm text-gray-500",children:i})})]})};function j(){return e.jsx("div",{class:"container",children:e.jsx("div",{class:"row justify-content-center",children:e.jsx(g,{})})})}x.createRoot(document.getElementById("nuevoCurso")).render(e.jsx(p.StrictMode,{children:e.jsx(j,{})}));
