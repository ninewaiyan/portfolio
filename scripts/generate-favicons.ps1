# Export the existing XCIX favicon as font-independent SVG and raster fallbacks.
# Windows-only maintenance helper; no build-time or application dependency.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$assetRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../public'))
$culture = [System.Globalization.CultureInfo]::InvariantCulture
$font = New-Object System.Drawing.FontFamily('Consolas')
$lettering = New-Object System.Drawing.Drawing2D.GraphicsPath
$lettering.AddString('XCIX', $font, [int][System.Drawing.FontStyle]::Bold, 19, [System.Drawing.PointF]::Empty, [System.Drawing.StringFormat]::GenericTypographic)
$bounds = $lettering.GetBounds()
$position = New-Object System.Drawing.Drawing2D.Matrix
$position.Translate([single](29 - ($bounds.Left + $bounds.Width / 2)), [single](32 - ($bounds.Top + $bounds.Height / 2)))
$lettering.Transform($position)

# Preserve the original dark tile, light lettering, and red accent dot.
$tile = New-Object System.Drawing.Drawing2D.GraphicsPath
$tile.AddArc(0, 0, 24, 24, 180, 90)
$tile.AddArc(40, 0, 24, 24, 270, 90)
$tile.AddArc(40, 40, 24, 24, 0, 90)
$tile.AddArc(0, 40, 24, 24, 90, 90)
$tile.CloseFigure()
$background = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#100e13'))
$foreground = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#eaf0f2'))
$accent = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#ff8296'))

function Format-Point($point) {
    return $point.X.ToString('0.###', $culture) + ' ' + $point.Y.ToString('0.###', $culture)
}
$commands = New-Object System.Collections.Generic.List[string]
$points = $lettering.PathPoints
$types = $lettering.PathTypes
for ($index = 0; $index -lt $points.Length; $index++) {
    switch ($types[$index] -band 7) {
        0 { $commands.Add('M' + (Format-Point $points[$index])) }
        1 { $commands.Add('L' + (Format-Point $points[$index])) }
        3 {
            $commands.Add('C' + (Format-Point $points[$index]) + ' ' + (Format-Point $points[$index + 1]) + ' ' + (Format-Point $points[$index + 2]))
            $index += 2
        }
        default { throw 'Unsupported path segment.' }
    }
    if ($types[$index] -band 128) { $commands.Add('Z') }
}
$svg = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><title>XCIX - Nine Wai Yan</title><rect width="64" height="64" rx="12" fill="#100e13"/><path fill="#eaf0f2" d="' + ($commands -join ' ') + '"/><circle cx="56" cy="37" r="2.5" fill="#ff8296"/></svg>'
[System.IO.File]::WriteAllText((Join-Path $assetRoot 'favicon.svg'), $svg + "`n", (New-Object System.Text.UTF8Encoding($false)))

function Export-IconPng([int]$size, [bool]$opaque) {
    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    if ($opaque) { $graphics.Clear($background.Color) } else { $graphics.Clear([System.Drawing.Color]::Transparent) }
    $graphics.ScaleTransform([single]($size / 64), [single]($size / 64))
    $graphics.FillPath($background, $tile)
    $graphics.FillPath($foreground, $lettering)
    $graphics.FillEllipse($accent, 53.5, 34.5, 5, 5)
    $stream = New-Object System.IO.MemoryStream
    $bitmap.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
    $bytes = $stream.ToArray()
    $stream.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
    return ,$bytes
}

[System.IO.File]::WriteAllBytes((Join-Path $assetRoot 'favicon.png'), (Export-IconPng 64 $false))
[System.IO.File]::WriteAllBytes((Join-Path $assetRoot 'apple-touch-icon.png'), (Export-IconPng 180 $true))

# ICO directory with 16, 32, and 48px PNG frames for modern browser fallbacks.
$sizes = @(16, 32, 48)
$frames = @($sizes | ForEach-Object { ,(Export-IconPng $_ $false) })
$icoStream = New-Object System.IO.MemoryStream
$writer = New-Object System.IO.BinaryWriter($icoStream)
$writer.Write([uint16]0)
$writer.Write([uint16]1)
$writer.Write([uint16]$sizes.Length)
$offset = 6 + 16 * $sizes.Length
for ($index = 0; $index -lt $sizes.Length; $index++) {
    $writer.Write([byte]$sizes[$index])
    $writer.Write([byte]$sizes[$index])
    $writer.Write([byte]0)
    $writer.Write([byte]0)
    $writer.Write([uint16]1)
    $writer.Write([uint16]32)
    $writer.Write([uint32]$frames[$index].Length)
    $writer.Write([uint32]$offset)
    $offset += $frames[$index].Length
}
foreach ($frame in $frames) { $writer.Write([byte[]]$frame) }
$writer.Flush()
[System.IO.File]::WriteAllBytes((Join-Path $assetRoot 'favicon.ico'), $icoStream.ToArray())
$writer.Dispose()
$icoStream.Dispose()
$position.Dispose()
$lettering.Dispose()
$tile.Dispose()
$font.Dispose()
$background.Dispose()
$foreground.Dispose()
$accent.Dispose()
Write-Output 'Exported favicon.svg, favicon.png, favicon.ico (16/32/48px), and apple-touch-icon.png (180px).'
