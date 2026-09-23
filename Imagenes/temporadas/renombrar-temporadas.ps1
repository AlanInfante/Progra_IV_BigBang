# Renombra las imágenes de temporadas al formato que usa el código:
# t01-1.webp ... t12-3.webp
#
# Cómo usarlo:
#   1. Abrí PowerShell en la carpeta donde están las imágenes
#      (click derecho en la carpeta > "Abrir en Terminal").
#   2. Pegá:  .\renombrar-temporadas.ps1
#   3. Si Windows bloquea el script, antes corré:
#      Set-ExecutionPolicy -Scope Process Bypass

# Nombre actual -> nombre nuevo. Solo se listan los .webp: los .jpg y .avif
# quedan afuera a propósito (ver el aviso del final).
$mapa = @{
    "tp1_01.webp"  = "t01-1.webp";  "tp1_02.webp" = "t01-2.webp";  "tp1_03.webp" = "t01-3.webp"
    "tp2_1.webp"   = "t02-1.webp";  "tp2_2.webp"  = "t02-2.webp";  "tp2_3jpg.webp" = "t02-3.webp"
    "tp3_1.webp"   = "t03-1.webp";  "tp3_2.webp"  = "t03-2.webp";  "tp3_3.webp"  = "t03-3.webp"
    "tp4_1.webp"   = "t04-1.webp";  "tp4_2.webp"  = "t04-2.webp";  "tp4_03.webp" = "t04-3.webp"
    "tp5_1.webp"   = "t05-1.webp";  "tp5_2.webp"  = "t05-2.webp";  "tp5_3.webp"  = "t05-3.webp"
    "tp6_1.webp"   = "t06-1.webp";  "tp6_2.webp"  = "t06-2.webp";  "tp6_3.webp"  = "t06-3.webp"
    "tp7_1.webp"   = "t07-1.webp";  "tp7_2.webp"  = "t07-2.webp";  "tp7_3.webp"  = "t07-3.webp"
    "tp8_1.webp"   = "t08-1.webp";  "tp8_2.webp"  = "t08-2.webp";  "tp8_3.webp"  = "t08-3.webp"
    "tp9_1.webp"   = "t09-1.webp";  "tp9_2.webp"  = "t09-2.webp";  "tp9_3.webp"  = "t09-3.webp"
    "TP10_1.webp"  = "t10-1.webp";  "TP10_2.webp" = "t10-2.webp";  "TP10_3.webp" = "t10-3.webp"
    "TP11_1.webp"  = "t11-1.webp";  "tp11_2.webp" = "t11-2.webp";  "tp11_3.webp" = "t11-3.webp"
}

$renombrados = 0
foreach ($viejo in $mapa.Keys) {
    if (Test-Path $viejo) {
        # -Force permite el cambio de TP10 a t10: para Windows es el mismo
        # archivo, porque no distingue mayúsculas.
        Rename-Item -Path $viejo -NewName $mapa[$viejo] -Force
        Write-Host "  $viejo -> $($mapa[$viejo])"
        $renombrados++
    } else {
        Write-Host "  FALTA: $viejo" -ForegroundColor Yellow
    }
}

Write-Host "`n$renombrados archivos renombrados." -ForegroundColor Green
Write-Host "Faltan las 3 de la temporada 12: convertilas a WebP en Photopea"
Write-Host "y guardalas como t12-1.webp, t12-2.webp y t12-3.webp."
Write-Host "Borra tambien los duplicados: tp8_1.avif, tp8_3.jpg, tp11_2.jpg, tp11_3.jpg"
