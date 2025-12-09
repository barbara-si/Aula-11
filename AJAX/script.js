const botao = document.querySelector("#busca");

botao.addEventListener("click", function() {

    const cep = document.querySelector("#cep").value;

    // 1 - criar o objeto
    const objHTTP = new XMLHttpRequest();

    // 2 - configurar a requisição
    const url = `https://viacep.com.br/ws/${cep}/json/`; 
    objHTTP.open("GET", url);

    // 3 - enviar a requisição
    objHTTP.send();

    // 4 - lidar com a resposta
    objHTTP.onreadystatechange = function() {
        
        if (objHTTP.readyState == 4) {  // terminou, requisição está completa
            if (objHTTP.status == 200) { // sucesso

                const resposta = JSON.parse(objHTTP.responseText);

                const divEndereco = document.querySelector("#endereco");

                divEndereco.innerHTML = `
                    <p><strong>Rua:</strong> ${resposta.logradouro}</p>
                    <p><strong>Bairro:</strong> ${resposta.bairro}</p>
                    <p><strong>Município:</strong> ${resposta.localidade}</p>
                    <p><strong>Estado:</strong> ${resposta.uf}</p>
                `;
            
            }
        } else {
            console.log("A requisição ainda não terminou", objHTTP.readyState);
        }
    };
});
