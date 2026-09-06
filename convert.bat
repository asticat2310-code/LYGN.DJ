@echo off
chcp 65001 >nul
REM ============================================================
REM  LYGN portfolio - video converter
REM  Converts phone clips to web-friendly MP4 + poster images.
REM  Put your source videos in a folder next to this file named
REM  "video" (or keep the Russian "видео") and double-click this.
REM  Requires ffmpeg (already installed on this PC via winget).
REM ============================================================
setlocal enabledelayedexpansion

set "SRC="
if exist "video\" set "SRC=video"
if exist "видео\" set "SRC=видео"
if "%SRC%"=="" (
  echo No source folder found. Create a folder named "video" with your clips.
  pause
  exit /b 1
)

if not exist "portfolio\" mkdir "portfolio"

set /a i=0
for %%F in ("%SRC%\*.mp4" "%SRC%\*.mov" "%SRC%\*.MP4" "%SRC%\*.MOV") do (
  set /a i+=1
  echo [!i!] Converting %%~nxF ...
  ffmpeg -y -hide_banner -loglevel error -i "%%F" -vf "scale=-2:'min(1280,ih)'" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset veryfast -movflags +faststart -c:a aac -b:a 128k "portfolio\clip-!i!.mp4"
  ffmpeg -y -hide_banner -loglevel error -ss 1 -i "%%F" -frames:v 1 -vf "scale=-2:'min(1280,ih)'" -q:v 3 "portfolio\clip-!i!.jpg"
)

echo.
echo Done. Converted !i! clip(s) into the "portfolio" folder.
pause
