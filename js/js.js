$(function() {
	$.ajax({
		url:"https://newsapi.org/v2/top-headlines?country=us&apiKey=68126c9e425444f4a86b05165ff1727a",
		method: "GET",

		success: function(retornoDani) {
			v_numPorPag = 7;
			v_pagQuant = Math.ceil(retornoDani.totalResults / v_numPorPag);

			if(document.location.toString().indexOf("pg=")>-1){
				localizacao = document.location.toString();
				variaveisGET = localizacao.substring(localizacao.indexOf("?")+1);
				posIgual = variaveisGET.indexOf("pg=")+2;
				v_paginaAtual = variaveisGET.substring(posIgual+1) * 1;
				if (v_paginaAtual >v_pagQuant){
					v_paginaAtual =v_pagQuant;
				}
			}else{
				v_paginaAtual = 1;
			}
			conteudo =  ' ';
			paginas = ' ';

			v_cardInicio = (v_paginaAtual * v_numPorPag)-(v_numPorPag-1);
			v_cardFim = v_cardInicio + v_numPorPag;

			if (v_cardFim >retornoDani.totalResults){
				v_cardFim =retornoDani.totalResults+1;
			}


			if (v_paginaAtual>1){
				paginas+='<li class="page-item"><a class="page-link aMaior" href="index.html?pg='+(v_paginaAtual-1)+'">anterior</a></li>';
				paginas += '<li class="page-item">&nbsp;&nbsp;...&nbsp;&nbsp;</li>';
			}

			
			for ( w=v_paginaAtual; w<=v_paginaAtual+3 && w<=v_pagQuant; w++){

				if (w==v_paginaAtual){
					paginas += '<li class="page-item"><span class="page-link">'+w+'</span></li>';
				} else {
					paginas += '<li class="page-item"><a class="page-link" href="index.html?pg='+w+'">'+w+'</a></li>';
				}

			}

			if(v_paginaAtual<(v_pagQuant-3)){
				paginas += '<li class="page-item">&nbsp;&nbsp;...&nbsp;&nbsp;</li>';
			}
			

			if (v_paginaAtual!= v_pagQuant){
				paginas+='<li class="page-item"><a class="page-link aMaior" href="index.html?pg='+(v_paginaAtual+1)+'">próximo</a></li>';

			}


			for (var i = v_cardInicio-1; i < v_cardFim-1; i++) {
				v_foto = retornoDani.articles[i].urlToImage;
				//if(v_foto==null){v_foto = "http://www.meudominio.com.br/img/fotocinza.jpg";v_foto = 'src="' + v_foto + '"';}
				if(v_foto==null){v_foto="";}else{v_foto = 'src="' + v_foto + '"';}

				v_datatemp = retornoDani.articles[i].publishedAt;
				v_data_ano = v_datatemp.substring(0,4);
				v_data_mes = v_datatemp.substring(5,7);
				v_data_dia = v_datatemp.substring(8,10);
				v_data = v_data_dia + "/" + v_data_mes + "/" + v_data_ano;

				v_titulo = retornoDani.articles[i].title;

				v_texto = retornoDani.articles[i].description;
				if(v_texto==null){v_texto = "sem texto";}


				conteudo += '<div class="col-lg-6 col-sm-6 portfolio-item">';
				conteudo += '   <div class="card h-100"> ';
				conteudo += '      <a href="#"><img class="card-img-top" '+v_foto+' alt=""></a>';
				conteudo += '      <p class="card-date">'+v_data+'</p>';
				conteudo += '      <div class="card-body">';
				conteudo += '         <h4 class="card-title">'+v_titulo+'</h4>';
				conteudo += '         <p class="card-text">'+v_texto+'</p>';
				conteudo += '      </div>';
				conteudo += "    </div>";
				conteudo += "</div>";


			}

			$(".container #tudo").append(conteudo );
			$(".pagina .pagination").append(paginas);
		}
	});

});
