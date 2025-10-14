echo "Building core..."
(cd ./packages/core ; bun lib:build)
echo "Building consumer..."
(cd ./packages/consumer ; bun lib:build)
echo "Building factory..."
(cd ./packages/factory ; bun lib:build)
echo "Building setup..."
(cd ./packages/setup ; bun lib:build)
