<?php

class Segitiga
{
    protected float $tinggi;
    protected float $alas;
    protected float $sisi;

    public function __construct(float $tinggi = 0, float $alas = 0, float $sisi = 0)
    {
        $this->tinggi = $tinggi;
        $this->alas   = $alas;
        $this->sisi   = $sisi;
    }

    public function setTinggi(float $tinggi): void { $this->tinggi = $tinggi; }
    public function setAlas(float $alas): void     { $this->alas = $alas; }
    public function setSisi(float $sisi): void     { $this->sisi = $sisi; }

    public function getTinggi(): float { return $this->tinggi; }
    public function getAlas(): float   { return $this->alas; }
    public function getSisi(): float   { return $this->sisi; }

    public function tampilkan(): void
    {
        echo "Tinggi   : {$this->tinggi}\n";
        echo "Alas     : {$this->alas}\n";
        echo "Sisi     : {$this->sisi}\n";
    }
}
class SegitigaSamaKaki extends Segitiga
{
    public function hitungLuas(): float
    {
        return 0.5 * $this->alas * $this->tinggi;
    }

    public function hitungKeliling(): float
    {
        return $this->alas + (2 * $this->sisi);
    }
}
class SegitigaSikuSiku extends Segitiga
{
    public function getSisiMiring(): float
    {
        if ($this->sisi > 0) {
            return $this->sisi;
        }
        return sqrt(($this->alas ** 2) + ($this->tinggi ** 2));
    }

    public function hitungLuas(): float
    {
        return 0.5 * $this->alas * $this->tinggi;
    }

    public function hitungKeliling(): float
    {
        return $this->alas + $this->tinggi + $this->getSisiMiring();
    }
}
class SegitigaSamaSisi extends Segitiga
{
    public function __construct(float $sisi = 0)
    {
        parent::__construct(($sisi * sqrt(3)) / 2, $sisi, $sisi);
    }

    public function setSisi(float $sisi): void
    {
        $this->sisi   = $sisi;
        $this->alas   = $sisi;
        $this->tinggi = ($sisi * sqrt(3)) / 2;
    }

    public function hitungLuas(): float
    {
        return 0.5 * $this->alas * $this->tinggi;
    }

    public function hitungKeliling(): float
    {
        return 3 * $this->sisi;
    }
}