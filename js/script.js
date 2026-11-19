document.getElementById('year').textContent=new Date().getFullYear();
const btn=document.getElementById('themeBtn');
btn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')){btn.textContent='☀️ Light'; localStorage.setItem('theme','dark')}
  else{btn.textContent='🌙 Dark'; localStorage.setItem('theme','light')}
});
if(localStorage.getItem('theme')==='dark'){document.body.classList.add('dark');btn.textContent='☀️ Light';}
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();alert('Message sent!');e.target.reset()});