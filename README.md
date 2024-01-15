# IUM-TWEB
IUM-TWEB 2023-2024 Assignment UniTo
Project for the UNITO corse <i>[IUM](https://informatica.i-learn.unito.it/course/view.php?id=2838) and [TWEB](https://informatica.i-learn.unito.it/course/view.php?id=2734)</i> 2023/2024

# Init
- Go to solution\backend\express and run
```
npm install
```
- Go to solution\backend\main and run
```
npm install
```
- Go to solution\frontend and run
```
npm install (pakage required: npm install -g @angular/cli)
```
- Go to solution\databaseschemas\PostgreSQL and import ium_tweb.bak
  - Go to IUM-TWEB\solution\backend\spring\src\main\resources\application.properties and change **ONLY** the **<ins># DataSource settings: PostgreSQL</ins>** section 
- Go to solution\databaseschemas\MongoDB and:
  - Unzip soccher.zip
  - Download [MongoDB Database Tool](https://www.mongodb.com/try/download/database-tools)
  - Run command
  ```
  mongorestore "[Full path]\IUM-TWEB\solution\databaseschemas\MongoDB"
  ```
  - If needed go to IUM-TWEB\solution\backend\express\src\db.js to change the connection string

# Build
Go to the folder IUM-TWEB\solution

- Launch Build.bat

**OR**
- Run
```
backend\spring\gradlew build -p backend\spring
```
- Go to \frontend and run
```
ng build --base-href /browser/ --output-path ../backend/main/static
```

# Run
Go to the folder IUM-TWEB\solution

- Launch Run.bat (or run in a CLI Run.bat -b also for building projects), also open all the pages on the browser

**OR**
- Run
```
npm run dev --prefix .\backend\express
```
- Run
```
npm run dev --prefix .\backend\mian
```
- Run
```
backend\spring\gradlew run -p backend\spring
```

# Applications URLs
Application | URL 
--- | --- 
Angular | http://localhost:3000/browser
Spring Boot | http://localhost:8082/swagger-ui/index.html#/
Main | http://localhost:3000/api-docs
Second express server | http://localhost:3001/api-docs

# Autors
[Antonio Buscema](https://github.com/Yotsumi) (Yotsumi), [Leonardo Ferrero Merlino](https://github.com/leonardo-fm) (leonardo-fm)
