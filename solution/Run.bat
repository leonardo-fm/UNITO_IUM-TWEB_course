clear

:: Start all the servers
start cmd /k "echo Starting express server... & npm run dev --prefix .\backend\express"
start cmd /k "echo Starting springboot server... & backend\spring\gradlew run -p backend\spring"
start cmd /k "echo Starting main server... & npm run dev --prefix .\backend\main"

:: Wait for server to start
echo "Waiting for server to starts..."
timeout 10

:: Opening landing page of all servers
echo "Launching on browser..."
start "" "http://localhost:3001/api-docs"
start "" "http://localhost:3000/api-docs"
start "" "http://localhost:8082/swagger-ui/index.html#/"
start "" "http://localhost:3000/browser"

read -p "Press any key to continue" x