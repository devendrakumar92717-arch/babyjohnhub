const data=['Action','Comedy','Drama','Thriller','Romance','Adventure','Sci-Fi','Horror'];
const grid=document.getElementById('grid');
function draw(f=''){grid.innerHTML='';data.filter(x=>x.toLowerCase().includes(f.toLowerCase())).forEach(x=>{const c=document.createElement('div');c.className='card';c.innerHTML=`<div class="poster">🎥</div><h3>${x}</h3><p>Demo description</p>`;grid.appendChild(c);});}
draw();search.oninput=e=>draw(e.target.value);