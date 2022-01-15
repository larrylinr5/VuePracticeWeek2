set -e

cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/larrylinr5/VuePracticeWeek2.git master:gh-pages
cd -