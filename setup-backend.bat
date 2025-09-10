@echo off
echo Setting up Ubuntu Explorer Backend...
echo.

echo 1. Installing dependencies...
cd backend
call npm install

echo.
echo 2. Backend setup complete!
echo.
echo Next steps:
echo 1. Set up MongoDB Atlas (free cloud database):
echo    - Go to https://www.mongodb.com/atlas
echo    - Create a free account and cluster
echo    - Get your connection string
echo    - Update MONGODB_URI in backend\.env file
echo.
echo 2. Start the backend server:
echo    cd backend
echo    npm run dev
echo.
echo 3. Include js/api.js in your HTML:
echo    ^<script src="js/api.js"^>^</script^>
echo.
echo The API will be available at: http://localhost:5000
echo Health check: http://localhost:5000/api/v1/health
echo.
pause
