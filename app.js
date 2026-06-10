function pilihProgram(program){

document
.getElementById("portal")
.classList.remove("hidden");

document
.getElementById("programTitle")
.innerText =
"Program " + program;

document
.getElementById("batchList")
.innerHTML =
`
<div class="program-card">

<h3>Maret 2026</h3>

<p>12 Pertemuan</p>

<button>

Pilih Batch

</button>

</div>
`;

}
