const API_URL =
"https://script.google.com/macros/s/AKfycbwVinCt06UJxDWd9yLcsHuWJWqrCDmBwEvQCxoLQ9MLCGVzFSXg93Bk9f0joIGJ3cC_/exec";

let dataBatch = [];
let dataMateri = [];

let selectedProgram = "";
let selectedBatch = "";

console.log("APP JS VERSI BARU");

window.addEventListener("load", () => {
    loadData();
});

async function loadData(){

    console.time("LOAD DATA");

    try{

        const response =
        await fetch(API_URL);

        const data =
        await response.json();

        dataBatch =
        data.batch || [];

        dataMateri =
        data.materi || [];

        console.timeEnd("LOAD DATA");

    }catch(error){

        console.error(error);

    }

}

/* =========================
   PROGRAM
========================= */

async function pilihProgram(program, btn){

    console.log("TOMBOL DIKLIK");
    console.log("Program:", program);
    btn.disabled = true;

btn.innerHTML =
'<i class="fa-solid fa-spinner fa-spin"></i> Memuat...';

    // kalau data belum masuk
    if(dataBatch.length === 0){

        console.log("Data belum siap, load ulang...");

        await loadData();

    }

    btn.disabled = false;

btn.innerHTML =
'Pilih Kelas';

    console.log("Data Batch:", dataBatch);

    selectedProgram = program;

    document
    .getElementById("batchModal")
    .classList.remove("hidden");

    document
    .getElementById("programTitle")
    .innerText =
    "Kelas " + program;

    const hasil =
    dataBatch.filter(item =>

        item.program
        .trim()
        .toLowerCase() ===

        program
        .trim()
        .toLowerCase()

    );

    console.log("Hasil Filter:", hasil);

    let html = "";

    hasil.forEach(item => {

        html += `

        <div class="batch-card">

            <h3>${item.bulan}</h3>

            <button
            onclick="pilihBatch('${item.bulan}')">

                Akses Kelas

            </button>

        </div>

        `;

    });

    document
    .getElementById("batchList")
    .innerHTML = html;

}

/* =========================
   BATCH
========================= */

function pilihBatch(bulan){

    selectedBatch = bulan;

    document
    .getElementById("kodeModal")
    .classList.remove("hidden");

    document
    .getElementById("batchTitle")
    .innerText =
    "Kode Akses - " + bulan;

}

/* =========================
   KODE AKSES
========================= */
function cekKode(){

const kode =
document
.getElementById("kodeInput")
.value
.trim();

const url =
API_URL +
"?action=cek" +
"&program=" +
encodeURIComponent(selectedProgram) +
"&bulan=" +
encodeURIComponent(selectedBatch) +
"&kode=" +
encodeURIComponent(kode);

fetch(url)
.then(res => res.json())
.then(result => {

if(!result.success){

showToast(
"❌ Kode akses salah",
"error"
);

return;

}

sessionStorage.setItem(
"program",
selectedProgram
);

sessionStorage.setItem(
"batch",
selectedBatch
);

sessionStorage.setItem(
"materi",
JSON.stringify(result.materi)
);

tutupModal();
tutupKodeModal();

showToast(
"📚 Membuka kelas...",
"success"
);

setTimeout(()=>{

window.location.href =
"dashboard.html";

},1500);

})
.catch(error => {

console.error(error);

showToast(
"❌ Gagal terhubung ke server",
"error"
);

});

}

function tutupModal(){

    document
    .getElementById("batchModal")
    .classList.add("hidden");

}

function tutupKodeModal(){

    document
    .getElementById("kodeModal")
    .classList.add("hidden");

}

function showToast(text,type){

const toast =
document.getElementById("toast");

const icon =
document.getElementById("toastIcon");

document
.getElementById("toastText")
.innerText = text;

toast.classList.remove(
"success",
"error"
);

if(type === "success"){

icon.className =
"fa-solid fa-circle-check";

}else{

icon.className =
"fa-solid fa-circle-xmark";

}

toast.classList.add(type);

toast.classList.add("show");

setTimeout(() => {

toast.classList.remove("show");

},3000);

}
