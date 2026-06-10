console.log("MCU APP LOADED");

const API_URL =
"https://script.google.com/macros/s/AKfycbwVinCt06UJxDWd9yLcsHuWJWqrCDmBwEvQCxoLQ9MLCGVzFSXg93Bk9f0joIGJ3cC_/exec";

let dataBatch = [];
let dataMateri = [];

let selectedProgram = "";
let selectedBatch = "";

window.onload = async function () {
    await loadData();
};

async function loadData() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        console.log("API RESPONSE:", data);

        dataBatch = data.batch || [];
        dataMateri = data.materi || [];

        console.log("Batch:", dataBatch);
        console.log("Materi:", dataMateri);

    } catch (error) {

        console.error("ERROR LOAD API:", error);

        alert("Gagal mengambil data API");

    }

}

function pilihProgram(program) {

    console.log("PROGRAM:", program);
    console.log("DATA BATCH:", dataBatch);

    selectedProgram = program;

    const portal = document.getElementById("portal");

    portal.classList.remove("hidden");

    document.getElementById("programTitle").innerText =
        "Program " + program;

    const hasil = dataBatch.filter(
        item => item.program === program
    );

    console.log("HASIL FILTER:", hasil);

    let html = "";

    hasil.forEach(item => {

        html += `
        <div class="batch-card">

            <h3>${item.bulan}</h3>

            <button
type="button"
onclick="pilihBatch('${item.bulan}')">

    Pilih Batch

</button>
        </div>
        `;

    });

    if (html === "") {

        html = `
        <div class="batch-card">

            <h3>Tidak ada batch ditemukan</h3>

        </div>
        `;
    }

    document.getElementById("batchList").innerHTML = html;
}

function pilihBatch(bulan) {

    console.log("BATCH DIKLIK:", bulan);

    selectedBatch = bulan;

    const kodeSection =
        document.getElementById("kodeSection");

    kodeSection.classList.remove("hidden");

    document.getElementById("batchTitle")
        .innerText =
        "Kode Akses " + bulan;

    kodeSection.scrollIntoView({
        behavior: "smooth"
    });

}

function cekKode() {

    const kode =
        document.getElementById("kodeInput")
        .value
        .trim();

    console.log("KODE:", kode);

    const valid = dataBatch.find(item =>

        item.program === selectedProgram &&
        item.bulan === selectedBatch &&
        item.kode === kode

    );

    console.log("VALID:", valid);

    if (!valid) {

        alert("Kode salah");

        return;

    }

    tampilkanMateri();

}

function tampilkanMateri() {

    document
        .getElementById("dashboard")
        .classList.remove("hidden");

    const materi =
        dataMateri.filter(item =>

            item.program === selectedProgram &&
            item.bulan === selectedBatch

        );

    console.log("MATERI:", materi);

    let html = "";

    materi.forEach(item => {

        html += `
        <div class="timeline-item">

            <div class="tanggal">
                ${item.tanggal}
            </div>

            <h3>
                Pertemuan ${item.pertemuan}
            </h3>

            <p>
                ${item.materi}
            </p>

        </div>
        `;

    });

    document
        .getElementById("timeline")
        .innerHTML = html;

}
