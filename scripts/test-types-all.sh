echo "Testing core..."
(cd ./packages/core ; bun test:types)
echo "Testing consumer..."
(cd ./packages/consumer ; bun test:types)
echo "Testing factory..."
(cd ./packages/factory ; bun test:types)
echo "Testing setup..."
(cd ./packages/setup ; bun test:types)
