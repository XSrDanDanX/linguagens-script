/*
 * Funções gerais
 * 
 * Material de ajuda:
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

function mudaVisibilidade(id){
    var children = document.getElementById('projeto_main').children;
    for (var i=0; i<children.length; i++) children[i].style.display="none";
    document.getElementById(id).style.display="block";
}


/*
 * Funções para Geolocalização.
 */

/**
 * Obter geolocalização do navegador.
 */
function geoLocalizacao(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(exibePosicao);
  } else { 
    alert("Erro ao obter geolocalização.");
  }
}
  
/**
 * Exibe latitude e longitude
 * @param {*} position 
 */
function exibePosicao(position) {
  document.getElementById("latitude").value = position.coords.latitude;
  document.getElementById("longitude").value = position.coords.longitude;
 
}

/*
 * Funções para leitura de arquivos CSV
 * 
 * Material de ajuda: https://stackoverflow.com/questions/7431268/how-to-read-data-from-csv-file-using-javascript
 * https://github.com/fivethirtyeight/data/tree/master/comic-characters
 * https://github.com/fivethirtyeight/data/blob/master/comic-characters/dc-wikia-data.csv
 https://raw.githubusercontent.com/fivethirtyeight/data/master/comic-characters/dc-wikia-data.csv 
 */


 /**
  * Carrega um arquivo CSV local.
  * @param {*} arquivo 
  */
function carregaCSVLocal(arquivo){
  
    $.ajax({
        type: "GET",
        //url: "data.txt",
        url: arquivo,
        dataType: "text",
        success: function(data) {processaCSV(data);}
     });
} 
/**
 * Auxilia o processamento do arquivo CSV.
 * @param {*} dados 
 */
function processaCSV(dados){
  var dadosLinhas = dados.split(/\r\n|\n/);
  var dadosLista = "";
  
  // para cada um dos elementos
  for (var i=1; i<dadosLinhas.length; i++) {
    var data = dadosLinhas[i].split(',');
    var nome = data[0];
    var ano = data[7];
    dadosLista += criaElementoLista([nome, ano]);
  }
  document.getElementById("projeto_lista").innerHTML = dadosLista;
}

/**
 * Carrega um arquivo CSV remoto. 
 * Código de ajuda: https://stackoverflow.com/questions/7431268/how-to-read-data-from-csv-file-using-javascript
 * 
 * https://raw.githubusercontent.com/fivethirtyeight/data/master/comic-characters/marvel-wikia-data.csv
 */
function carregaCSVRemoto(){
 
  window.alert("Coletando da url");  
  var arquivo = 'https://raw.githubusercontent.com/ryganon/linguagens-script/master/projetos/dashboard-lite/dados.csv';

  $.get(arquivo, function( dados ) {

    var dadosLinhas = dados.split(/\r\n|\n/);
    var dadosLista = "";
    
    // para cada um dos elementos
    for (var i=1; i<dadosLinhas.length; i++) {
      var data = dadosLinhas[i].split(',');
      var nome = data[0];
      var ano = data[7] + " / "+ data[2];
      dadosLista += criaElementoLista([nome, ano]);
    }
    document.getElementById("projeto_lista").innerHTML = dadosLista;
  });
}

/**
 * Função que carrega um arquivo JSON local.
 */
function carregaJSONLocal(){
  $.getJSON('movies.json', function(data) {
    
    dadosLista = "";
    data.forEach(filme => {
      dadosLista += criaElementoLista([filme.title, 
                                       "Posição no rank: "+filme.rank + "/ Id do filme: "+filme.id]);
    });
    document.getElementById("projeto_lista").innerHTML = dadosLista;
  });

} 

/**
 * Função que carrega um XML de URL
 */
function carregaXMLRemoto(){
  
  urlxml = '';
  
  $.get(urlxml, function(dados){
    parserXML(dados);});
}

/**
 * Função que processa os dados de um XML
 * @param {*} xml 
 */
function parserXML(xml){

  dadosLista = "";
  
  xmlDoc = $.parseXML(xml);
  $xml = $(xmlDoc);
  
  $filmes = $xml.find("Movie");
  
  $filmes.each(function(){
    titulo = $(this).find('title').text();
    genero = $(this).find('description').text();
    dadosLista += criaElementoLista([titulo, genero]);
  });
  document.getElementById("projeto_lista").innerHTML = dadosLista;
}

/**
 * Criando os elementos de uma lista com o Material Design
 * @param {*} dados
 */
function criaElementoLista(dados){
  
  /*
  criando elemento lista
  <li class="mdl-list__item mdl-list__item--three-line">
    <span class="mdl-list__item-primary-content">
      <i class="material-icons mdl-list__item-avatar">person</i>
      <span>Bryan Cranston</span>
      <span class="mdl-list__item-text-body">
        Bryan Cranston played the role of Walter in Breaking Bad. He is also known
        for playing Hal in Malcom in the Middle.
      </span>
    </span>
    <span class="mdl-list__item-secondary-content">
      <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
    </span>
  </li>
  */

 var item_lista = '<li class="mdl-list__item mdl-list__item--three-line">';
     item_lista += '<span class="mdl-list__item-primary-content">';
     item_lista += '<i class="material-icons mdl-list__item-avatar">person</i>';
     item_lista += '<span>'+ dados[0] +'</span>';
     item_lista += '<span class="mdl-list__item-text-body">';
     item_lista += dados[1];
     item_lista += '</span></span></li>'; 
  
 return item_lista;
}



/**
 * Função que carrega um XML de URL
 */
function carregaXMLRemotoNoticias(){
  
  //urlxml = 'tecnologia_uol.xml';
  urlxml = 'https://raw.githubusercontent.com/ryganon/linguagens-script/master/projetos/dashboard-lite/tecnologia_uol.xml';

  $.get(urlxml, function(dados){
    parserXMLNoticias(dados);
  });
}

/**
 * Função que processa os dados de um XML
 * @param {*} xml 
 */
function parserXMLNoticias(xml){

  dadosLista = "";
  
  xmlDoc = $.parseXML(xml);
  $xml = $(xmlDoc);
  
  // coletando item: title, link, description, pubDate
  $filmes = $xml.find("item");
  
  $filmes.each(function(){
    titulo = $(this).find('title').text();
    descricao = $(this).find('description').text();
    datapub = $(this).find('pubDate').text();
    dadosLista += criaElementoLista([titulo, descricao]);
  });
  document.getElementById("projeto_lista").innerHTML = dadosLista;
}
