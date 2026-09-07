#!/usr/bin/env bash
# Converts the newly-added phone clips to web-optimised MP4 + JPG posters.
cd "C:/Users/Lenovo/Desktop/Leptiagin Promo" || exit 1
mkdir -p portfolio

convert_one() {
  local src="$1" out="$2"
  echo ">>> $src -> portfolio/$out.mp4"
  ffmpeg -y -hide_banner -loglevel error -i "$src" \
    -vf "scale=-2:'min(1280,ih)'" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset veryfast \
    -movflags +faststart -c:a aac -b:a 128k "portfolio/$out.mp4" </dev/null
  ffmpeg -y -hide_banner -loglevel error -ss 1 -i "$src" -frames:v 1 \
    -vf "scale=-2:'min(1280,ih)'" -q:v 3 "portfolio/$out.jpg" </dev/null
}

convert_one "video/1.MOV" "new-1"
convert_one "video/2.mp4" "new-2"
convert_one "video/IMG_7125.MOV" "clip-8"
convert_one "video/IMG_7118.MOV" "clip-9"
convert_one "video/IMG_7106.MOV" "clip-10"
convert_one "video/IMG_4257.MP4" "clip-11"
convert_one "video/IMG_6823.MP4" "clip-12"
convert_one "video/IMG_7117.MOV" "clip-13"

echo "ALL_DONE"
