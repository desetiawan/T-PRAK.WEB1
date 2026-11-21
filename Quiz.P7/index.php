<?php
    require_once 'objek.php';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Class Segitiga</title>
    <style>
        body { font-family: sans-serif; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
        h2   { margin-bottom: 0.25rem; }
        pre  { background: #f4f4f4; padding: 0.75rem 1rem; border-radius: 6px; }
    </style>
</head>
<body>

<h1>Class Segitiga</h1>

<h2>Segitiga Sama Kaki</h2>
<pre><?php
$samaKaki = new SegitigaSamaKaki(8, 6, 10); // tinggi, alas, sisi (kaki)
$samaKaki->tampilkan();
echo "Luas     : " . $samaKaki->hitungLuas() . "\n";
echo "Keliling : " . $samaKaki->hitungKeliling() . "\n";
?></pre>

<h2>Segitiga Siku-siku</h2>
<pre><?php
$sikuSiku = new SegitigaSikuSiku(4, 3, 5); // tinggi, alas, sisi miring
$sikuSiku->tampilkan();
echo "Luas     : " . $sikuSiku->hitungLuas() . "\n";
echo "Keliling : " . $sikuSiku->hitungKeliling() . "\n";
?></pre>

<h2>Segitiga Sama Sisi</h2>
<pre><?php
$samaSisi = new SegitigaSamaSisi(6); // cukup mengisi sisi
$samaSisi->tampilkan();
echo "Luas     : " . round($samaSisi->hitungLuas(), 2) . "\n";
echo "Keliling : " . $samaSisi->hitungKeliling() . "\n";
?></pre>

</body>
</html>