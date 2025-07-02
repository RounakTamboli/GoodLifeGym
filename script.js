document.addEventListener('DOMContentLoaded',()=>{
  const hamburger=document.getElementById('hamburger');
  const nav=document.getElementById('nav-links');
  if(hamburger){hamburger.addEventListener('click',()=>nav.classList.toggle('show'));}

  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      document.getElementById('form-status').textContent='Thanks! We will get back to you soon.';
      form.reset();
    });
  }
});