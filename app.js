
const materi = [
{
tanggal:'09 September 2026',
judul:'Keperawatan Jiwa',
ppt:'https://drive.google.com/',
video:'https://youtube.com/'
},
{
tanggal:'10 September 2026',
judul:'Maternitas',
ppt:'https://drive.google.com/',
video:'https://youtube.com/'
},
{
tanggal:'11 September 2026',
judul:'Keperawatan Anak',
ppt:'https://drive.google.com/',
video:'https://youtube.com/'
},
{
tanggal:'12 September 2026',
judul:'KMB',
ppt:'https://drive.google.com/',
video:'https://youtube.com/'
}
];

const grid=document.getElementById('materiGrid');
document.getElementById('materiCount').innerText=materi.length;

function render(data){
grid.innerHTML='';
data.forEach(item=>{
grid.innerHTML += `
<div class="card">
<div class="badge">${item.tanggal}</div>
<h3>${item.judul}</h3>
<div class="btns">
<a class="btn drive" target="_blank" href="${item.ppt}">PPT</a>
<a class="btn youtube" target="_blank" href="${item.video}">Rekaman</a>
</div>
</div>`;
});
}
render(materi);

document.getElementById('search').addEventListener('input',e=>{
const q=e.target.value.toLowerCase();
render(materi.filter(x=>x.judul.toLowerCase().includes(q)));
});
