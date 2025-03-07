const express = require('express');  
const path = require('path'); // Importe o módulo 'path'  

const app = express();  
const port = 3000; // Escolha uma porta  

// Servir arquivos estáticos (CSS, JavaScript, imagens) da pasta 'public'  
app.use(express.static(path.join(__dirname, 'public')));  

// Rota para servir o arquivo HTML  
app.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, 'index.html')); // Use path.join para construir o caminho  
});  

app.listen(port, () => {  
    console.log(`Servidor rodando em http://localhost:${port}`);  
});  