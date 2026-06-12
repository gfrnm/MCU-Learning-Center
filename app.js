const API_URL =
"https://script.google.com/macros/s/AKfycbwVinCt06UJxDWd9yLcsHuWJWqrCDmBwEvQCxoLQ9MLCGVzFSXg93Bk9f0joIGJ3cC_/exec";

let dataBatch = [];
let dataMateri = [];

let selectedProgram = "";
let selectedBatch = "";

window.onload = async () => {

    showToast(
    "📚 Memuat data...",
    "success"
    );

    await loadData();

    console.log(
    "Data siap digunakan"
    );

};

async function loadData() {

    try {

        const response =
            await fetch(API_URL);

        const data =
            await response.json();

        dataBatch =
            data.batch || [];

        dataMateri =
            data.materi || [];

        console.log("Data Loaded");

    }

    catch(error){

        console.error(error);

        alert(
            "Gagal mengambil data"
        );

    }

}

/* =========================
   PROGRAM
========================= */

function pilihProgram(program){

    console.log("TOMBOL DIKLIK");
    console.log("Program:", program);
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

            <h3>

                ${item.bulan}

            </h3>

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

    const valid =

    dataBatch.find(item =>

        item.program === selectedProgram &&
        item.bulan === selectedBatch &&
        item.kode === kode

    );

    if(!valid){

    showToast(
    "❌ Kode akses salah",
    "error"
    );

    return;

}

showToast(
"📚 Membuka kelas...",
"success"
);

tutupModal();
tutupKodeModal();

console.log(
"REDIRECT:",
selectedProgram,
selectedBatch
);

setTimeout(() => {

window.location.href =
`dashboard.html?program=${encodeURIComponent(selectedProgram)}&batch=${encodeURIComponent(selectedBatch)}`;

},1500);

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
