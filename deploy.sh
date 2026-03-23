#!/bin/bash
set -e

echo "=== בונה את האתר ==="
npm run build

echo ""
echo "=== מכין את ענף הדפלוי ==="

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Create a temporary directory
TMPDIR=$(mktemp -d)
cp -r out/* "$TMPDIR/"

# Switch to deploy branch (create if doesn't exist)
if git show-ref --verify --quiet refs/heads/deploy; then
  git checkout deploy
else
  git checkout --orphan deploy
  git rm -rf . 2>/dev/null || true
fi

# Clean and copy new build
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} +
cp -r "$TMPDIR"/* .

# Add and commit
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty

echo ""
echo "=== דוחף ל-origin ==="
git push origin deploy --force

# Switch back
git checkout "$CURRENT_BRANCH"
rm -rf "$TMPDIR"

echo ""
echo "=== הדפלוי הושלם בהצלחה! ==="
echo "ודא שב-uPress הגדרת את הענף 'deploy' כענף המקור."
