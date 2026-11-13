# Vintage Scrapbook — Birthday Website

Website ulang tahun untuk Alaricku, dengan nuansa vintage scrapbook abu-abu.

## Menjalankan di Visual Studio Code
1. Extract ZIP ini.
2. Buka folder `vintage-scrapbook-alaricku` di VS Code.
3. Install extension **Live Server** (publisher: Ritwick Dey).
4. Klik kanan `index.html` → **Open with Live Server**.

## Mengganti foto
- Simpan foto kalian ke folder `assets`.
- Buka `index.html`, cari `photo-placeholder.svg`, lalu ganti nama file gambarnya, misalnya `foto-kita-1.jpg`.
- Ada empat slot foto di bagian `Our tiny gallery` dan satu foto utama di halaman awal.
- Sesuaikan caption tepat di bawah setiap tag `<img>`.

## Menambahkan lagu
Pilihan 1 (lagu ikut terpaket saat di-upload ke GitHub):
1. Letakkan file MP3 milikmu di folder `assets`.
2. Ubah namanya menjadi `lagu-kita.mp3`.
3. Pemutar lagu di halaman akan otomatis membaca file tersebut.

Pilihan 2 (tes lagu tanpa mengubah file):
- Buka website, lalu gunakan tombol pilih file di bagian musik untuk memilih audio dari perangkatmu. Lagu akan diputar di browser saat itu juga.

Catatan: file lagu tidak disertakan. Gunakan file audio yang kamu miliki hak untuk menggunakannya.

## Mengubah isi
- Teks, tanggal, caption, dan timeline: `index.html`
- Warna, font, layout, dan dekorasi: `style.css`
- Interaksi tombol kejutan dan pemutar audio: `script.js`
- Ilustrasi dekoratif: folder `assets` (SVG dapat diedit sebagai teks/kode).
