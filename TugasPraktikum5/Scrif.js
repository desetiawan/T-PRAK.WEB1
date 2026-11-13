var produk = [
  { id: 1, nama: "Laptop Gaming", harga: 12500000, stok: 5 },
  { id: 2, nama: "Mouse Wireless", harga: 150000, stok: 10 },
  { id: 3, nama: "Keyboard Mekanik", harga: 450000, stok: 7 },
  { id: 4, nama: "Headset Bluetooth", harga: 320000, stok: 3 },
  { id: 5, nama: "Monitor 24 Inch", harga: 1800000, stok: 4 },
  { id: 6, nama: "Flashdisk 64GB", harga: 85000, stok: 1 },
  { id: 7, nama: "Webcam Full HD", harga: 275000, stok: 6 },
  { id: 8, nama: "Speaker Mini", harga: 199000, stok: 8 }
];

var keranjang = [];

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function cariProduk(id) {
  for (var i = 0; i < produk.length; i++) {
    if (produk[i].id === id) {
      return produk[i];
    }
  }
  return null;
}

function cariItem(id) {
  for (var i = 0; i < keranjang.length; i++) {
    if (keranjang[i].id === id) {
      return keranjang[i];
    }
  }
  return null;
}

function tampilkanProduk() {
  var daftar = document.getElementById("daftar-produk");

  for (var i = 0; i < produk.length; i++) {
    var p = produk[i];

    var kartu = document.createElement("div");
    kartu.className = "produk";
    kartu.setAttribute("data-id", p.id);

    var gambar = document.createElement("div");
    gambar.className = "gambar";
    gambar.appendChild(document.createTextNode(p.nama.charAt(0)));

    var nama = document.createElement("div");
    nama.className = "nama";
    nama.appendChild(document.createTextNode(p.nama));

    var harga = document.createElement("div");
    harga.className = "harga";
    harga.appendChild(document.createTextNode(formatRupiah(p.harga)));

    var stok = document.createElement("div");
    stok.className = "stok";
    stok.appendChild(document.createTextNode("Stok: " + p.stok));

    var tombol = document.createElement("button");
    tombol.className = "btn btn-tambah";
    tombol.appendChild(document.createTextNode("Tambah ke Keranjang"));

    kartu.appendChild(gambar);
    kartu.appendChild(nama);
    kartu.appendChild(harga);
    kartu.appendChild(stok);
    kartu.appendChild(tombol);

    daftar.appendChild(kartu);
  }
}

$(document).ready(function () {

  tampilkanProduk();

  function perbaruiStok(id) {
    var p = cariProduk(id);
    var $kartu = $('.produk[data-id="' + id + '"]');
    if (p.stok > 0) {
      $kartu.removeClass("habis");
      $kartu.find(".stok").text("Stok: " + p.stok);
    } else {
      $kartu.addClass("habis");
      $kartu.find(".stok").text("Stok habis");
    }
  }

  function perbaruiRingkasanKeranjang() {
    var jumlah = 0;
    var total = 0;
    for (var i = 0; i < keranjang.length; i++) {
      jumlah += keranjang[i].jumlah;
      total += keranjang[i].harga * keranjang[i].jumlah;
    }
    $("#jumlah-item").text(jumlah);
    $("#total-harga").text(formatRupiah(total));
    $("#keranjang-kosong").toggle(keranjang.length === 0);
  }

  $("#daftar-produk").on("click", ".btn-tambah", function () {
    var id = parseInt($(this).closest(".produk").attr("data-id"), 10);
    var p = cariProduk(id);

    if (p.stok <= 0) {
      alert('Maaf, stok "' + p.nama + '" sudah habis!');
      return;
    }

    p.stok--;
    var item = cariItem(id);

    if (item) {
      item.jumlah++;
      var $li = $("#item-" + id);
      $li.find(".jumlah").text(item.jumlah);
      $li.find(".subtotal").text(formatRupiah(item.harga * item.jumlah));
    } else {
      item = { id: p.id, nama: p.nama, harga: p.harga, jumlah: 1 };
      keranjang.push(item);

      var $baru = $('<li class="item"></li>')
        .attr("id", "item-" + id)
        .attr("data-id", id)
        .append(
          $('<div class="info-item"></div>')
            .append($('<div class="nama-item"></div>').text(item.nama))
            .append(
              $('<div class="detail-item"></div>')
                .append($("<span></span>").text(formatRupiah(item.harga) + " x "))
                .append($('<span class="jumlah"></span>').text(item.jumlah))
                .append($("<span></span>").text(" = "))
                .append($('<span class="subtotal"></span>').text(formatRupiah(item.harga)))
            )
        )
        .append($('<button class="btn btn-bahaya btn-kecil btn-hapus"></button>').text("Hapus"))
        .hide();

      $("#daftar-keranjang").append($baru);
      $baru.fadeIn(400);
    }

    perbaruiStok(id);
    perbaruiRingkasanKeranjang();
  });

  $("#daftar-keranjang").on("click", ".btn-hapus", function () {
    var $li = $(this).closest("li");
    var id = parseInt($li.attr("data-id"), 10);
    var item = cariItem(id);

    if (!confirm('Hapus "' + item.nama + '" dari keranjang?')) {
      return;
    }

    cariProduk(id).stok += item.jumlah;
    keranjang.splice(keranjang.indexOf(item), 1);
    perbaruiStok(id);

    $li.fadeOut(400, function () {
      $(this).remove();
      perbaruiRingkasanKeranjang();
    });
  });

  $("#btn-kosongkan").on("click", function () {
    if (keranjang.length === 0) {
      alert("Keranjang sudah kosong.");
      return;
    }

    if (!confirm("Yakin ingin mengosongkan seluruh keranjang?")) {
      return;
    }

    for (var i = 0; i < keranjang.length; i++) {
      cariProduk(keranjang[i].id).stok += keranjang[i].jumlah;
      perbaruiStok(keranjang[i].id);
    }
    keranjang = [];

    $("#daftar-keranjang").empty();
    perbaruiRingkasanKeranjang();
  });

  $("#btn-toggle-keranjang").on("click", function () {
    $("#isi-keranjang").fadeToggle(300);
  });

  $("#btn-checkout").on("click", function () {
    if (keranjang.length === 0) {
      alert("Keranjang masih kosong. Tambahkan produk terlebih dahulu.");
      return;
    }

    var nama = prompt("Masukkan nama pembeli:");
    if (nama === null || $.trim(nama) === "") {
      alert("Checkout dibatalkan karena nama pembeli belum diisi.");
      return;
    }
    nama = $.trim(nama);

    var $daftar = $("<ul></ul>");
    var total = 0;
    for (var i = 0; i < keranjang.length; i++) {
      var it = keranjang[i];
      var subtotal = it.harga * it.jumlah;
      total += subtotal;
      $daftar.append(
        $("<li></li>").text(it.nama + " x " + it.jumlah + " = " + formatRupiah(subtotal))
      );
    }

    $("#ringkasan")
      .empty()
      .append($("<h2></h2>").text("Ringkasan Pesanan"))
      .append($("<p></p>").text("Nama pembeli: " + nama))
      .append($("<p></p>").text("Daftar item:"))
      .append($daftar)
      .append($("<p></p>").append($("<strong></strong>").text("Total: " + formatRupiah(total))))
      .append($("<p></p>").text("Terima kasih telah berbelanja!"))
      .hide()
      .fadeIn(500);

    keranjang = [];
    $("#daftar-keranjang").empty();
    perbaruiRingkasanKeranjang();

    $("html, body").animate({ scrollTop: $("#ringkasan").offset().top - 20 }, 400);
  });

  $("#cari").on("input keyup", function () {
    var kataKunci = $(this).val().toLowerCase();
    var adaYangCocok = false;

    $(".produk").each(function () {
      var nama = $(this).find(".nama").text().toLowerCase();
      var cocok = nama.indexOf(kataKunci) !== -1;
      $(this).toggle(cocok);
      if (cocok) {
        adaYangCocok = true;
      }
    });

    $("#tidak-ditemukan").toggle(!adaYangCocok);
  });

  perbaruiRingkasanKeranjang();
});