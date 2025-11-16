@echo off
chcp 65001 >nul
echo.
echo 🧪 TESTANDO MODELOS LEVES
echo.

set OLLAMA_CPU=1

echo 1. Testando Phi-2.7B (1.6 GB)...
ollama run phi:2.7b "Escreva uma função Python simples para somar números"

echo.
echo 2. Testando TinyLlama (0.7 GB)...
ollama run tinyllama:1.1b "Explique o que é Python"

echo.
echo 3. Testando Gemma (4.8 GB)...
ollama run gemma:7b "Qual a diferença entre lista e tuple em Python?"

echo.
echo ✅ Testes concluídos!
pause