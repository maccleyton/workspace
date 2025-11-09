/**
 * Question Generator for Dev Quiz
 * Generates questions for all modalities and languages
 */

class QuestionGenerator {
    constructor() {
        this.questionsPerLanguage = 50; // 50 questions per language per modality
        this.totalLanguages = 15;
        this.totalModalities = 4;
        
        // Initialize question banks
        this.questionBanks = this.initializeQuestionBanks();
    }

    /**
     * Initialize comprehensive question banks for all languages and modalities
     */
    initializeQuestionBanks() {
        return {
            choice: this.generateChoiceQuestions(),
            coding: this.generateCodingQuestions(),
            debugging: this.generateDebuggingQuestions(),
            correction: this.generateCorrectionQuestions()
        };
    }

    /**
     * Generate multiple choice questions for all languages
     */
    generateChoiceQuestions() {
        return {
            html: [
                { question: 'Qual tag HTML é usada para criar um link?', options: ['<link>', '<a>', '<href>', '<url>'], correct: 1, explanation: 'A tag <a> (anchor) é usada para criar links em HTML.' },
                { question: 'O que significa HTML?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'], correct: 0, explanation: 'HTML significa HyperText Markup Language.' },
                { question: 'Qual tag é usada para imagens?', options: ['<image>', '<img>', '<picture>', '<media>'], correct: 1, explanation: 'A tag <img> é usada para inserir imagens em HTML.' },
                { question: 'Qual atributo é obrigatório para a tag <img>?', options: ['title', 'alt', 'src', 'width'], correct: 2, explanation: 'O atributo src (source) é obrigatório para especificar o caminho da imagem.' },
                { question: 'Qual tag define um cabeçalho de nível 1?', options: '<h1>', options: ['<head>', '<h1>', '<header>', '<title>'], correct: 1, explanation: 'A tag <h1> define um cabeçalho de nível 1 (mais importante).' },
                { question: 'Qual tag é usada para criar uma lista não ordenada?', options: ['<ol>', '<ul>', '<li>', '<dl>'], correct: 1, explanation: 'A tag <ul> (unordered list) cria listas com marcadores.' },
                { question: 'Qual tag é usada para criar uma tabela?', options: ['<table>', '<tr>', '<td>', '<thead>'], correct: 0, explanation: 'A tag <table> é o elemento principal para criar tabelas.' },
                { question: 'Qual atributo é usado para definir o idioma de uma página?', options: ['language', 'lang', 'locale', 'country'], correct: 1, explanation: 'O atributo lang especifica o idioma do elemento.' },
                { question: 'Qual tag é usada para quebrar linha?', options: ['<break>', '<br>', '<newline>', '<line>'], correct: 1, explanation: 'A tag <br> cria uma quebra de linha.' },
                { question: 'Qual elemento é usado para agrupar elementos em um container?', options: ['<div>', '<span>', '<section>', '<group>'], correct: 0, explanation: 'A tag <div> é um container genérico em bloco.' },
                { question: 'Qual tag é usada para formulários?', options: ['<form>', '<input>', '<button>', '<label>'], correct: 0, explanation: 'A tag <form> é o container principal para formulários.' },
                { question: 'Qual atributo é usado para associar uma label a um input?', options: ['for', 'id', 'name', 'class'], correct: 0, explanation: 'O atributo for da label deve corresponder ao id do input.' },
                { question: 'Qual tag é usada para scripts JavaScript?', options: ['<javascript>', '<script>', '<code>', '<js>'], correct: 1, explanation: 'A tag <script> é usada para incluir JavaScript.' },
                { question: 'Qual tag define metadados sobre o documento HTML?', options: ['<meta>', '<head>', '<title>', '<base>'], correct: 0, explanation: 'A tag <meta> define metadados como charset, descrição, etc.' },
                { question: 'Qual tag é usada para criar um parágrafo?', options: ['<para>', '<p>', '<text>', '<paragraph>'], correct: 1, explanation: 'A tag <p> define um parágrafo de texto.' },
                { question: 'Qual atributo é usado para abrir um link em nova aba?', options: ['new', 'target="_blank"', 'open="new"', 'window="new"'], correct: 1, explanation: 'target="_blank" abre o link em uma nova aba/janela.' },
                { question: 'Qual tag é usada para criar uma barra de navegação?', options: ['<navbar>', '<nav>', '<menu>', '<navigation>'], correct: 1, explanation: 'A tag <nav> define uma seção de navegação.' },
                { question: 'Qual tag define conteúdo que é independente e reutilizável?', options: ['<div>', '<section>', '<article>', '<aside>'], correct: 2, explanation: 'A tag <article> define conteúdo independente e reutilizável.' },
                { question: 'Qual atributo é usado para especificar a URL de destino?', options: ['src', 'href', 'url', 'link'], correct: 1, explanation: 'O atributo href especifica a URL de destino de links.' },
                { question: 'Qual tag é usada para criar ênfase ou ênfase forte?', options: ['<b> e <i>', '<em> e <strong>', '<highlight> e <bold>', '<italic> e <bold>'], correct: 1, explanation: '<em> para ênfase e <strong> para ênfase forte (importância).' },
                { question: 'Qual tag é usada para criar um rodapé?', options: ['<footer>', '<bottom>', '<end>', '<copyright>'], correct: 0, explanation: 'A tag <footer> define o rodapé de uma seção ou página.' },
                { question: 'Qual tag é usada para criar uma barra lateral?', options: ['<sidebar>', '<aside>', '<left>', '<lateral>'], correct: 1, explanation: 'A tag <aside> define conteúdo lateralmente relacionado.' },
                { question: 'Qual atributo é usado para definição de estilos inline?', options: ['style', 'class', 'css', 'format'], correct: 0, explanation: 'O atributo style é usado para estilos inline.' },
                { question: 'Qual tag é usada para criar uma linha horizontal?', options: ['<hr>', '<line>', '<divider>', '<rule>'], correct: 0, explanation: 'A tag <hr> cria uma linha horizontal de separação.' },
                { question: 'Qual tag é usada para criar um menu de opções?', options: ['<select>', '<menu>', '<option>', '<choices>'], correct: 1, explanation: 'A tag <menu> define uma lista de comandos.' },
                { question: 'Qual atributo é usado para identificar um elemento?', options: ['class', 'id', 'name', 'ref'], correct: 1, explanation: 'O atributo id deve ser único e identifica um elemento.' },
                { question: 'Qual tag é usada para criar texto pré-formatado?', options: ['<pre>', '<code>', '<text>', '<format>'], correct: 0, explanation: 'A tag <pre> mantém a formatação original do texto.' },
                { question: 'Qual tag é usada para citação de bloco?', options: ['<cite>', '<blockquote>', '<quote>', '<reference>'], correct: 1, explanation: 'A tag <blockquote> define uma citação em bloco.' },
                { question: 'Qual tag é usada para abreviar termos?', options: ['<abbr>', '<short>', '<acronym>', '<abbrv>'], correct: 0, explanation: 'A tag <abbr> define abreviações com title para expansão.' },
                { question: 'Qual tag é usada para mostrar progresso de tarefas?', options: ['<progress>', '<bar>', '<load>', '<status>'], correct: 0, explanation: 'A tag <progress> mostra o progresso de uma tarefa.' },
                { question: 'Qual tag é usada para definir uma seção do documento?', options: ['<div>', '<section>', '<group>', '<part>'], correct: 1, explanation: 'A tag <section> define seções temáticas do documento.' },
                { question: 'Qual atributo é usado para associar dados personalizados?', options: ['data', 'custom', 'meta', 'extra'], correct: 0, explanation: 'Atributos data-* são usados para armazenar dados personalizados.' },
                { question: 'Qual tag é usada para mostrar texto pequeno (fine print)?', options: ['<small>', '<tiny>', '<fine>', '<micro>'], correct: 0, explanation: 'A tag <small> define texto em tamanho menor.' },
                { question: 'Qual tag é usada para mostrar data e hora?', options: ['<time>', '<date>', '<clock>', '<when>'], correct: 0, explanation: 'A tag <time> define data e/ou hora legível por máquina.' },
                { question: 'Qual tag é usada para criar uma medida escalar?', options: ['<meter>', '<scale>', '<measure>', '<gauge>'], correct: 0, explanation: 'A tag <meter> define uma medida escalar dentro de um intervalo conhecido.' },
                { question: 'Qual atributo é usado para carregamento assíncrono de scripts?', options: ['async', 'defer', 'load', 'background'], correct: 0, explanation: 'O atributo async permite carregamento assíncrono de scripts.' },
                { question: 'Qual tag é usada para marcação de texto removido?', options: ['<del>', '<remove>', '<delete>', '<struck>'], correct: 0, explanation: 'A tag <del> marca texto que foi removido de um documento.' },
                { question: 'Qual tag é usada para marcação de texto inserido?', options: ['<ins>', '<add>', '<insert>', '<new>'], correct: 0, explanation: 'A tag <ins> marca texto que foi inserido em um documento.' },
                { question: 'Qual tag é usada para formatação matemática?', options: ['<math>', '<formula>', '<equation>', '<calc>'], correct: 0, explanation: 'A tag <math> define expressões matemáticas.' },
                { question: 'Qual tag é usada para texto de teclado?', options: ['<kbd>', '<key>', '<text>', '<command>'], correct: 0, explanation: 'A tag <kbd> define entrada de teclado.' },
                { question: 'Qual tag é usada para código de computador?', options: ['<code>', '<pre>', '<script>', '<computer>'], correct: 0, explanation: 'A tag <code> define um fragmento de código.' },
                { question: 'Qual tag é usada para saída de programa?', options: ['<output>', '<result>', '<display>', '<show>'], correct: 0, explanation: 'A tag <output> representa o resultado de um cálculo.' },
                { question: 'Qual tag é usada para marcação de texto variable?', options: ['<var>', '<variable>', '<change>', '<diff>'], correct: 0, explanation: 'A tag <var> define uma variável de programa.' },
                { question: 'Qual tag é usada para subscript?', options: ['<sub>', '<down>', '<lower>', '<minor>'], correct: 0, explanation: 'A tag <sub> define texto subscript (subscrito).' },
                { question: 'Qual tag é usada para superscript?', options: ['<sup>', '<up>', '<upper>', '<major>'], correct: 0, explanation: 'A tag <sup> define texto superscript (sobrescrito).' },
                { question: 'Qual tag é usada para marcação de texto não corrigido?', options: ['<u>', '<uncorrected>', '<pending>', '<draft>'], correct: 0, explanation: 'A tag <u> representa texto não articulado.' },
                { question: 'Qual tag é usada para criar um clique longo?', options: ['<kbd> com contexto', '<menu> com type="context"', '<longclick>', '<hold>'], correct: 1, explanation: '<menu type="context"> define menu de contexto para clique longo.' },
                { question: 'Qual tag é usada para encapsular conteúdo externo?', options: ['<iframe>', '<embed>', '<object>', '<external>'], correct: 1, explanation: 'A tag <embed> incorpora conteúdo externo interativo.' },
                { question: 'Qual tag é usada para texto de destaque visual?', options: ['<mark>', '<highlight>', '<strong>', '<em>'], correct: 0, explanation: 'A tag <mark> marca texto relevante ou日光nn uma busca.' },
                { question: 'Qual tag é usada para criar um contexto de regressão?', options: ['<dialog>', '<popup>', '<context>', '<revert>'], correct: 0, explanation: 'A tag <dialog> define uma caixa de diálogo ou janela.' },
                { question: 'Qual atributo é usado para especificar o tipo MIME?', options: ['type', 'mime', 'format', 'content-type'], correct: 0, explanation: 'O atributo type especifica o tipo MIME do elemento.' },
                { question: 'Qual tag é usada para marcar termos de dicionário?', options: ['<dfn>', '<term>', '<definition>', '<meaning>'], correct: 0, explanation: 'A tag <dfn> marca a definição de um termo.' },
                { question: 'Qual tag é usada para mostrar texto sobrescrito?", options: ['<del>', '<ins>', '<s>', '<strike>'], correct: 2, explanation: 'A tag <s> representa texto que não é mais relevante.' },
                { question: 'Qual tag é usada para texto de endereço?', options: ['<address>', '<contact>', '<location>', '<place>'], correct: 0, explanation: 'A tag <address> define informações de contato.' },
                { question: 'Qual tag é usada para texto de demonstração?', options: ['<samp>', '<demo>', '<example>', '<sample>'], correct: 0, explanation: 'A tag <samp> define saída de exemplo de um programa.' },
                { question: 'Qual tag é usada para texto de rubrica?', options: ['<ruby>', '<pronunciation>', '<furigana>', '<reading>'], correct: 0, explanation: 'A tag <ruby> define anotações de pronúncia para texto asiático.' },
                { question: 'Qual tag é usada para texto WBR?', options: ['<wbr>', '<break>', '<word-break>', '<wrap>'], correct: 0, explanation: 'A tag <wbr> sugere uma quebra de palavra opportunistic.' },
                { question: 'Qual tag é usada para conteúdo web component?', options: ['<template>', '<slot>', '<component>', '<custom>'], correct: 0, explanation: 'A tag <template> contém conteúdo que não será renderizado.' }
            ],
            
            css: [
                { question: 'Qual propriedade CSS define a cor do texto?', options: ['font-color', 'text-color', 'color', 'font-style'], correct: 2, explanation: 'A propriedade color define a cor do texto em CSS.' },
                { question: 'O que significa CSS?', options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System', 'Cascading Script Sheets'], correct: 0, explanation: 'CSS significa Cascading Style Sheets.' },
                { question: 'Qual unidade é relativa ao tamanho da fonte do elemento pai?', options: ['px', 'em', 'rem', 'vh'], correct: 1, explanation: 'A unidade em é relativa ao tamanho da fonte do elemento pai.' },
                { question: 'Qual propriedade é usada para espaçamento interno (padding)?', options: ['margin', 'padding', 'border', 'gap'], correct: 1, explanation: 'A propriedade padding define o espaçamento interno de um elemento.' },
                { question: 'Qual seletor seleciona elementos com uma classe específica?', options: ['#', '.', '*', '>'], correct: 1, explanation: 'O seletor . seleciona elementos com uma classe específica.' },
                { question: 'Qual propriedade é usada para criar layout de grade?', options: ['grid', 'flexbox', 'table', 'float'], correct: 0, explanation: 'Grid é o sistema de layout baseado em grade.' },
                { question: 'Qual propriedade define a opacidade de um elemento?', options: ['visibility', 'opacity', 'alpha', 'transparency'], correct: 1, explanation: 'A propriedade opacity define a opacidade de um elemento (0 a 1).' },
                { question: 'Qual valor da propriedade position faz o elemento relativo ao navegador?', options: ['absolute', 'relative', 'fixed', 'static'], correct: 2, explanation: 'position: fixed posiciona o elemento relativo à janela do navegador.' },
                { question: 'Qual pseudo-classe é usada para aplicar estilo ao primeiro elemento filho?', options: [':first', ':first-child', ':first-of-type', ':nth-child(1)'], correct: 1, explanation: ':first-child seleciona o primeiro elemento filho de seu pai.' },
                { question: 'Qual propriedade é usada para controlar como o texto é quebrado?', options: ['word-break', 'text-wrap', 'line-break', 'white-space'], correct: 0, explanation: 'word-break controla como o texto quebra entre caracteres e palavras.' },
                { question: 'Qual função CSS é usada para criar gradientes lineares?', options: ['linear-gradient()', 'gradient()', 'grad()', 'linear()'], correct: 0, explanation: 'linear-gradient() é a função para criar gradientes lineares.' },
                { question: 'Qual propriedade é usada para adicionar sombras aos elementos?', options: ['shadow', 'box-shadow', 'text-shadow', 'filter'], correct: 1, explanation: 'box-shadow adiciona sombras aos elementos.' },
                { question: 'Qual seletor é usado para selecionar o último elemento?', options: ['::last', ':last-child', ':last-of-type', ':nth-last-child(1)'], correct: 1, explanation: ':last-child seleciona o último elemento filho.' },
                { question: 'Qual unidade é relativa à viewport (tela)?', options: ['px', 'em', 'rem', 'vw/vh'], correct: 3, explanation: 'vw (viewport width) e vh (viewport height) são relativas ao viewport.' },
                { question: 'Qual propriedade é usada para transformar elementos?', options: ['transition', 'transform', 'animation', 'movement'], correct: 1, explanation: 'transform é usada para aplicar transformações 2D/3D aos elementos.' },
                { question: 'Qual seletor é usado para selecionar elementos por atributo?', options: ['[attribute]', '{attribute}', '<attribute>', '*attribute'], correct: 0, explanation: '[attribute] seleciona elementos com um atributo específico.' },
                { question: 'Qual propriedade define a largura máxima de um elemento?', options: ['width', 'min-width', 'max-width', 'limit-width'], correct: 2, explanation: 'max-width define a largura máxima de um elemento.' },
                { question: 'Qual pseudo-elemento é usado para estilizar a primeira linha de texto?', options: ['::first-letter', '::first-line', '::before', '::after'], correct: 1, explanation: '::first-line seleciona a primeira linha de um bloco de texto.' },
                { question: 'Qual valor da propriedade display torna um elemento flexível?', options: ['block', 'inline', 'flex', 'grid'], correct: 2, explanation: 'display: flex torna o elemento um flex container.' },
                { question: 'Qual propriedade é usada para sobrepor elementos?', options: ['layer', 'z-index', 'overlay', 'front'], correct: 1, explanation: 'z-index controla a ordem de empilhamento (sobreposição) de elementos.' },
                { question: 'Qual valor da propriedade position é o padrão?', options: ['relative', 'absolute', 'static', 'fixed'], correct: 2, explanation: 'static é o valor padrão da propriedade position.' },
                { question: 'Qual seletor é usado para selecionar todos os elementos?', options: ['.all', '#all', '*', 'element'], correct: 2, explanation: '* seleciona todos os elementos do documento.' },
                { question: 'Qual propriedade é usada para controlar a formatação de texto?', options: ['text-format', 'text-decoration', 'text-style', 'font-decoration'], correct: 1, explanation: 'text-decoration controla decorações como underline, line-through, etc.' },
                { question: 'Qual valor da propriedade overflow controla o scroll?', options: ['show', 'visible', 'auto', 'scroll'], correct: 3, explanation: 'overflow: scroll sempre mostra barras de rolagem quando necessário.' },
                { question: 'Qual pseudo-classe é usada para links visitados?', options: [':link', ':visited', ':active', ':hover'], correct: 1, explanation: ':visited seleciona links que já foram visitados.' },
                { question: 'Qual propriedade é usada para criar colunas múltiplas?', options: ['columns', 'column-count', 'multi-column', 'column-layout'], correct: 0, explanation: 'columns é uma propriedade abreviada para column-count e column-width.' },
                { question: 'Qual função CSS é usada para cores com transparência?', options: ['rgba()', 'alpha()', 'transparent()', 'opacity()'], correct: 0, explanation: 'rgba() define cores com canal alfa (transparência).' },
                { question: 'Qual seletor é usado para selecionar elementos adjacentes?', options: ['+', '~', '>', ' '], correct: 0, explanation: '+ seleciona elementos adjacentes imediatos (irmão adjacente).' },
                { question: 'Qual propriedade controla a ordem de tabulação?', options: ['tab-index', 'tabindex', 'focus-order', 'navigation-order'], correct: 1, explanation: 'tabindex controla a ordem de navegação por Tab.' },
                { question: 'Qual pseudo-classe é usada para elementos focados?', options: [':focus', ':active', ':selected', ':checked'], correct: 0, explanation: ':focus seleciona elementos que estão com foco.' },
                { question: 'Qual valor da propriedade cursor mostra uma mão?', options: ['pointer', 'hand', 'click', 'finger'], correct: 0, explanation: 'cursor: pointer mostra uma mão (indicando que é clicável).' },
                { question: 'Qual propriedade é usada para filtros de imagem?', options: ['filter', 'image-filter', 'visual-filter', 'graphic-filter'], correct: 0, explanation: 'filter aplica filtros como blur, brightness, contrast, etc.' },
                { question: 'Qual seletor de atributo verifica se contém um valor?', options: ['[attribute*="value"]', '[attribute^="value"]', '[attribute$="value"]', '[attribute|="value"]'], correct: 0, explanation: '[attribute*="value"] seleciona elementos onde o atributo contém o valor.' },
                { question: 'Qual valor da propriedade clip cria formas?', options: ['clip-path', 'shape-outside', 'clip', 'mask'], correct: 0, explanation: 'clip-path é usado para criar formas para recorte de elementos.' },
                { question: 'Qual propriedade controla o espaço entre letras?', options: ['character-spacing', 'letter-spacing', 'text-spacing', 'font-spacing'], correct: 1, explanation: 'letter-spacing controla o espaçamento entre caracteres.' },
                { question: 'Qual pseudo-classe é usada para inputs válidos?', options: [':valid', ':checked', ':enabled', ':focus'], correct: 0, explanation: ':valid seleciona elementos de formulário com valor válido.' },
                { question: 'Qual valor da propriedade object-fit controla o ajuste de imagem?', options: ['fit', 'object-fit', 'image-fit', 'size'], correct: 1, explanation: 'object-fit controla como um elemento replaced é ajustado ao seu container.' },
                { question: 'Qual propriedade é usada para criar animações CSS?', options: ['transition', 'animation', 'movement', 'transform'], correct: 1, explanation: 'animation é usada para criar animações CSS.' },
                { question: 'Qual seletor é usado para selecionar elementos com ID?', options: ['#', '.', '*', '>'], correct: 0, explanation: '# seleciona elementos com um ID específico.' },
                { question: 'Qual valor da propriedade visibility oculta mas preserva espaço?', options: ['hidden', 'none', 'collapse', 'invisible'], correct: 0, explanation: 'visibility: hidden oculta o elemento mas preserva seu espaço no layout.' },
                { question: 'Qual pseudo-elemento é usado para inserir conteúdo antes de um elemento?', options: ['::before', '::after', '::first', '::prepend'], correct: 0, explanation: '::before insere conteúdo antes do conteúdo real do elemento.' },
                { question: 'Qual unidade é relativa ao elemento root (html)?', options: ['px', 'em', 'rem', '%'], correct: 2, explanation: 'rem é relativa ao tamanho da fonte do elemento root (html).' },
                { question: 'Qual propriedade controla o overflow de texto?', options: ['text-overflow', 'text-clip', 'overflow-text', 'text-cut'], correct: 0, explanation: 'text-overflow controla como o texto que transborda é tratado.' },
                { question: 'Qual valor da propriedade transform tem melhor performance?', options: ['translate', 'scale', 'rotate', 'skew'], correct: 0, explanation: 'transform: translate tem melhor performance porque é GPU-accelerated.' },
                { question: 'Qual propriedade é usada para criar layouts de revista?', options: ['columns', 'grid', 'flexbox', 'float'], correct: 0, explanation: 'columns é usado para criar layouts de revista com texto em colunas.' },
                { question: 'Qual pseudo-classe é usada para primeiro-of-type?', options: [':first-of-type', ':first-child', ':nth-of-type(1)', ':first'], correct: 0, explanation: ':first-of-type seleciona o primeiro elemento de seu tipo.' },
                { question: 'Qual valor da propriedade contain otimiza rendering?', options: ['content', 'layout', 'paint', 'all'], correct: 3, explanation: 'contain: all otimiza o rendering limitando escopo de mudanças.' },
                { question: 'Qual propriedade controla o destaque de texto selecionado?', options: ['text-selection', 'user-select', 'selection', 'highlight'], correct: 1, explanation: 'user-select controla se o texto pode ser selecionado pelo usuário.' },
                { question: 'Qual seletor é usado para elementos com múltiplas classes?', options: ['.class1.class2', '.class1 .class2', '.class1+.class2', '.class1~.class2'], correct: 0, explanation: '.class1.class2 seleciona elementos que têm ambas as classes.' },
                { question: 'Qual valor da propriedade text-align força texto justificado?', options: ['justify-all', 'justify', 'text-align-justify', 'full-justify'], correct: 1, explanation: 'text-align: justify justifica o texto em ambos os lados.' },
                { question: 'Qual propriedade é usada para criar gradientes radiais?', options: ['radial-gradient()', 'circular-gradient()', 'radial()', 'circle-gradient()'], correct: 0, explanation: 'radial-gradient() cria gradientes circulares ou elípticos.' },
                { question: 'Qual pseudo-classe é usada para nth-child?', options: [':nth-child()', ':nth()', ':child()', ':position()'], correct: 0, explanation: ':nth-child() seleciona elementos baseados em sua posição entre siblings.' },
                { question: 'Qual valor da propriedade background-size cobre todo o container?', options: ['cover', 'contain', '100% 100%', 'auto'], correct: 0, explanation: 'background-size: cover cobre todo o container mantendo proporção.' },
                { question: 'Qual propriedade controla o espaçamento entre palavras?', options: ['word-spacing', 'text-spacing', 'space-between', 'word-gap'], correct: 0, explanation: 'word-spacing controla o espaçamento entre palavras.' }
            ],
            
            js: [
                { question: 'Como declarar uma variável em JavaScript?', options: ['variable x', 'var x', 'v x', 'declare x'], correct: 1, explanation: 'A palavra-chave var é usada para declarar variáveis em JavaScript.' },
                { question: 'Qual método converte string para número?', options: ['Number()', 'String()', 'ParseNumber()', 'Convert()'], correct: 0, explanation: 'Number() converte uma string para número.' },
                { question: 'O que significa NaN?', options: ['Not a Number', 'New and Null', 'No Answer', 'Null and Number'], correct: 0, explanation: 'NaN significa Not a Number.' },
                { question: 'Qual operador de comparação verifica igualdade de valor e tipo?', options: ['==', '===', '!=', '!=='], correct: 1, explanation: '=== verifica tanto valor quanto tipo (igualdade estrita).' },
                { question: 'Qual método é usado para adicionar um item ao final de um array?', options: ['add()', 'append()', 'push()', 'insert()'], correct: 2, explanation: 'push() adiciona um ou mais elementos ao final do array.' },
                { question: 'Qual palavra-chave é usada para criar uma função anônima?', options: ['function', 'lambda', 'arrow', 'anonymous'], correct: 0, explanation: 'A palavra-chave function é usada para criar funções, incluindo anônimas.' },
                { question: 'Qual método remove o último elemento de um array?', options: ['remove()', 'pop()', 'delete()', 'last()'], correct: 1, explanation: 'pop() remove e retorna o último elemento do array.' },
                { question: 'Qual objeto representa ausência intencional de valor?', options: ['undefined', 'null', 'void', 'empty'], correct: 1, explanation: 'null representa ausência intencional de valor.' },
                { question: 'Qual método percorre um array e retorna um novo array?', options: ['forEach()', 'map()', 'filter()', 'reduce()'], correct: 1, explanation: 'map() cria um novo array com os resultados da função aplicada a cada elemento.' },
                { question: 'Qual palavra-chave define uma constante?', options: ['const', 'let', 'final', 'static'], correct: 0, explanation: 'const define uma variável que não pode ser reatribuída.' },
                { question: 'Qual método verifica se um array inclui um valor?', options: ['contains()', 'includes()', 'has()', 'find()'], correct: 1, explanation: 'includes() verifica se um array inclui um valor específico.' },
                { question: 'Qual método executa uma função após um delay?', options: ['setTimeout()', 'delay()', 'wait()', 'timeout()'], correct: 0, explanation: 'setTimeout() executa uma função após um delay especificado.' },
                { question: 'Qual método remove o primeiro elemento de um array?', options: ['remove()', 'shift()', 'first()', 'delete()'], correct: 1, explanation: 'shift() remove e retorna o primeiro elemento do array.' },
                { question: 'Qual operador é usado para exponenciação?', options: ['^', '**', 'pow()', 'exp()'], correct: 1, explanation: '** é o operador de exponenciação em JavaScript.' },
                { question: 'Qual método é usado para processar um array de forma acumulativa?', options: ['map()', 'reduce()', 'filter()', 'find()'], correct: 1, explanation: 'reduce() reduz um array a um único valor através de uma função acumulativa.' },
                { question: 'Qual função converte objeto para string JSON?', options: ['toJSON()', 'JSON.stringify()', 'parse()', 'encode()'], correct: 1, explanation: 'JSON.stringify() converte um valor JavaScript para string JSON.' },
                { question: 'Qual método é usado para buscar elementos em um array?', options: ['search()', 'find()', 'indexOf()', 'get()'], correct: 1, explanation: 'find() retorna o primeiro elemento que satisfaz a função de teste.' },
                { question: 'Qual método divide uma string em um array?', options: ['split()', 'divide()', 'separate()', 'cut()'], correct: 0, explanation: 'split() divide uma string em um array usando um separador.' },
                { question: 'Qual palavra-chave é usada para loop sobre propriedades de objeto?', options: ['for...in', 'for...of', 'forEach', 'while'], correct: 0, explanation: 'for...in percorre propriedades enumeráveis de um objeto.' },
                { question: 'Qual método adiciona elementos ao início de um array?', options: ['unshift()', 'addFirst()', 'prepend()', 'insertFirst()'], correct: 0, explanation: 'unshift() adiciona um ou mais elementos ao início do array.' },
                { question: 'Qual operador spread (...) é usado para?', options: ['Destruir arrays', 'Desestrutura', 'Espalhar valores', 'Todas as anteriores'], correct: 3, explanation: 'O operador spread (...) pode desestruturar, copiar e espalhar valores.' },
                { question: 'Qual método cria um novo array filtrado?', options: ['map()', 'filter()', 'reduce()', 'find()'], correct: 1, explanation: 'filter() cria um novo array com elementos que passam no teste da função.' },
                { question: 'Qual função converte string JSON para objeto?', options: ['JSON.parse()', 'JSON.object()', 'parseJSON()', 'decode()'], correct: 0, explanation: 'JSON.parse() converte string JSON para valor JavaScript.' },
                { question: 'Qual método ordena elementos de um array?', options: ['order()', 'sort()', 'arrange()', 'sequence()'], correct: 1, explanation: 'sort() ordena elementos de um array in-place.' },
                { question: 'Qual palavra-chave define uma arrow function?', options: ['function', 'arrow', '=>', 'lambda'], correct: 2, explanation: '=> define uma arrow function (função de seta).' },
                { question: 'Qual método é usado para iterar sobre arrays com índice?', options: ['forEach()', 'map()', 'for...of', 'while'], correct: 0, explanation: 'forEach() executa uma função para cada elemento do array com índice.' },
                { question: 'Qual objeto contém informações sobre o navegador?', options: ['navigator', 'browser', 'client', 'agent'], correct: 0, explanation: 'O objeto navigator contém informações sobre o navegador.' },
                { question: 'Qual método remove espaços em branco do início e fim de uma string?', options: ['trim()', 'clean()', 'strip()', 'remove()'], correct: 0, explanation: 'trim() remove espaços em branco do início e fim de uma string.' },
                { question: 'Qual função verifica se um valor é um número?', options: ['isNumber()', 'isNaN()', 'Number.isNaN()', 'isInteger()'], correct: 2, explanation: 'Number.isNaN() verifica se o valor é NaN.' },
                { question: 'Qual método executa uma função em intervalos regulares?', options: ['setInterval()', 'repeat()', 'loop()', 'timer()'], correct: 0, explanation: 'setInterval() executa uma função em intervalos regulares.' },
                { question: 'Qual palavra-chave é usada para loop sobre valores iteráveis?', options: ['for...in', 'for...of', 'forEach', 'while'], correct: 1, explanation: 'for...of percorre valores de objetos iteráveis.' },
                { question: 'Qual método substitui texto em uma string?', options: ['replace()', 'substitute()', 'change()', 'update()'], correct: 0, explanation: 'replace() substitui texto em uma string por um novo texto.' },
                { question: 'Qual objeto contém informações sobre a URL atual?', options: ['location', 'url', 'address', 'current'], correct: 0, explanation: 'O objeto location contém informações sobre a URL atual.' },
                { question: 'Qual método pausa a execução de código por um tempo?', options: ['sleep()', 'wait()', 'delay()', 'pause()'], correct: 1, explanation: 'Em JS assíncrono, wait() é usado com async/await.' },
                { question: 'Qual palavra-chave é usada para tratamento de erros?', options: ['error', 'catch', 'try', 'exception'], correct: 2, explanation: 'try é usado junto com catch para tratamento de erros.' },
                { question: 'Qual método adiciona elementos ao final de um array?', options: ['unshift()', 'push()', 'add()', 'append()'], correct: 1, explanation: 'push() adiciona um ou mais elementos ao final do array.' },
                { question: 'Qual operador lógico retorna true se ambos os operandos forem verdadeiros?', options: ['||', '&&', '!', '??'], correct: 1, explanation: '&& (AND) retorna true se ambos os operandos forem verdadeiros.' },
                { question: 'Qual método é usado para tentar encontrar a posição de uma substring?', options: ['search()', 'indexOf()', 'find()', 'position()'], correct: 1, explanation: 'indexOf() retorna o índice da primeira ocorrência da substring.' },
                { question: 'Qual palavra-chave é usada para interromper um loop?', options: ['break', 'exit', 'stop', 'terminate'], correct: 0, explanation: 'break interrompe a execução do loop atual.' },
                { question: 'Qual objeto representa um conjunto de valores únicos?', options: ['Set', 'Map', 'Array', 'Collection'], correct: 0, explanation: 'Set é um objeto que armazena valores únicos.' },
                { question: 'Qual método executa uma função para cada par chave-valor de um objeto?', options: ['forEach()', 'entries()', 'keys()', 'values()'], correct: 0, explanation: 'forEach() pode ser usado com Object.entries() para iterar sobre objetos.' },
                { question: 'Qual método copia parte de um array?', options: ['copy()', 'slice()', 'extract()', 'segment()'], correct: 1, explanation: 'slice() retorna uma cópia rasa de uma porção do array.' },
                { question: 'Qual palavra-chave é usada para continuar para a próxima iteração?', options: ['continue', 'next', 'skip', 'advance'], correct: 0, explanation: 'continue pula para a próxima iteração do loop.' },
                { question: 'Qual método remove e substitui elementos em um array?', options: ['splice()', 'replace()', 'remove()', 'change()'], correct: 0, explanation: 'splice() remove e substitui elementos existentes e/ou adiciona novos.' },
                { question: 'Qual função é usada para imprimir no console?', options: ['print()', 'console.log()', 'log()', 'display()'], correct: 1, explanation: 'console.log() é usado para imprimir no console do navegador.' },
                { question: 'Qual método é usado para converter string para minúsculas?', options: ['toLowerCase()', 'lower()', 'downcase()', 'minimize()'], correct: 0, explanation: 'toLowerCase() converte string para minúsculas.' },
                { question: 'Qual método é usado para converter string para maiúsculas?', options: ['toUpperCase()', 'upper()', 'upcase()', 'maximize()'], correct: 0, explanation: 'toUpperCase() converte string para maiúsculas.' },
                { question: 'Qual método é usado para verificar se uma string termina com um sufixo?', options: ['endsWith()', 'ends()', 'isEndWith()', 'hasSuffix()'], correct: 0, explanation: 'endsWith() verifica se a string termina com o sufixo especificado.' },
                { question: 'Qual método é usado para verificar se uma string começa com um prefixo?', options: ['startsWith()', 'starts()', 'isStartWith()', 'hasPrefix()'], correct: 0, explanation: 'startsWith() verifica se a string começa com o prefixo especificado.' },
                { question: 'Qual objeto contém informações sobre a janela do navegador?', options: ['window', 'global', 'self', 'document'], correct: 0, explanation: 'window representa a janela do navegador.' },
                { question: 'Qual operador spread é usado para copiar arrays?', options: ['...array', 'copy(array)', 'clone(array)', 'duplicate(array)'], correct: 0, explanation: '[...array] cria uma cópia do array usando spread operator.' },
                { question: 'Qual método adiciona elementos ao início de um array?', options: ['push()', 'unshift()', 'add()', 'prepend()'], correct: 1, explanation: 'unshift() adiciona um ou mais elementos ao início do array.' }
            ],
            
            typescript: [
                { question: 'O que significa TypeScript?', options: ['Type Script', 'TypeScript', 'Typed JavaScript', 'Type Safe Script'], correct: 2, explanation: 'TypeScript é JavaScript com tipagem estática opcional.' },
                { question: 'Como definir uma interface em TypeScript?', options: ['interface {}', 'type {}', 'define {}', 'struct {}'], correct: 0, explanation: 'A palavra-chave interface é usada para definir contratos de objetos.' },
                { question: 'Qual é a sintaxe para tipar uma função?', options: ['function( string ): number', '(str: string) => number', 'function string(number)', 'string -> number'], correct: 1, explanation: 'Arrow functions com tipos usam (param: tipo) => tipo.' },
                { question: 'Como fazer union type?', options: ['type | type', 'type + type', 'type or type', 'type & type'], correct: 0, explanation: 'Union types usam | (pipe) para combinar tipos.' },
                { question: 'O que é o tipo any?', options: ['Tipo obrigatório', 'Tipo dinâmico', 'Tipo genérico', 'Tipo restrito'], correct: 1, explanation: 'any desabilita a verificação de tipos.' },
                { question: 'Como definir propriedades opcionais?', options: ['property?: type', 'property: type?', 'property?: type', 'property = type'], correct: 2, explanation: 'Propriedades opcionais usam ? após o nome.' },
                { question: 'O que é generics?', options: ['Tipos dinâmicos', 'Tipos parametrizados', 'Tipos seguros', 'Tipos herdeiros'], correct: 1, explanation: 'Generics permitem criar componentes reutilizáveis com tipos diferentes.' },
                { question: 'Como importar módulos em TypeScript?', options: ['import from', 'require', 'include', 'use'], correct: 0, explanation: 'TypeScript usa a sintaxe ES6 import from.' },
                { question: 'O que é enum?', options: ['Tipo personalizado', 'Conjunto de constantes nomeadas', 'Lista de valores', 'Objeto fixo'], correct: 1, explanation: 'Enum define um conjunto de constantes nomeadas.' },
                { question: 'Como fazer type assertion?', options: ['as type', 'to type', 'cast type', 'type()'], correct: 0, explanation: 'Type assertion usa as keyword: valor as Tipo.' },
                { question: 'O que é readonly?', options: ['Propriedade não editável', 'Propriedade protegida', 'Propriedade privada', 'Propriedade estática'], correct: 0, explanation: 'readonly torna a propriedade não editável após inicialização.' },
                { question: 'Como definir tuple?', options: ['[type, type]', '(type, type)', 'type[]', 'type x type'], correct: 0, explanation: 'Tuple é array com tipos fixos: [tipo1, tipo2].' },
                { question: 'O que é namespace?', options: ['Módulo interno', 'Escopo nomeado', 'Biblioteca', 'Package'], correct: 1, explanation: 'Namespace é um escopo organizacional nomeado.' },
                { question: 'Como habilitar strict mode?', options: ['"strict": true', 'strict: true', 'use strict', 'strictMode'], correct: 0, explanation: 'strict mode é habilitado no tsconfig.json.' },
                { question: 'O que é declaration merging?', options: ['Unir interfaces', 'Combinar tipos', 'Mesclar declarações', 'Todas as anteriores'], correct: 3, explanation: 'Declaration merging permite combinar múltiplas declarações.' },
                { question: 'Como usar non-null assertion?', options: ['!', '?', '!!', 'null!'], correct: 0, explanation: '! (non-null assertion) indica que valor não é null/undefined.' },
                { question: 'O que é mapped type?', options: ['Tipo transformador', 'Tipo baseado em outro', 'Tipo genérico', 'Tipo dinâmico'], correct: 1, explanation: 'Mapped types criam tipos baseados em propriedades de outro tipo.' },
                { question: 'Como fazer conditional type?', options: ['T extends U ? X : Y', 'if T then U else X', 'T ? U : X', 'case T of'], correct: 0, explanation: 'Conditional types usam T extends U ? X : Y.' },
                { question: 'O que é infer type?', options: ['Tipo automático', 'Tipo deduzido', 'Tipo genérico', 'Tipo padrão'], correct: 1, explanation: 'infer deduce tipos automaticamente em conditional types.' },
                { question: 'Como usar keyof?', options: ['Chaves de objeto', 'Valores de objeto', 'Índices de array', 'Propriedades'], correct: 0, explanation: 'keyof retorna union das chaves de um tipo.' },
                { question: 'O que é utility type?', options: ['Tipo helper', 'Tipo utilitário', 'Tipo padrão', 'Tipo helper'], correct: 1, explanation: 'Utility types são tipos predefinidos para transformações comuns.' },
                { question: 'Como usar Omit?', options: ['Omit<T, K>', 'Omit T K', 'Omit<T[K]>', 'Omit K T'], correct: 0, explanation: 'Omit<T, K> remove propriedades K do tipo T.' },
                { question: 'O que é Record?', options: ['Record<K, T>', 'Record K T', 'Record<K,T>', 'Record T K'], correct: 0, explanation: 'Record<K, T> cria objeto com chaves K e valores T.' },
                { question: 'Como usar Partial?', options: ['Partial<T>', 'Partial T', 'Partial<T,K>', 'T Partial'], correct: 0, explanation: 'Partial<T> torna todas as propriedades de T opcionais.' },
                { question: 'O que é Required?', options: ['Torna propriedades obrigatórias', 'Torna propriedades opcionais', 'Torna propriedades privadas', 'Torna propriedades protegidas'], correct: 0, explanation: 'Required<T> torna todas as propriedades de T obrigatórias.' },
                { question: 'Como usar Pick?', options: ['Pick<T, K>', 'Pick T K', 'Pick K T', 'Pick<T[K]>'], correct: 0, explanation: 'Pick<T, K> seleciona propriedades K do tipo T.' },
                { question: 'O que é ReturnType?', options: ['Tipo de retorno', 'Tipo de parâmetro', 'Tipo de função', 'Tipo de método'], correct: 0, explanation: 'ReturnType<T> obtém tipo de retorno de função T.' },
                { question: 'Como usar Parameters?', options: ['Parameters<T>', 'Params T', 'Args T', 'Arguments T'], correct: 0, explanation: 'Parameters<T> obtém tipos de parâmetros de função T.' },
                { question: 'O que é readonly array?', options: ['Array imutável', 'Array protegido', 'Array privado', 'Array estático'], correct: 0, explanation: 'readonly array não pode ser modificado após criação.' },
                { question: 'Como definir optional chaining?', options: ['?.', '?', '??', '..'], correct: 0, explanation: 'Optional chaining usa ? para acessar propriedades de forma segura.' },
                { question: 'O que é nullish coalescing?', options: ['??', '?', '||', '&&'], correct: 0, explanation: '?? retorna valor direito se esquerdo for null/undefined.' },
                { question: 'Como usar satisfies?', options: ['T satisfies Type', 'T check Type', 'T validate Type', 'T match Type'], correct: 0, explanation: 'satisfies verifica se valor satisfaz tipo sem Widening.' },
                { question: 'O que é const assertion?', options: ['as const', 'const T', 'const type', 'typeof const'], correct: 0, explanation: 'as const torna tipos mais específicos (readonly, literal).' },
                { question: 'Como usar satisfies com objeto?', options: ['obj satisfies Type', 'obj as Type', 'obj type Type', 'obj is Type'], correct: 0, explanation: 'obj satisfies Type valida sem fazer Narrowing.' },
                { question: 'O que é template literal type?', options: ['Tipo string', 'Tipo com template', 'Tipo interpolado', 'Tipo dinâmico'], correct: 1, explanation: 'Template literal types criam tipos baseados em templates string.' },
                { question: 'Como fazer mapped type condicionais?', options: ['{[K in keyof T]: T[K] extends U ? X : Y}', 'Map<T, U>', 'Transform<T, U>', 'Case<T, U>'], correct: 0, explanation: 'Mapped types podem usar conditional types na transformação.' },
                { question: 'O que é recursion em tipos?', options: ['Tipo que se referencia', 'Tipo recursivo', 'Tipo infinito', 'Tipo circular'], correct: 1, explanation: 'Tipos recursivos se referenciam para estruturas como árvores.' },
                { question: 'Como usar never?', options: ['Tipo impossível', 'Tipo vazio', 'Tipo sem valor', 'Todas as anteriores'], correct: 3, explanation: 'never representa tipo que nunca ocorre (nunca retorna, sempre throw).' },
                { question: 'O que é unknown?', options: ['Tipo qualquer', 'Tipo seguro', 'Tipo dinâmico', 'Tipo genérico'], correct: 1, explanation: 'unknown é tipo seguro que deve ser narrowado antes do uso.' },
                { question: 'Como narrow unknown para tipo específico?', options: ['type guards', 'assertions', 'casting', 'all'], correct: 0, explanation: 'Type guards (typeof, instanceof) narrowam unknown para tipos específicos.' }
            ],
            
            python: [
                { question: 'Como declarar uma variável em Python?', options: ['var x = 5', 'x := 5', 'x = 5', 'int x = 5'], correct: 2, explanation: 'Em Python, variáveis são criadas por atribuição direta.' },
                { question: 'Qual é a função para imprimir na tela?', options: ['print()', 'echo()', 'console.log()', 'display()'], correct: 0, explanation: 'print() é a função para exibir output em Python.' },
                { question: 'Como criar uma lista em Python?', options: ['[1, 2, 3]', '(1, 2, 3)', '{1, 2, 3}', 'list(1,2,3)'], correct: 0, explanation: 'Listas usam colchetes [] e são mutáveis.' },
                { question: 'Qual é a diferença entre lista e tupla?', options: ['Lista é mutável, tupla imutável', 'Lista é imutável, tupla mutável', 'Não há diferença', 'Lista só aceita números'], correct: 0, explanation: 'Listas são mutáveis, tuplas são imutáveis (和保护 dados).' },
                { question: 'Como fazer um loop for em Python?', options: ['for i in range(10):', 'for i=0; i<10; i++', 'for i in 0..10', 'foreach i in range(10)'], correct: 0, explanation: 'Python usa for i in range() para loops.' },
                { question: 'Como definir uma função?', options: ['function x():', 'def x():', 'func x():', 'lambda x:'], correct: 1, explanation: 'def é usado para definir funções em Python.' },
                { question: 'O que significa PEP 8?', options: ['Python Enhancement Proposal', 'Python Error Pattern', 'Python Essential Pattern', 'Python External Project'], correct: 0, explanation: 'PEP 8 é o guia de estilo oficial do Python.' },
                { question: 'Como importar um módulo?', options: ['import module', 'include module', 'require module', 'use module'], correct: 0, explanation: 'import é usado para incluir módulos.' },
                { question: 'Como fazer tratamento de erros?', options: ['try/except', 'catch/throw', 'try/catch', 'error/handle'], correct: 0, explanation: 'Python usa try/except para tratamento de exceções.' },
                { question: 'O que é list comprehension?', options: ['Sintaxe concisa para criar listas', 'Listagem de funções', 'Compressão de listas', 'Lista de compreensões'], correct: 0, explanation: 'List comprehension cria listas de forma concisa: [x for x in range(10)].' },
                { question: 'Como acessar último item de lista?', options: ['lista[-1]', 'lista.last()', 'lista[end]', 'lista.length-1'], correct: 0, explanation: 'Índices negativos acessam elementos do final (reverse indexing).' },
                { question: 'O que é slicing?', options: ['Cortado lista em partes', 'Separar string', 'Dividir número', 'Quebrar função'], correct: 0, explanation: 'Slicing usa [inicio:fim] para extrair partes de sequências.' },
                { question: 'Como verificar tipo de variável?', options: ['type(var)', 'typeof var', 'var.type()', 'isinstance(var, type)'], correct: 0, explanation: 'type() retorna o tipo da variável, isinstance() verifica tipo.' },
                { question: 'O que é lambda?', options: ['Função anônima', 'Variável especial', 'Tipo de dado', 'Operador'], correct: 0, explanation: 'lambda cria funções anônimas pequenas: lambda x: x*2.' },
                { question: 'Como abrir arquivo para leitura?', options: ['open("file.txt", "r")', 'file.open("file.txt")', 'read("file.txt")', 'fopen("file.txt")'], correct: 0, explanation: 'open() com modo "r" abre arquivo para leitura.' },
                { question: 'O que é __init__?', options: ['Construtor de classe', 'Método especial', 'Inicializador', 'Todas as anteriores'], correct: 3, explanation: '__init__ é o construtor de classes em Python (método especial).' },
                { question: 'Como herdar de uma classe?', options: ['class Filha(Pai):', 'class Filha extends Pai:', 'class Filha of Pai:', 'class Filha: Pai'], correct: 0, explanation: 'Herança usa (ClassePai) após nome da classe filha.' },
                { question: 'O que é self?', options: ['Referência à instância atual', 'Variável especial', 'Parâmetro obrigatório', 'Todas as anteriores'], correct: 3, explanation: 'self referencia a instância atual da classe.' },
                { question: 'Como fazer break em loop?', options: ['break', 'stop', 'exit', 'continue'], correct: 0, explanation: 'break interrompe o loop atual imediatamente.' },
                { question: 'O que é continue?', options: ['Pula para próxima iteração', 'Para o loop', 'Ignora erro', 'Repete iteração'], correct: 0, explanation: 'continue pula para a próxima iteração do loop.' },
                { question: 'Como fazer условно (if/else)?', options: ['if/elif/else', 'if/elseif/else', 'switch/case', 'case/of'], correct: 0, explanation: 'Python usa if/elif/else (elif = else if).' },
                { question: 'O que é dictionary?', options: ['Estrutura chave-valor', 'Lista indexada', 'Conjunto ordenado', 'String'], correct: 0, explanation: 'Dictionary (dict) armazena pares chave-valor: {key: value}.' },
                { question: 'Como adicionar item ao dictionary?', options: ['dict["key"] = value', 'dict.add("key", "value")', 'dict.push("key", "value")', 'dict.append("key", "value")'], correct: 0, explanation: 'Acessar com chave e atribuir valor adiciona/atualiza item.' },
                { question: 'Como verificar se chave existe?', options: ['"key" in dict', 'dict.contains("key")', 'dict.has("key")', 'dict.exists("key")'], correct: 0, explanation: '"key" in dict retorna True se chave existir.' },
                { question: 'O que é set?', options: ['Conjunto sem duplicatas', 'Lista ordenada', 'Dicionário sem valores', 'Sequência'], correct: 0, explanation: 'Set armazena elementos únicos sem ordem definida.' },
                { question: 'Como criar set vazio?', options: ['set()', '{}', '[]', 'empty()'], correct: 0, explanation: 'set() cria set vazio. {} cria dict vazio.' },
                { question: 'O que é exception?', options: ['Erro em tempo de execução', 'Erro de sintaxe', 'Aviso', 'Warning'], correct: 0, explanation: 'Exception é erro que pode ser tratado durante execução.' },
                { question: 'Como raise exception?', options: ['raise Exception("msg")', 'throw Exception("msg")', 'error Exception("msg")', 'raise_error("msg")'], correct: 0, explanation: 'raise Exception() gera uma exceção.' },
                { question: 'O que é finally?', options: ['Executa sempre no final', 'Trata erro', 'Evita erro', 'Repete código'], correct: 0, explanation: 'finally executa sempre, mesmo se exception ocorrer.' },
                { question: 'Como usar with statement?', options: ['with open() as f:', 'with open()', 'using open() as f:', 'import open()'], correct: 0, explanation: 'with open() garante fechamento automático de arquivos.' },
                { question: 'O que é generator?', options: ['Função que yields valores', 'Gerador de código', 'Criador de objetos', 'Factory function'], correct: 0, explanation: 'Generator usa yield para retornar valores de forma lazy.' },
                { question: 'Como fazer decorator?', options: ['@decorator', '#[decorator]', '%decorator', '&decorator'], correct: 0, explanation: '@decorator' é a sintaxe para aplicar decorators.' },
                { question: 'O que é __name__?', options: ['Nome do módulo atual', 'Nome da função', 'Variável especial', 'Todas as anteriores'], correct: 3, explanation: '__name__ contém nome do módulo (ou "__main__" se executado diretamente).' },
                { question: 'Como executar script Python?', options: ['python script.py', 'py script.py', 'python3 script.py', 'run script.py'], correct: 0, explanation: 'python ou python3 seguido do arquivo executa o script.' },
                { question: 'O que é pip?', options: ['Package manager Python', 'Python Improvement Proposal', 'Python Installation Package', 'Python Internal Project'], correct: 0, explanation: 'pip é o gerenciador de pacotes do Python.' },
                { question: 'Como instalar package?', options: ['pip install package', 'python install package', 'install package', 'pip get package'], correct: 0, explanation: 'pip install package instala um pacote do PyPI.' },
                { question: 'O que é virtual environment?', options: ['Ambiente isolado Python', 'Terminal especial', 'Editor integrado', 'Debugging tool'], correct: 0, explanation: 'Virtual environment (venv) cria ambiente Python isolado.' },
                { question: 'Como criar venv?', options: ['python -m venv env', 'virtual env', 'create venv', 'python venv'], correct: 0, explanation: 'python -m venv nome_ambiente cria virtual environment.' },
                { question: 'O que é requirements.txt?', options: ['Lista de dependências', 'Arquivo de configuração', 'Dados de usuário', 'Script de instalação'], correct: 0, explanation: 'requirements.txt lista pacotes necessários para o projeto.' }
            ],
            
            c: [
                { question: 'Como incluir biblioteca padrão?', options: ['#include <stdio.h>', 'import stdio.h', 'using stdio.h', 'include stdio.h'], correct: 0, explanation: '#include <stdio.h> inclui biblioteca padrão de I/O.' },
                { question: 'Como declarar variável inteira?', options: ['int x;', 'integer x;', 'var x: int', 'x int'], correct: 0, explanation: 'int x; declara variável do tipo inteiro.' },
                { question: 'Como fazer printf?', options: ['printf("texto");', 'print("texto")', 'cout << "texto"', 'println("texto")'], correct: 0, explanation: 'printf() é função de output da biblioteca stdio.' },
                { question: 'O que significa void?', options: ['Tipo sem valor', 'Tipo vazio', 'Tipo padrão', 'Tipo genérico'], correct: 1, explanation: 'void indica ausência de tipo (funções que não retornam valor).' },
                { question: 'Como fazer loop for?', options: ['for(int i=0; i<10; i++)', 'for i in 1..10', 'for(i=1; i<=10; i++)', 'foreach i in 10'], correct: 0, explanation: 'C usa sintaxe: for(inicialização; condição; incremento).' },
                { question: 'Como usar arrays?', options: ['int arr[10];', 'int arr(10);', 'array int arr[10]', 'arr = int[10]'], correct: 0, explanation: 'Arrays em C usam colchetes: tipo nome[tamanho].' },
                { question: 'O que é malloc?', options: ['Alocação de memória dinâmica', 'Liberação de memória', 'Ponteiro de memória', 'Memória limpa'], correct: 0, explanation: 'malloc() aloca bloco de memória dinamicamente.' },
                { question: 'Como usar ponteiros?', options: ['int *ptr;', 'pointer int ptr', 'ptr int *', 'int ptr *'], correct: 0, explanation: 'Ponteiros usam *: tipo *nome_ponteiro.' },
                { question: 'O que é & (address operator)?', options: ['Endereço de variável', 'Referência', 'Ponteiro', 'Todas as anteriores'], correct: 3, explanation: '& retorna endereço da variável (address of operator).' },
                { question: 'Como dereferenciar ponteiro?', options: ['*ptr', 'ptr*', '&ptr', 'ptr&'], correct: 0, explanation: '*ptr acessa valor apontado pelo ponteiro.' },
                { question: 'Como definir função?', options: ['int funcao() {}', 'function funcao() {}', 'def funcao():', 'func funcao()'], correct: 0, explanation: 'Funções C: tipo_retorno nome(parametros) { corpo }.' },
                { question: 'O que é struct?', options: ['Estrutura de dados', 'Variável complexa', 'Conjunto de campos', 'Todas as anteriores'], correct: 3, explanation: 'struct agrupa diferentes tipos de dados em uma estrutura.' },
                { question: 'Como acessar campo struct?', options: ['var.campo', 'var->campo', 'var.field', 'var[campo]'], correct: 0, explanation: 'var.campo acessa campo de struct (dot notation).' },
                { question: 'O que é typedef?', options: ['Cria alias para tipo', 'Define novo tipo', 'Redefine tipo', 'Todas as anteriores'], correct: 3, explanation: 'typedef cria nome alternativo para tipo existente.' },
                { question: 'Como fazer enum?', options: ['enum Cores {RED, GREEN}', 'enum Cores {RED, GREEN, BLUE}', 'enum Cores = {RED, GREEN}', 'enum Cores: RED, GREEN'], correct: 1, explanation: 'enum define conjunto de constantes nomeadas.' },
                { question: 'O que é sizeof?', options: ['Tamanho em bytes', 'Número de elementos', 'Tamanho de array', 'Tamanho de struct'], correct: 0, explanation: 'sizeof retorna tamanho em bytes do tipo/variável.' },
                { question: 'Como usar switch?', options: ['switch(x) { case 1: break; }', 'case x: { break; }', 'switch x: case 1', 'select x: case 1'], correct: 0, explanation: 'switch(variavel) { case valor: break; }.' },
                { question: 'O que é break?', options: ['Sai do loop/switch', 'Pula iteração', 'Termina função', 'Recomeça loop'], correct: 0, explanation: 'break sai imediatamente do loop ou switch atual.' },
                { question: 'O que é continue?', options: ['Pula para próxima iteração', 'Sai do loop', 'Termina função', 'Recomeça loop'], correct: 0, explanation: 'continue pula para próxima iteração do loop.' },
                { question: 'Como usar while?', options: ['while(condição) {}', 'while condição: {}', 'while {condição}', 'loop while {condição}'], correct: 0, explanation: 'while(condição) executa enquanto condição for verdadeira.' },
                { question: 'O que é do-while?', options: ['Executa pelo menos uma vez', 'Loop infinito', 'Loop recursivo', 'Loop paralelo'], correct: 0, explanation: 'do-while executa corpo pelo menos uma vez, depois testa condição.' },
                { question: 'Como fazer comentário?', options: ['// texto', '/* texto */', '# texto', 'both'], correct: 3, explanation: 'C suporta // (linha) e /* */ (bloco) para comentários.' },
                { question: 'O que é main?', options: ['Função principal', 'Programa principal', 'Inicio do código', 'Todas as anteriores'], correct: 3, explanation: 'main() é a função principal onde execução do programa começa.' },
                { question: 'Como ler input?', options: ['scanf("%d", &x);', 'input(x)', 'cin >> x', 'read(x)'], correct: 0, explanation: 'scanf() lê input formatado da biblioteca stdio.' },
                { question: 'O que é const?', options: ['Variável imutável', 'Constante', 'Variável de classe', 'Todas as anteriores'], correct: 3, explanation: 'const torna variável imutável após inicialização.' },
                { question: 'Como usar array multidimensional?', options: ['int matriz[2][3];', 'int matriz(2,3);', 'int[] matriz[2][3]', 'matriz int[2][3]'], correct: 0, explanation: 'Arrays multidimensionais: tipo nome[tamanho1][tamanho2].' },
                { question: 'O que é string?', options: ['Array de char', 'Ponteiro de char', 'Tipo de dado', 'Todas as anteriores'], correct: 3, explanation: 'String em C é array de chars terminada por \\0.' },
                { question: 'Como usar strcpy?', options: ['strcpy(dest, src)', 'copy(dest, src)', 'stringCopy(dest, src)', 'str_copy(dest, src)'], correct: 0, explanation: 'strcpy() copia string de src para dest.' },
                { question: 'O que é &x (address)?', options: ['Endereço de x', 'Valor de x', 'Referência a x', 'Ponteiro para x'], correct: 0, explanation: '&x retorna endereço de memória da variável x.' },
                { question: 'Como alocar array dinâmico?', options: ['int *arr = malloc(n * sizeof(int));', 'int arr[n] = malloc(n);', 'alloc int arr[n]', 'new int[n]'], correct: 0, explanation: 'malloc(n * sizeof(tipo)) aloca n elementos de tipo.' },
                { question: 'O que é free?', options: ['Libera memória alocada', 'Zera memória', 'Remove ponteiro', 'Limpa buffer'], correct: 0, explanation: 'free() libera memória previamente alocada com malloc.' },
                { question: 'Como fazer casting?', options: ['(tipo)variavel', 'tipo(variavel)', 'as tipo variavel', 'to tipo variavel'], correct: 0, explanation: 'Casting: (tipo)variavel converte tipo da variável.' }
            ]
        };
    }

    /**
     * Generate coding challenges for all languages
     */
    generateCodingQuestions() {
        return {
            js: [
                {
                    prompt: 'Crie uma função que soma dois números',
                    template: 'function soma(a, b) {\n    // Sua código aqui\n}',
                    test: 'soma(2, 3) === 5',
                    solution: 'function soma(a, b) {\n    return a + b;\n}',
                    explanation: 'Esta função utiliza o operador + para somar os dois parâmetros.'
                },
                {
                    prompt: 'Crie uma função que verifica se um número é par',
                    template: 'function isPar(num) {\n    // Sua código aqui\n}',
                    test: 'isPar(4) === true',
                    solution: 'function isPar(num) {\n    return num % 2 === 0;\n}',
                    explanation: 'Um número é par quando o resto da divisão por 2 é zero.'
                },
                {
                    prompt: 'Crie uma função que calcula o fatorial de um número',
                    template: 'function fatorial(n) {\n    // Sua código aqui\n}',
                    test: 'fatorial(5) === 120',
                    solution: 'function fatorial(n) {\n    if (n <= 1) return 1;\n    return n * fatorial(n - 1);\n}',
                    explanation: 'Fatorial é o produto de todos os números naturais de 1 até n.'
                },
                {
                    prompt: 'Crie uma função que inverte uma string',
                    template: 'function inverter(str) {\n    // Sua código aqui\n}',
                    test: 'inverter("hello") === "olleh"',
                    solution: 'function inverter(str) {\n    return str.split("").reverse().join("");\n}',
                    explanation: 'split() divide a string, reverse() inverte o array, join() reconstrói.'
                },
                {
                    prompt: 'Crie uma função que conta vogais em uma string',
                    template: 'function contarVogais(str) {\n    // Sua código aqui\n}',
                    test: 'contarVogais("programacao") === 6',
                    solution: 'function contarVogais(str) {\n    const vogais = "aeiouAEIOU";\n    return str.split("").filter(c => vogais.includes(c)).length;\n}',
                    explanation: 'Filtramos apenas os caracteres que são vogais.'
                },
                {
                    prompt: 'Crie uma função que verifica se uma palavra é palíndromo',
                    template: 'function isPalindromo(palavra) {\n    // Sua código aqui\n}',
                    test: 'isPalindromo("radar") === true',
                    solution: 'function isPalindromo(palavra) {\n    return palavra === palavra.split("").reverse().join("");\n}',
                    explanation: 'Uma palavra é palíndromo se lida de trás para frente é igual.'
                },
                {
                    prompt: 'Crie uma função que calcula a média de um array de números',
                    template: 'function calcularMedia(nums) {\n    // Sua código aqui\n}',
                    test: 'calcularMedia([1, 2, 3, 4, 5]) === 3',
                    solution: 'function calcularMedia(nums) {\n    return nums.reduce((a, b) => a + b, 0) / nums.length;\n}',
                    explanation: 'Soma todos os números e divide pela quantidade de elementos.'
                },
                {
                    prompt: 'Crie uma função que remove elementos duplicados de um array',
                    template: 'function removerDuplicados(arr) {\n    // Sua código aqui\n}',
                    test: 'removerDuplicados([1,2,2,3,4,4,5]) === [1,2,3,4,5]',
                    solution: 'function removerDuplicados(arr) {\n    return [...new Set(arr)];\n}',
                    explanation: 'Set armazena apenas valores únicos, spread converte de volta para array.'
                },
                {
                    prompt: 'Crie uma função que encontra o maior número em um array',
                    template: 'function maiorNumero(arr) {\n    // Sua código aqui\n}',
                    test: 'maiorNumero([3,7,2,9,1]) === 9',
                    solution: 'function maiorNumero(arr) {\n    return Math.max(...arr);\n}',
                    explanation: 'Math.max() com spread operator encontra o maior valor.'
                },
                {
                    prompt: 'Crie uma função que verifica se um array está ordenado',
                    template: 'function estaOrdenado(arr) {\n    // Sua código aqui\n}',
                    test: 'estaOrdenado([1,2,3,4,5]) === true',
                    solution: 'function estaOrdenado(arr) {\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] < arr[i-1]) return false;\n    }\n    return true;\n}',
                    explanation: 'Verificamos se cada elemento é maior ou igual ao anterior.'
                }
                // Continue with more JS challenges...
            ],
            python: [
                {
                    prompt: 'Crie uma função que soma dois números',
                    template: 'def soma(a, b):\n    # Sua código aqui\n',
                    test: 'soma(2, 3) == 5',
                    solution: 'def soma(a, b):\n    return a + b',
                    explanation: 'A função soma utiliza o operador + para combinar os dois parâmetros.'
                },
                {
                    prompt: 'Crie uma função que verifica se um número é primo',
                    template: 'def is_primo(n):\n    # Sua código aqui\n',
                    test: 'is_primo(7) == True',
                    solution: 'def is_primo(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True',
                    explanation: 'Um número é primo se ser divisível apenas por 1 e por si mesmo.'
                },
                {
                    prompt: 'Crie uma função que calcula fatorial',
                    template: 'def fatorial(n):\n    # Sua código aqui\n',
                    test: 'fatorial(5) == 120',
                    solution: 'def fatorial(n):\n    if n <= 1: return 1\n    return n * fatorial(n - 1)',
                    explanation: 'Fatorial é o produto de todos os números de 1 até n.'
                },
                {
                    prompt: 'Crie uma função que inverte uma string',
                    template: 'def inverter(texto):\n    # Sua código aqui\n',
                    test: 'inverter("hello") == "olleh"',
                    solution: 'def inverter(texto):\n    return texto[::-1]',
                    explanation: 'Slicing [::-1] inverte a string em Python.'
                },
                {
                    prompt: 'Crie uma função que conta vogais',
                    template: 'def contar_vogais(texto):\n    # Sua código aqui\n',
                    test: 'contar_vogais("programacao") == 6',
                    solution: 'def contar_vogais(texto):\n    vogais = "aeiouAEIOU"\n    return sum(1 for char in texto if char in vogais)',
                    explanation: 'Contamos caracteres que estão na string de vogais.'
                },
                {
                    prompt: 'Crie uma função que verifica palíndromo',
                    template: 'def palindromo(palavra):\n    # Sua código aqui\n',
                    test: 'palindromo("radar") == True',
                    solution: 'def palindromo(palavra):\n    return palavra == palavra[::-1]',
                    explanation: 'Palíndromo lido de trás para frente é igual ao original.'
                },
                {
                    prompt: 'Crie uma função que calcula média de lista',
                    template: 'def calcular_media(numeros):\n    # Sua código aqui\n',
                    test: 'calcular_media([1, 2, 3, 4, 5]) == 3',
                    solution: 'def calcular_media(numeros):\n    return sum(numeros) / len(numeros)',
                    explanation: 'Soma dividida pela quantidade de elementos.'
                },
                {
                    prompt: 'Crie uma função que remove duplicatas',
                    template: 'def remove_duplicados(lista):\n    # Sua código aqui\n',
                    test: 'remove_duplicados([1,2,2,3,4,4,5]) == [1,2,3,4,5]',
                    solution: 'def remove_duplicados(lista):\n    return list(set(lista))',
                    explanation: 'Set automaticamente remove duplicatas, convertemos de volta para lista.'
                },
                {
                    prompt: 'Crie uma função que encontra maior número',
                    template: 'def maior_numero(lista):\n    # Sua código aqui\n',
                    test: 'maior_numero([3,7,2,9,1]) == 9',
                    solution: 'def maior_numero(lista):\n    return max(lista)',
                    explanation: 'max() retorna o maior valor da lista.'
                },
                {
                    prompt: 'Crie uma função que verifica se lista está ordenada',
                    template: 'def lista_ordenada(lista):\n    # Sua código aqui\n',
                    test: 'lista_ordenada([1,2,3,4,5]) == True',
                    solution: 'def lista_ordenada(lista):\n    return lista == sorted(lista)',
                    explanation: 'sorted() retorna lista ordenada, comparamos com original.'
                }
            ],
            c: [
                {
                    prompt: 'Crie uma função que soma dois inteiros',
                    template: 'int soma(int a, int b) {\n    // Sua código aqui\n}',
                    test: 'soma(2, 3) == 5',
                    solution: 'int soma(int a, int b) {\n    return a + b;\n}',
                    explanation: 'Função C com tipo de retorno e parâmetros tipados.'
                },
                {
                    prompt: 'Crie uma função que calcula fatorial',
                    template: 'int fatorial(int n) {\n    // Sua código aqui\n}',
                    test: 'fatorial(5) == 120',
                    solution: 'int fatorial(int n) {\n    if (n <= 1) return 1;\n    return n * fatorial(n - 1);\n}',
                    explanation: 'Recursão em C para calcular fatorial.'
                },
                {
                    prompt: 'Crie uma função que inverte string',
                    template: 'void inverter(char *str) {\n    // Sua código aqui\n}',
                    test: 'char str[6] = "hello"; inverter(str); strcmp(str, "olleh") == 0',
                    solution: 'void inverter(char *str) {\n    int len = strlen(str);\n    for (int i = 0; i < len/2; i++) {\n        char temp = str[i];\n        str[i] = str[len-1-i];\n        str[len-1-i] = temp;\n    }\n}',
                    explanation: 'Algoritmo de troca de posições para inverter string.'
                },
                {
                    prompt: 'Crie uma função que verifica se número é par',
                    template: 'int isPar(int n) {\n    // Sua código aqui\n}',
                    test: 'isPar(4) == 1',
                    solution: 'int isPar(int n) {\n    return n % 2 == 0;\n}',
                    explanation: 'Resto da divisão por 2 determina se é par.'
                },
                {
                    prompt: 'Crie uma função que encontra maior em array',
                    template: 'int maior_array(int arr[], int tamanho) {\n    // Sua código aqui\n}',
                    test: 'int arr[] = {3,7,2,9,1}; maior_array(arr, 5) == 9',
                    solution: 'int maior_array(int arr[], int tamanho) {\n    int max = arr[0];\n    for (int i = 1; i < tamanho; i++) {\n        if (arr[i] > max) max = arr[i];\n    }\n    return max;\n}',
                    explanation: 'Percorremos array mantendo o maior valor encontrado.'
                }
            ]
            // Continue for other languages...
        };
    }

    /**
     * Generate debugging questions for all languages
     */
    generateDebuggingQuestions() {
        return {
            js: [
                {
                    error: 'TypeError: Cannot read property \'length\' of undefined',
                    options: [
                        'A variável está definida mas é null',
                        'A propriedade length não existe no objeto',
                        'A variável é undefined ou null',
                        'O objeto não foi inicializado'
                    ],
                    correct: 2,
                    explanation: 'Este erro ocorre quando tentamos acessar uma propriedade de uma variável que é undefined ou null.'
                },
                {
                    error: 'ReferenceError: x is not defined',
                    options: [
                        'A variável x não foi declarada',
                        'A variável x foi declarada mas não inicializada',
                        'A função x não existe',
                        'O escopo da variável x é inválido'
                    ],
                    correct: 0,
                    explanation: 'ReferenceError indica que a variável não foi definida no escopo atual.'
                },
                {
                    error: 'SyntaxError: Unexpected token',
                    options: [
                        'Caractere inválido na sintaxe',
                        'Falta vírgula ou ponto e vírgula',
                        'Parênteses ou chaves não fechados',
                        'Todas as anteriores'
                    ],
                    correct: 3,
                    explanation: 'SyntaxError pode ser causado por diversos problemas de sintaxe.'
                },
                {
                    error: 'RangeError: Maximum call stack size exceeded',
                    options: [
                        'Loop infinito',
                        'Recursão sem caso base',
                        'Excesso de chamadas de função',
                        'Todas as anteriores'
                    ],
                    correct: 3,
                    explanation: 'RangeError da call stack indica recursão infinita ou muitas chamadas aninhadas.'
                },
                {
                    error: 'Cannot read property \'map\' of undefined',
                    options: [
                        'A variável não é um array',
                        'A variável é null ou undefined',
                        'A função map não existe',
                        'O array está vazio'
                    ],
                    correct: 1,
                    explanation: 'Tentamos usar map() em uma variável que é null ou undefined.'
                }
                // Continue with more JS debugging...
            ],
            python: [
                {
                    error: 'NameError: name \'variable\' is not defined',
                    options: [
                        'A variável não foi criada',
                        'A variável foi criada mas não inicializada',
                        'Erro de sintaxe na declaração',
                        'Variável está fora do escopo'
                    ],
                    correct: 0,
                    explanation: 'NameError ocorre quando tentamos usar uma variável que não existe.'
                },
                {
                    error: 'TypeError: can only concatenate str (not "int") to str',
                    options: [
                        'Concatenar string com número',
                        'Falta conversão de tipo',
                        'Operação entre tipos incompatíveis',
                        'Todas as anteriores'
                    ],
                    correct: 3,
                    explanation: 'TypeError indica tentativa de operação entre tipos incompatíveis.'
                }
                // Continue with more Python debugging...
            ]
            // Continue for other languages...
        };
    }

    /**
     * Generate code correction questions for all languages
     */
    generateCorrectionQuestions() {
        return {
            js: [
                {
                    incorrect: 'function soma(a,b) {\n    return a + b\n}',
                    correct: 'function soma(a, b) {\n    return a + b;\n}',
                    error: 'Faltam espaços e ponto e vírgula',
                    explanation: 'É uma boa prática usar espaços entre parâmetros e sempre terminar statements com ponto e vírgula.'
                },
                {
                    incorrect: 'if (x > 0 {\n    console.log("positivo")\n}',
                    correct: 'if (x > 0) {\n    console.log("positivo");\n}',
                    error: 'Falta parênteses de fechamento no if',
                    explanation: 'A estrutura if precisa de parênteses de fechamento para funcionar corretamente.'
                },
                {
                    incorrect: 'const PI = 3.14159\npi = PI * 2',
                    correct: 'const PI = 3.14159;\nconst resultado = PI * 2;',
                    error: 'Tentativa de reatribuir constante',
                    explanation: 'Constantes não podem ser reatribuídas. Use let para variáveis mutáveis.'
                },
                {
                    incorrect: 'function mult(x,y) x * y',
                    correct: 'function mult(x, y) {\n    return x * y;\n}',
                    error: 'Função não retorna valor explicitamente',
                    explanation: 'Se a função tem múltiplas linhas, deve usar chaves e return explícito.'
                },
                {
                    incorrect: 'let numeros = [1, 2, 3]\nnumeros.push(4)\nconsole.log(numeros)',
                    correct: 'let numeros = [1, 2, 3];\nnumeros.push(4);\nconsole.log(numeros);',
                    error: 'Faltam ponto e vírgulas',
                    explanation: 'Embora JavaScript seja flexível, é uma boa prática usar ponto e vírgulas.'
                }
                // Continue with more JS corrections...
            ],
            python: [
                {
                    incorrect: 'def soma(a,b):\nreturn a + b',
                    correct: 'def soma(a, b):\n    return a + b',
                    error: 'Falta indentação',
                    explanation: 'Em Python, o corpo da função deve estar indentado.'
                },
                {
                    incorrect: 'if x > 0:\nprint("positivo")',
                    correct: 'if x > 0:\n    print("positivo")',
                    error: 'Falta indentação no print',
                    explanation: 'O código dentro do if deve estar indentado.'
                },
                {
                    incorrect: 'list = [1,2,3]\nlist.append(4)\nprint(list)',
                    correct: 'lista = [1, 2, 3]\nlista.append(4)\nprint(lista)',
                    error: 'list é palavra reservada',
                    explanation: 'list() é função builtin, não use como nome de variável.'
                },
                {
                    incorrect: 'for i in range(10)\nprint(i)',
                    correct: 'for i in range(10):\n    print(i)',
                    error: 'Falta dois pontos',
                    explanation: 'Estruturas de controle precisam de dois pontos (:) em Python.'
                },
                {
                    incorrect: 'x = 10\ny = "5"\nresult = x + y',
                    correct: 'x = 10\ny = "5"\nresult = x + int(y)',
                    error: 'Concatenação tipos incompatíveis',
                    explanation: 'Não posso somar int e string, preciso converter string para int.'
                }
            ],
            c: [
                {
                    incorrect: 'int main() {\nprintf("Hello")\nreturn 0',
                    correct: 'int main() {\n    printf("Hello");\n    return 0;\n}',
                    error: 'Faltam ponto e vírgulas',
                    explanation: 'Statements em C devem terminar com ponto e vírgula.'
                },
                {
                    incorrect: '#include <stdio.h>\nint main\nprintf("Hello");\nreturn 0;',
                    correct: '#include <stdio.h>\nint main() {\n    printf("Hello");\n    return 0;\n}',
                    error: 'Falta parênteses e chaves',
                    explanation: 'Função main precisa de parênteses e chaves para corpo.'
                },
                {
                    incorrect: 'int x, y = 5, 10;',
                    correct: 'int x = 5, y = 10;',
                    error: 'Atribuição incorreta',
                    explanation: 'Cada variável deve ter sua própria atribuição.'
                },
                {
                    incorrect: 'int arr[5];\narr = {1,2,3,4,5};',
                    correct: 'int arr[] = {1, 2, 3, 4, 5};',
                    error: 'Atribuição direta a array',
                    explanation: 'Arrays não podem ser reatribuídos após declaração.'
                },
                {
                    incorrect: 'int *ptr = 10;',
                    correct: 'int x = 10; int *ptr = &x;',
                    error: 'Atribuição inválida a ponteiro',
                    explanation: 'Ponteiro deve receber endereço de variável, não valor.'
                }
            ],
            typescript: [
                {
                    incorrect: 'function soma(a, b) {\n    return a + b',
                    correct: 'function soma(a: number, b: number): number {\n    return a + b;\n}',
                    error: 'Falta tipagem e fechamento',
                    explanation: 'TypeScript requer tipagem de parâmetros e retorno.'
                },
                {
                    incorrect: 'const obj = {nome: "João", idade: 25}\nobj.nome = "Maria"',
                    correct: 'const obj = {nome: "João", idade: 25};\nobj.nome = "Maria";',
                    error: 'Vírgulas e ponto e vírgula',
                    explanation: 'Objetos precisam de vírgulas e statements de ponto e vírgula.'
                },
                {
                    incorrect: 'interface Pessoa {\n    nome: string\n    idade: number\n}',
                    correct: 'interface Pessoa {\n    nome: string;\n    idade: number;\n}',
                    error: 'Faltam ponto e vírgulas',
                    explanation: 'Propriedades de interface precisam de ponto e vírgula.'
                }
            ]
            // Continue for other languages...
        };
    }

    /**
     * Generate questions based on mode and count
     */
    async generateQuestions(mode, count = 20) {
        const questions = [];
        const languages = this.getRandomLanguages(count);
        
        for (let i = 0; i < count; i++) {
            const language = languages[i];
            let question = null;
            
            switch (mode) {
                case 'choice':
                    question = this.generateChoiceQuestion(language, i);
                    break;
                case 'coding':
                    question = this.generateCodingChallenge(language, i);
                    break;
                case 'debugging':
                    question = this.generateDebuggingChallenge(language, i);
                    break;
                case 'correction':
                    question = this.generateCorrectionChallenge(language, i);
                    break;
                case 'random':
                    const randomMode = this.getRandomMode();
                    question = await this.generateQuestions(randomMode, 1);
                    question = question[0];
                    break;
            }
            
            if (question) {
                questions.push(question);
            }
        }
        
        return questions;
    }

    /**
     * Get random languages for questions
     */
    getRandomLanguages(count) {
        const allLanguages = ['html', 'css', 'js', 'ts', 'c', 'cpp', 'csharp', 'python', 'sql', 'java', 'php', 'go', 'rust', 'kotlin', 'swift'];
        const languages = [];
        
        for (let i = 0; i < count; i++) {
            const randomLang = allLanguages[Math.floor(Math.random() * allLanguages.length)];
            languages.push(randomLang);
        }
        
        return languages;
    }

    /**
     * Get random mode
     */
    getRandomMode() {
        const modes = ['choice', 'coding', 'debugging', 'correction'];
        return modes[Math.floor(Math.random() * modes.length)];
    }

    /**
     * Generate choice question for specific language
     */
    generateChoiceQuestion(language, index) {
        const bank = this.questionBanks.choice[language] || this.questionBanks.choice.js;
        const questionData = bank[index % bank.length];
        
        return {
            id: `choice_${language}_${index}`,
            type: 'choice',
            language: language,
            question: questionData.question,
            options: questionData.options,
            correct: questionData.correct,
            explanation: questionData.explanation,
            selectedAnswer: null
        };
    }

    /**
     * Generate coding challenge for specific language
     */
    generateCodingChallenge(language, index) {
        const bank = this.questionBanks.coding[language] || this.questionBanks.coding.js;
        const challengeData = bank[index % bank.length];
        
        return {
            id: `coding_${language}_${index}`,
            type: 'coding',
            language: language,
            question: challengeData.prompt,
            template: challengeData.template,
            test: challengeData.test,
            solution: challengeData.solution,
            explanation: challengeData.explanation,
            userCode: ''
        };
    }

    /**
     * Generate debugging challenge for specific language
     */
    generateDebuggingChallenge(language, index) {
        const bank = this.questionBanks.debugging[language] || this.questionBanks.debugging.js;
        const errorData = bank[index % bank.length];
        
        return {
            id: `debug_${language}_${index}`,
            type: 'debugging',
            language: language,
            error: errorData.error,
            options: errorData.options,
            correct: errorData.correct,
            explanation: errorData.explanation
        };
    }

    /**
     * Generate correction challenge for specific language
     */
    generateCorrectionChallenge(language, index) {
        const bank = this.questionBanks.correction[language] || this.questionBanks.correction.js;
        const correctionData = bank[index % bank.length];
        
        return {
            id: `correction_${language}_${index}`,
            type: 'correction',
            language: language,
            incorrectCode: correctionData.incorrect,
            correctCode: correctionData.correct,
            error: correctionData.error,
            explanation: correctionData.explanation,
            userCode: ''
        };
    }
}

// Initialize question generator and make it globally available
const questionGenerator = new QuestionGenerator();
window.generateQuestions = (mode, count) => questionGenerator.generateQuestions(mode, count);