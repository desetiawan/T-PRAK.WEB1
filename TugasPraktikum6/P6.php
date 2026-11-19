<?php
echo "<h3>Soal 1: Bilangan Genap (1 - 10)</h3>";

for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 == 0) {
        echo $i . " ";
    }
}

echo "<hr>";

echo "<h3>Soal 2: Tabel Perkalian</h3>";

echo "<table border='1' cellpadding='4' cellspacing='2'>";

echo "<tr>";
echo "<td>bilangan</td>";
for ($k = 1; $k <= 10; $k++) {
    echo "<td bgcolor='lime' align='center'>$k</td>";
}
echo "</tr>";

for ($baris = 1; $baris <= 10; $baris++) {
    echo "<tr>";
    echo "<td bgcolor='lime' width='100'>$baris</td>";

    for ($kolom = 1; $kolom <= 10; $kolom++) {
        $hasil = $baris * $kolom;

        if ($hasil % 2 == 1) {
            $warna = "yellow";
        } else {
            $warna = "cyan";
        }

        echo "<td bgcolor='$warna' align='center'>$hasil</td>";
    }
    echo "</tr>";
}

echo "</table>";
?>