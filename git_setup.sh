#!/usr/bin/env bash
set -e
cd "C:/Users/Lenovo/Desktop/Leptiagin Promo"
git init
git config user.email "asticat2310@gmail.com"
git config user.name "asticat2310-code"
git add -A
git commit -m "Initial commit — LYGN DJ portfolio site

Static bilingual (EN/VI) portfolio for DJ LYGN:
- Three.js animated hero, portfolio teaser, contacts (no form)
- Separate video-portfolio page with lightbox player
- Mobile-first responsive

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/asticat2310-code/LYGN.DJ.git
echo "=== STATUS ==="
git log --oneline -1
echo "--- tracked files ---"
git ls-files | wc -l
git remote -v
