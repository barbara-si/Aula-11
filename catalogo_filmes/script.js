// função AJAX
function carregarFilmes() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://rafaelescalfoni.github.io/desenv_web/filmes.json");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const dados = JSON.parse(xhr.responseText);

            console.log("Filmes recebidos:", dados); 

            mostrarFilmes(dados);
        }
    };
}

// recebe uma lista de filmes que veio do JSON e, para cada filme, monta um card
function mostrarFilmes(lista) { 
    const divCatalogo = document.querySelector("#catalogo");

    lista.forEach(filme => { // O forEach passa cada item da lista para essa variável filme
        const card = document.createElement("div");
        card.className = "card";

        // faixa etária colorida
        const faixa = document.createElement("div");
        faixa.className = "etaria";
        faixa.textContent = filme.classificacao;

        if (filme.classificacao <= 14) faixa.style.background = "green";
        else if (filme.classificacao < 18) faixa.style.background = "gold";
        else faixa.style.background = "red";

        // estrelas (rating)
        const estrelas = document.createElement("div");
        estrelas.className = "estrelas";
        estrelas.innerHTML = gerarEstrelas(filme.opinioes);

        card.innerHTML = `
            <img src="${filme.figura}">
            <h2>${filme.titulo}</h2>
            <p>${filme.resumo}</p>
            <p><strong>Gêneros:</strong> ${filme.generos.join(", ")}</p>
            <p><strong>Elenco:</strong> ${filme.elenco.join(", ")}</p>
            <p><strong>Títulos semelhantes:</strong> ${filme.titulosSemelhantes.join(", ")}</p>
        `;

        card.prepend(faixa); // adicionar a faixa antes do conteúdo
        card.append(estrelas); // adicionar estrelas no final do card

        divCatalogo.append(card); // jogar o card na tela
    });
}


function gerarEstrelas(opinioes) {
    const media = opinioes.reduce((acc, op) => acc + op.rating, 0) / opinioes.length;
    const estrelasCheias = Math.round(media);

    let html = "";
    for (let i = 0; i < estrelasCheias; i++) html += "★";
    for (let i = estrelasCheias; i < 5; i++) html += "☆";

    return html;
}


carregarFilmes();
