(()=>{"use strict";const e={apiKey:"AIzaSyAsMCiUcLm97v6yrth166NxJi2PvBsDhUU",authDomain:"plv-projekt.firebaseapp.com",databaseURL:"https://plv-projekt-default-rtdb.europe-west1.firebasedatabase.app",projectId:"plv-projekt",storageBucket:"plv-projekt.appspot.com",messagingSenderId:"754434030320",appId:"1:754434030320:web:119fffabf4f782d030a035"};firebase.initializeApp(e);const t=firebase.database(),a=document.getElementById("todoForm"),n=document.getElementById("titleInput"),s=document.getElementById("descriptionInput"),p=document.getElementById("dateInput"),d=document.getElementById("todoList");a.addEventListener("submit",(e=>{e.preventDefault();const d=n.value,o=s.value,i=p.value;t.ref("tasks").push().set({title:d,description:o,date:i,completed:!1}),a.reset()})),t.ref("tasks").on("value",(e=>{d.innerHTML="",e.forEach((e=>{const t=e.val(),a=e.key,n=document.createElement("li");n.id=a,n.className="task-item",t.completed&&n.classList.add("completed"),n.innerHTML=`\n        <h3>${t.title}</h3>\n        <p>${t.description}</p>\n        <p>Due Date: ${t.date}</p>\n        <button onclick="completeTask('${a}')">Complete</button>\n        <button onclick="deleteTask('${a}')">Delete</button>`;const s=new Date;new Date(t.date)<=s&&(n.classList.add("expired"),n.innerHTML+='<span class="icon"></span>'),d.appendChild(n)}))}))})();