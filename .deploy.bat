@echo off

REM Run npm build
call npm run build

REM Check if npm run build was successful
if %errorlevel% neq 0 (
    echo Failed to build the site.
    exit /b %errorlevel%
)

REM Set destination directory
set "destinationDirectory=%~dp0..\karkkainen.net"

REM Copy files to destination directory
xcopy /D /Y /E "%~dp0\dist\" "%destinationDirectory%"
if %errorlevel% neq 0 (
    echo Failed to copy static files to destination directory.
    exit /b %errorlevel%
)

REM Change to destination directory
cd /d "%destinationDirectory%"

REM Commit changes to Git
git add -A
git commit -m "Automatic Build Script"

REM Push changes to the remote repository
git push -u origin dev
if %errorlevel% neq 0 (
    echo Failed to push changes to the remote repository.
    exit /b %errorlevel%
)

echo Site build, copied, and pushed to remote dev server successfully.
echo Create a pull request to deploy to production server!

REM Open GitHub compare URL
start https://github.com/JAAKKQ/karkkainen.net/compare/main...dev?expand=1

REM Wait for a few seconds
timeout /t 5
exit /b 0
