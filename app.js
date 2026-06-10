const API_URL =
"https://script.google.com/macros/s/AKfycbwVinCt06UJxDWd9yLcsHuWJWqrCDmBwEvQCxoLQ9MLCGVzFSXg93Bk9f0joIGJ3cC_/exec";

let dataBatch = [];
let dataMateri = [];

let selectedProgram = "";
let selectedBatch = "";

// Load data dari Apps Script
async function loadData() {
    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        dataBatch = data.batch;
        dataMateri = data.materi;

        console.log("Data berhasil dimuat");

    } catch (err) {

        console.error(err);
        alert("Gagal mengambil data dari server");

    }
}

loadData();

function pilihProgram(program) {

    selectedProgram = program;

    const portal = document.getElementById("portal");
    const programTitle = document.getElementById("programTitle");
    const batchList = document.getElementById("batchList");

    portal.classList.remove("hidden");

    programTitle.innerText =
        "Batch Program " + program;

    const batchProgram = dataBatch.filter(
        item => item.program === program
    );

    let html = "";

    batchProgram.forEach(item => {

        html += `
        <div class="batch-card">

            <h3>${item.bulan}</h3>

            <p>Klik untuk membuka batch</p>

            <button
            onclick="pilihBatch('${item.bulan}')">

                Pilih Batch

            </button>

        </div>
        `;

    });

    batchList.innerHTML = html;

    portal.scrollIntoView({
        behavior: "smooth"
    });
}

function pilihBatch(bulan) {

    selectedBatch = bulan;

    document
        .getElementById("kodeSection")
        .classList.remove("hidden");

    document
        .getElementById("batchTitle")
        .innerText =
        "Kode Akses - " + bulan;

    document
        .getElementById("kodeSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function cekKode() {

    const kode =
        document.getElementById("kodeInput")
        .value
        .trim();

    const valid = dataBatch.find(item =>

        item.program === selectedProgram &&
        item.bulan === selectedBatch &&
        item.kode === kode

    );

    if (!valid) {

        alert("Kode akses salah");

        return;

    }

    tampilkanMateri();
}

function tampilkanMateri() {

    const dashboard =
        document.getElementById("dashboard");

    dashboard.classList.remove("hidden");

    document
        .getElementById("dashboardTitle")
        .innerText =
        selectedProgram +
        " - " +
        selectedBatch;

    const materi = dataMateri.filter(item =>

        item.program === selectedProgram &&
        item.bulan === selectedBatch

    );

    materi.sort((a, b) =>
        Number(a.pertemuan) -
        Number(b.pertemuan)
    );

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

                    PPT

                </a>

                <a
                href="${item.rekaman}"
                target="_blank"
                class="btn video">

                    Rekaman

                </a>

            </div>

        </div>
        `;
    });

    document
        .getElementById("timeline")
        .innerHTML = html;

    dashboard.scrollIntoView({
        behavior: "smooth"
    });
}

function pilihBatch(bulan){

    alert("Batch dipilih: " + bulan);

}
