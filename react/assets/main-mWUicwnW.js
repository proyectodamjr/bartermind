import{j as e,r as n,c as j,R as x}from"./client-BSvFEBJr.js";/* empty css               */import"./main-CtmYxc3V.js";import{s as i}from"./sweetalert.min-BWbkhnVz.js";const f=({videoUrl:t})=>e.jsx("div",{className:"video-wrapper",children:e.jsx("video",{className:"video-player",controls:!0,children:e.jsx("source",{src:t,type:"video/mp4"})})}),y=()=>{const[t,d]=n.useState([]),[l,m]=n.useState([]);n.useEffect(()=>{const r=async()=>{try{const h=(await(await fetch("/api/videos")).json()).videos.map(c=>({...c,enlace:`./uploads/${c.enlace}`}));d(h)}catch(s){console.error("Error fetching videos:",s)}},o=async()=>{try{const a=await(await fetch("/api/user")).json();m(a)}catch(s){console.error("Error fetching user data:",s)}};r(),o()},[]);const u=async r=>{try{const o=await fetch("/api/comentarios",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comentario:"Quiere hacer un Trueque contigo!",idCurso:r.idCurso,usuarios_id:r.usuarios_id,comentarista_id1:1,video_id:r.id})}),s=await o.json();o.ok?i("¡Trueque enviado!","El comentario se ha enviado correctamente.","success"):i("Error",s.message,"error")}catch(o){console.error("Error inserting comment:",o),i("Error","No se pudo enviar el comentario.","error")}},p=async r=>{try{const o=await fetch("/api/eliminarVideo",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({comentario:"Tu video ha sido eliminado por un administrador",idCurso:r.idCurso,usuarios_id:r.usuarios_id,comentarista_id1:1,video_id:r.id})}),s=await o.json();o.ok?i("¡Video eliminado!","El video ha sido eliminado correctamente.","success"):i("Error",s.message,"error")}catch(o){console.error("Error inserting comment:",o),i("Error","No se pudo eliminar el video.","error")}};return e.jsx("div",{className:"container d-flex flex-column",children:t.map(r=>e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-12 col-md-8 col-lg-8 ",children:e.jsx("div",{className:"video-item w-100 d-flex flex-column justify-content-end mb-4 position-relative",children:e.jsx(f,{videoUrl:r.enlace})},r.id)}),e.jsxs("div",{className:"col-12 col-md-4 col-lg-4 mb-4",children:[e.jsx("h5",{children:r.titulo}),e.jsx("button",{className:"btn btn-primary",onClick:()=>u(r),children:"Trueque"}),e.jsx("br",{}),l.admin==="S"&&e.jsx("button",{className:"btn btn-danger mt-1",onClick:()=>p(r),children:"Eliminar"})]})]}))})};function E(){return e.jsx("div",{className:"container-videos",children:e.jsx(y,{})})}j.createRoot(document.getElementById("rootVideo")).render(e.jsx(x.StrictMode,{children:e.jsx(E,{})}));
