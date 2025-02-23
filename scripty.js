document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    getAddressByCep();
    getPrevisao();
});
//CEP
async function getAddressByCep() {
    const cep = document.getElementById('inputCEP').value.trim();
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        console.log(data);
        
        document.getElementById('logadouroR').innerText = data.logradouro || '';
        document.getElementById('bairroR').innerText = data.bairro || '';
        document.getElementById('localidadeR').innerText = data.localidade || '';
    } catch (error) {
        alert('Erro ao buscar o CEP: ' + error.message);
    }
}

//PREVISÃO
async function getPrevisao() {
    const lat = document.getElementById('lat').value.trim();
    const lon = document.getElementById('lon').value.trim();
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
        const data = await response.json();
        console.log(data);
        
        // mostrar a primeira previsão de temperatura no input 'latLongR'
        if (data.hourly && data.hourly.temperature_2m && data.hourly.temperature_2m.length > 0) {
            document.getElementById('latLongR').value = "Previsão de tempo de acordo com a região: " + data.hourly.temperature_2m[0] + " ºC";
        } else {
            document.getElementById('latLongR').value = 'Sem dados';
        }
    } catch (error) {
        alert('Erro ao buscar a previsão: ' + error.message);
    }
}