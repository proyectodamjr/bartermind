import{r,j as e,S as x,c as u,R as h}from"./SelectDropdown-T8KNT9Nu.js";import{s as n}from"./sweetalert.min-DdPXW3CH.js";const p=()=>{const[c,g]=r.useState(""),[t,i]=r.useState(""),[a,l]=r.useState(""),d=async()=>{const s=new FormData;s.append("caption",t),s.append("category",a);try{const m=await(await fetch("/api/users/crearCurso",{method:"POST",body:s})).json();n({title:"Curso creado!",text:m.message,icon:"success"}).then(()=>{window.location.href="/misCursos.html"})}catch(o){console.error(o),n({title:"Error",text:data.message,icon:"error"})}};return e.jsxs("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-2 max-w-sm",children:[e.jsx("h1",{children:"Crear Curso"}),e.jsxs("div",{class:"mt-3",children:[e.jsx("label",{htmlFor:"caption",className:"block text-sm font-medium text-gray-700",children:"Título del curso"}),e.jsx("div",{children:e.jsx("input",{type:"text",id:"caption",name:"caption",value:t,onChange:s=>i(s.target.value),placeholder:"Título",className:"focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300 w-100"})})]}),e.jsxs("div",{class:"mt-3",children:[e.jsx("label",{htmlFor:"category",className:"block text-sm font-medium text-gray-700",children:"Categoría"}),e.jsx(x,{setCategory:l})]}),e.jsx("br",{}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{type:"button",onClick:d,disabled:!t||!a,class:"btn btn-outline-primary mt-3",children:"Upload"}),e.jsx("a",{class:"btn btn-outline-danger mt-3 ms-3",href:"/misCursos.html",children:"Cancelar"})]})]}),e.jsx("div",{children:e.jsx("p",{className:"text-sm text-gray-500",children:c})})]})};function j(){return e.jsx("div",{class:"container",children:e.jsx("div",{class:"row justify-content-center",children:e.jsx(p,{})})})}u.createRoot(document.getElementById("nuevoCurso")).render(e.jsx(h.StrictMode,{children:e.jsx(j,{})}));
