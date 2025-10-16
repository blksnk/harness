echo "Bumping version of core..."
(cd ./packages/core ; npm version patch)
echo "Bumping version of consumer..."
(cd ./packages/consumer ; npm version patch)
echo "Bumping version of factory..."
(cd ./packages/factory ; npm version patch)
echo "Bumping version of setup..."
(cd ./packages/setup ; npm version patch)
