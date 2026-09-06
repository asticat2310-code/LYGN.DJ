#!/usr/bin/env bash
# Converts the phone clips in ./video to web-optimised MP4 + JPG posters in ./portfolio
cd "C:/Users/Lenovo/Desktop/Leptiagin Promo" || exit 1
mkdir -p portfolio
i=1
for f in $(printf '%s\n' video/* | sort); do
  [ -e "$f" ] || continue
  out="portfolio/clip-$i.mp4"
  pos="portfolio/clip-$i.jpg"
  echo ">>> [$i] $f -> $out"
  ffmpeg -y -hide_banner -loglevel error -i "$f" \
    -vf "scale=-2:'min(1280,ih)'" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset veryfast \
    -movflags +faststart -c:a aac -b:a 128k "$out" </dev/null
  echo ">>> poster $pos"
  ffmpeg -y -hide_banner -loglevel error -ss 1 -i "$f" -frames:v 1 \
    -vf "scale=-2:'min(1280,ih)'" -q:v 3 "$pos" </dev/null
  i=$((i+1))
done
echo "ALL_DONE converted $((i-1)) clips"
