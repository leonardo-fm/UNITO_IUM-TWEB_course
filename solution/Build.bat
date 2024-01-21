@echo off
cls 

:: Build
start cmd /k "echo Building springboot server... & backend\spring\gradlew build -p backend\spring & pause & exit"
start cmd /k "echo Building frontend... & cd frontend & ng build --base-href /browser/ --output-path ../backend/main/static & pause & exit"

exit