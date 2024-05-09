@echo off
setlocal

 REM Ruta del repositorio local
set REPO_PATH=‪C:\Users\CFGS\Documents\fpgit

 REM Obtiene la fecha actual en el formato deseado (YYYY-MM-DD)
for /f %%x in ('powershell Get-Date -Format yyyy-MM-dd') do set "DATE=%%x"

 REM Mensaje de commit (puedes personalizarlo)
set COMMIT_MESSAGE="Carga de trabajo diaria - %DATE%"

 REM Cambia al directorio del repositorio
cd %REPO_PATH%

 REM Agrega todos los cambios y realiza el commit
git add .
git commit -m %COMMIT_MESSAGE%

 REM Realiza el push al repositorio remoto (asegúrate de haber configurado un origen remoto)
git push origin main

 REM Muestra un mensaje de éxito
echo Commit y push realizados exitosamente.

 REM Pausa para que puedas ver el resultado antes de que la ventana se cierre
pause