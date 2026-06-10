const API_URL =
"https://script.google.com/macros/s/AKfycbwVinCt06UJxDWd9yLcsHuWJWqrCDmBwEvQCxoLQ9MLCGVzFSXg93Bk9f0joIGJ3cC_/exec";

let dataBatch = [];
let dataMateri = [];

let selectedProgram = "";
let selectedBatch = "";

// Ambil data dari Apps Script saat website dibuka
async function loadData() {

    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        dataBatch = data.batch;
        dataMateri = data.materi;

        console.log("Batch:", dataBatch);
        console.log("Materi:", dataMateri);

    } catch(err){

        console.error(err);

        alert("Gagal mengambil data");

    }

}

loadData();

function pilihProgram(program){

    selectedProgram = program;

    document
    .getElementById("portal")
    .classList.remove("hidden");

    document
    .getElementById("programTitle")
    .innerText =
    "Program " + program;

    const batchProgram =
    dataBatch.filter(
        item => item.program === program
    );

    let html = "";

    batchProgram.forEach(item => {

        html += `
        <div class="program-card">

            <h3>${item.bulan}</h3>

            <p>
            Kelas Aktif
            </p>

            <button
            onclick="pilihBatch('${item.bulan}')">

                Pilih Batch

            </button>

        </div>
        `;

    });

    document
    .getElementById("batchList")
    .innerHTML = html;

    document
    .getElementById("portal")
    .scrollIntoView({
        behavior:'smooth'
    });

}

function pilihBatch(bulan){

    selectedBatch = bulan;

    document
    .getElementById("kodeSection")
    .classList.remove("hidden");

    document
    .getElementById("batchTitle")
    .innerText =
    "Kode Akses " + bulan;

}

function cekKode(){

    const kodeInput =
    document.getElementById("kodeInput").value;

    const validBatch =
    dataBatch.find(item =>

        item.program === selectedProgram &&
        item.bulan === selectedBatch &&
        item.kode === kodeInput

    );

    if(!validBatch){

        alert("Kode akses salah");

        return;

    }

    tampilkanMateri();

}

function tampilkanMateri(){

    document
    .getElementById("dashboard")
    .classList.remove("hidden");

    document
    .getElementById("dashboardTitle")
    .innerText =
    selectedProgram +
    " - " +
    selectedBatch;

    const materiBatch =
    dataMateri.filter(item =>

        item.program === selectedProgram &&
        item.bulan === selectedBatch

    );

    let html = "";

    materiBatch
    .sort((a,b)=>
        Number(a.pertemuan) -
        Number(b.pertemuan)
    )
    .forEach(item => {

        html += `
        <div class="faq-item">

            <p style="color:#2563eb;font-weight:bold">

                📅 ${item.tanggal}

            </p>

            <h3>

                Pertemuan ${item.pertemuan}

            </h3>

            <p>

                ${item.materi}

            </p>

            <br>

            <a
            href="${item.ppt}"
            target="_blank"
            class="btn-primary">

                📄 PPT

            </a>

            <a
            href="${item.rekaman}"
            target="_blank"
            class="btn-secondary">

                ▶ Rekaman

            </a>

        </div>
        `;

    });

    document
    .getElementById("timeline")
    .innerHTML = html;

    document
    .getElementById("dashboard")
    .scrollIntoView({
        behavior:'smooth'
    });

}
