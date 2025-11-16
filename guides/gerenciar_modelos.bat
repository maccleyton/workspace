@echo off
chcp 65001 >nul
echo.
echo 🧠 GERENCIADOR DE MODELOS - 12GB RAM
echo.

echo 📊 MODELOS INSTALADOS:
ollama list

echo.
echo 🎯 MODELOS RECOMENDADOS para 12GB RAM:
echo   1. phi:2.7b       (1.6 GB) - ⭐ Melhor custo-benefício
echo   2. gemma:7b       (4.8 GB) - Rápido e inteligente
echo   3. tinyllama:1.1b (0.7 GB) - Super leve
echo   4. mistral        (4.1 GB) - Use com moderação

echo.
echo ⚠️  EVITE usar mais de um modelo grande por vez!
echo.
pause