const API_URL =
"https://script.google.com/macros/s/AKfycbwVinCt06UJxDWd9yLcsHuWJWqrCDmBwEvQCxoLQ9MLCGVzFSXg93Bk9f0joIGJ3cC_/exec";

let dataBatch = [];
let dataMateri = [];

let selectedProgram = "";
let selectedBatch = "";

window.onload = async () => {

    await loadData();

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

    selectedProgram = program;

    document
    .getElementById("batchModal")
    .classList.remove("hidden");

    document
    .getElementById("programTitle")
    .innerText =
    "Batch " + program;

    const hasil =
    dataBatch.filter(item =>

        item.program === program

    );

    let html = "";

    hasil.forEach(item => {

        html += `

        <div class="batch-card">

            <h3>

                ${item.bulan}

            </h3>

            <button
            onclick="pilihBatch('${item.bulan}')">

                Masuk Batch

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

        alert(
            "Kode akses salah"
        );

        return;

    }

tutupModal();
tutupKodeModal();

console.log(
"REDIRECT:",
selectedProgram,
selectedBatch
);

window.location.href =
`dashboard.html?program=${encodeURIComponent(selectedProgram)}&batch=${encodeURIComponent(selectedBatch)}`;

}

/* =========================
   DASHBOARD
========================= */



    let html = "";

    materi.forEach(item => {

        html += `

        <div class="timeline-item">

            <div class="tanggal">

                📅 ${item.tanggal}

            </div>

            <h3>

                Pertemuan ${item.pertemuan}

            </h3>

            <p>

                ${item.materi}

            </p>

            <div class="btn-group">

                <a
                href="${item.ppt}"
                target="_blank"
                class="btn ppt">

                    📄 PPT

                </a>

                <a
                href="${item.rekaman}"
                target="_blank"
                class="btn video">

                    ▶ Rekaman

                </a>

            </div>

        </div>

        `;

    });

    document
    .getElementById("timeline")
    .innerHTML = html;

    document
    .getElementById("dashboard")
    .scrollIntoView({
        behavior:"smooth"
    });

}

/* =========================
   MODAL
========================= */

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
