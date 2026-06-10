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

        const response = await fetch(API_URL);
        const data = await response.json();

        dataBatch = data.batch || [];
        dataMateri = data.materi || [];

        console.log("Data Loaded");

    } catch (err) {

        console.error(err);
        alert("Gagal mengambil data");

    }

}

function pilihProgram(program) {

    selectedProgram = program;

    document
        .getElementById("portal")
        .classList.remove("hidden");

    document
        .getElementById("programTitle")
        .innerText =
        "Program " + program;

    const hasil =
        dataBatch.filter(
            item => item.program === program
        );

    let html = "";

    hasil.forEach(item => {

        html += `
        <div class="batch-card">

            <h3>${item.bulan}</h3>

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

}

function pilihBatch(bulan) {

    selectedBatch = bulan;

    document
        .getElementById("kodeSection")
        .classList.remove("hidden");

    document
        .getElementById("batchTitle")
        .innerText =
        "Kode Akses " + bulan;

}

function cekKode() {

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

    if (!valid) {

        alert("Kode akses salah");
        return;

    }

    tampilkanMateri();

}

function tampilkanMateri() {

    document
        .getElementById("dashboard")
        .classList.remove("hidden");

    document
        .getElementById("dashboardTitle")
        .innerText =
        selectedProgram +
        " - " +
        selectedBatch;

    const materi =
        dataMateri.filter(item =>

            item.program === selectedProgram &&
            item.bulan === selectedBatch

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

}
