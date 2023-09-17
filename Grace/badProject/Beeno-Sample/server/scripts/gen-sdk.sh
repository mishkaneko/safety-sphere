set -e
set -o pipefail
# set -x

npx nest-gen --angular
rm -rf ../app/api
cp -r out ../app/api
rm -rf out