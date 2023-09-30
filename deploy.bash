# 部署到 github pages 脚本
# 错误时终止脚本
git status

git pull

# Add changes to git.
git add .

# Commit changes.
msg="commit $(date)"
if [ $# -eq 1 ]; then
  msg="$1"
fi
git commit -m "$msg"

git push
