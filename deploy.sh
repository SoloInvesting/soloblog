#!/bin/bash
set -e

echo "=== בונה את האתר ==="
npm run build

echo ""
echo "=== מכין את ענף הדפלוי (שורש + public_html) ==="

CURRENT_BRANCH=$(git branch --show-current)

TMPDIR=$(mktemp -d)
cp -a out/. "$TMPDIR/"

if git show-ref --verify --quiet refs/heads/deploy; then
  git checkout deploy
else
  git checkout --orphan deploy
  git rm -rf . 2>/dev/null || true
fi

find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} +

# 1) קבצים בשורש הריפו — אם שורש הדומיין = תיקיית ה-Git
cp -a "$TMPDIR"/. .

# 2) עותק תחת public_html — אצל uPress שורש האתר הוא לרוב public_html
rm -rf public_html
mkdir -p public_html
cp -a "$TMPDIR"/. public_html/

git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty

echo ""
echo "=== דוחף ל-origin ==="
git push origin deploy --force

git checkout "$CURRENT_BRANCH"
rm -rf "$TMPDIR"

echo ""
echo "=== הדפלוי הושלם ==="
echo ""
echo "ב-uPress חובה לאחד מהבאים:"
echo "  א) להגדיר את שורש האתר (Document root) לתיקייה שבה נמצא index.html אחרי ה-Pull"
echo "  ב) אם האתר מחפש רק בתוך public_html — העתק את התוכן מ-public_html/ לשורש האתר,"
echo "     או הגדר Document root ל: .../public_html  בתוך תיקיית הפרויקט"
echo ""
