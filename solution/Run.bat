@echo off
cls 

set "arg1=%1"

:: Start all the servers
if not defined arg1 goto :not_define 
if "%arg1%"=="-b" ( 
    start cmd /k "echo Starting express server... & npm run dev --prefix .\backend\express"
    start cmd /k "echo Building springboot server... & backend\spring\gradlew build -p backend\spring & echo Starting springboot server... & backend\spring\gradlew run -p backend\spring"
    start cmd /k "echo Starting main server... & npm run dev --prefix .\backend\main"
    start cmd /k "echo Building frontend... & cd frontend & ng build --base-href /browser/ --output-path ../backend/main/static & exit"
) else (
    :not_define
    start cmd /k "echo Starting express server... & npm run dev --prefix .\backend\express"
    start cmd /k "echo Starting springboot server... & backend\spring\gradlew run -p backend\spring"
    start cmd /k "echo Starting main server... & npm run dev --prefix .\backend\main"
)

:: Wait for server to start
echo "Waiting for server to starts..."
timeout 10

:: Opening landing page of all servers
echo "Launching on browser..."
start "" "http://localhost:3001/api-docs"
start "" "http://localhost:3000/api-docs"
start "" "http://localhost:8082/swagger-ui/index.html#/"
start "" "http://localhost:3000/browser"

exit