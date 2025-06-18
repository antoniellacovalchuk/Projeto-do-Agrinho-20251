// Variáveis globais para os personagens e o diálogo
let ana; // Objeto que representará a personagem Ana (do campo)
let bruno; // Objeto que representará o personagem Bruno (da cidade)
let currentDialogueIndex = 0; // Índice da fala atual no array de diálogo
let dialogueText = []; // Array que armazenará todas as falas do diálogo

// Variáveis para controlar o tempo entre os cliques (evitar cliques duplos acidentais)
let lastClickTime = 0;
const CLICK_DEBOUNCE_TIME = 300; // Tempo mínimo em milissegundos entre um clique e outro

// Função setup() do P5.js: Executada uma vez ao iniciar o programa
function setup() {
  // Cria a tela de desenho (canvas) com 800 pixels de largura por 600 de altura
  createCanvas(800, 600);
  background(240); // Define a cor de fundo inicial como um cinza claro

  // Instancia os objetos Person para Ana e Bruno
  // Passamos a posição X, a posição Y (base onde a pessoa "pisa"), e o tipo
  ana = new Person(width * 0.25, height * 0.70, 'ana'); // Ana fica no lado esquerdo (campo)
  bruno = new Person(width * 0.75, height * 0.70, 'bruno'); // Bruno fica no lado direito (cidade)

  // --- NOVO DIÁLOGO MAIS LONGO COM FRASES CURTAS ---
  dialogueText = [
    { speaker: "ANA", text: "Bruno, a cidade é agitada. Mas de onde vem sua força?" },
    { speaker: "BRUNO", text: "Da energia das pessoas, Ana. Da inovação constante." },
    { speaker: "ANA", text: "E a comida? A água? O ar puro? Vem daqui." },
    { speaker: "BRUNO", text: "Você tem razão. As lojas trazem, mas a fonte é o campo." },
    { speaker: "ANA", text: "Cada alimento tem uma história. De sementes e suor." },
    { speaker: "BRUNO", text: "Nós, na cidade, perdemos essa conexão diária." },
    { speaker: "ANA", text: "O campo sustenta. Ele alimenta não só o corpo, mas a alma." },
    { speaker: "BRUNO", text: "Sim. Buscamos paz e natureza em visitas ao campo." },
    { speaker: "ANA", text: "Mas é preciso ir além da visita. Valorizar quem produz." },
    { speaker: "BRUNO", text: "E as inovações da cidade ajudam o campo a crescer." },
    { speaker: "ANA", text: "Tecnologia, sim. Mas com respeito à terra e seus ciclos." },
    { speaker: "BRUNO", text: "Precisamos investir no campo. Garantir seu futuro." },
    { speaker: "ANA", text: "O campo é a raiz. A cidade é a copa que floresce." },
    { speaker: "BRUNO", text: "Sem raízes fortes, a copa seca, não é?" },
    { speaker: "ANA", text: "Exato. Somos um ecossistema. Dependemos um do outro." },
    { speaker: "BRUNO", text: "Nossa parceria define nosso futuro. A de todos." },
    { speaker: "ANA", text: "É uma responsabilidade compartilhada, então." },
    { speaker: "BRUNO", text: "Sim. Pelo bem da terra e de quem nela habita." },
    { speaker: "INFO", text: "Diálogo finalizado. Clique para reiniciar essa reflexão." } // Mensagem final do diálogo
  ];
  // --- FIM DO NOVO DIÁLOGO ---
}

// Função draw() do P5.js: Executada continuamente, cerca de 60 vezes por segundo
function draw() {
  background(240); // Limpa o fundo a cada quadro para redesenhar

  // Desenha os elementos visuais do cenário (campo e cidade)
  drawBackgrounds();

  // Desenha os personagens Ana e Bruno em suas posições
  ana.display();
  bruno.display();

  // Desenha a caixa de diálogo com a fala atual na parte inferior da tela
  drawDialogueBox();
}

// Classe Person: Define como um personagem (silhueta) é desenhado
class Person {
  constructor(x, y, type) {
    this.x = x; // Posição X central da pessoa
    this.y = y; // Posição Y da base da pessoa
    this.type = type; // 'ana' ou 'bruno' para diferenciar pequenos detalhes visuais
    this.bodyHeight = 120; // Altura do corpo
    this.bodyWidth = 60; // Largura do corpo
    this.headSize = 40; // Tamanho do círculo da cabeça
  }

  // Método display(): Desenha o personagem na tela
  display() {
    push(); // Salva o estado atual das configurações de desenho do P5.js
    translate(this.x, this.y); // Move a origem do sistema de coordenadas para a posição da pessoa

    noStroke(); // Garante que os próximos desenhos não terão contorno
    fill(50); // Define a cor de preenchimento para um cinza escuro (silhueta)

    // Desenha o corpo da pessoa como um retângulo com cantos arredondados
    rectMode(CENTER); // Define que o retângulo será desenhado a partir do seu seu centro
    rect(0, 0, this.bodyWidth, this.bodyHeight, 10); // Desenha o corpo

    // Desenha a cabeça da pessoa como um círculo
    // A posição Y é ajustada para que a cabeça fique acima do corpo
    ellipse(0, -this.bodyHeight / 2 - this.headSize / 2, this.headSize);

    // Adiciona um pequeno detalhe visual para diferenciar Ana e Bruno
    if (this.type === 'ana') {
      // Detalhe para Ana: um pequeno "chapéu" ou cabelo mais cheio
      fill(80, 40, 0); // Cor terrosa (marrom escuro)
      arc(0, -this.bodyHeight / 2 - this.headSize + 5, this.headSize * 1.2, this.headSize * 0.5, PI, TWO_PI);
    } else {
      // Detalhe para Bruno: um elemento que sugere um colarinho ou gola
      fill(100); // Cor cinza médio
      rect(0, -this.bodyHeight / 2 + 10, this.bodyWidth * 0.6, 15);
    }

    pop(); // Restaura as configurações de desenho salvas (muito importante!)
  }
}

// Função drawBackgrounds(): Desenha o cenário dividido (campo e cidade)
function drawBackgrounds() {
  // Lado do Campo (metade esquerda da tela)
  fill(140, 200, 100); // Cor verde clara para a área do campo
  rect(0, 0, width / 2, height); // Desenha o retângulo que representa o campo

  // Detalhes abstratos do Campo: algumas "colinas" ou montes verdes
  fill(120, 180, 80); // Um verde um pouco mais escuro
  ellipse(width * 0.15, height * 0.85, 100, 80); // Primeira colina
  ellipse(width * 0.4, height * 0.9, 120, 90); // Segunda colina

  // Lado da Cidade (metade direita da tela)
  fill(180, 180, 190); // Cor cinza azulado para a área da cidade
  rect(width / 2, 0, width / 2, height); // Desenha o retângulo que representa a cidade

  // Detalhes abstratos da Cidade: alguns "prédios" retangulares
  fill(100, 100, 110); // Um cinza mais escuro para os prédios
  rect(width * 0.60, height * 0.60, 50, 150); // Prédio mais baixo
  rect(width * 0.75, height * 0.50, 60, 200); // Prédio médio
  rect(width * 0.90, height * 0.70, 40, 100); // Prédio mais alto (à direita)

  // Linha divisória sutil no centro da tela para separar visualmente campo e cidade
  stroke(150); // Cor cinza para a linha
  strokeWeight(2); // Espessura da linha
  line(width / 2, 0, width / 2, height); // Desenha a linha vertical no meio
  noStroke(); // Remove o contorno para os próximos desenhos
}

// Função drawDialogueBox(): Desenha a caixa de diálogo e o texto da fala atual
function drawDialogueBox() {
  // Pega o objeto da fala atual do array dialogueText
  let currentDialogue = dialogueText[currentDialogueIndex];

  // Define as dimensões e posição da caixa de diálogo na parte inferior da tela
  let boxX = 50;
  let boxY = height - 120; // 120 pixels acima da base do canvas
  let boxWidth = width - 100; // Largura total do canvas menos 50 de cada lado
  let boxHeight = 100; // Altura da caixa de diálogo

  // Desenha o fundo da caixa de diálogo
  fill(255, 255, 255, 220); // Cor branca com 80% de opacidade (semi-transparente)
  rect(boxX, boxY, boxWidth, boxHeight, 15); // Retângulo com cantos arredondados

  // Configurações gerais para o texto do diálogo
  fill(30); // Cor do texto principal (cinza escuro)
  textSize(18); // Tamanho da fonte do texto do diálogo
  textAlign(LEFT, TOP); // Alinha o texto à esquerda e no topo da área de texto
  textLeading(24); // Define o espaçamento entre as linhas do texto

  // Desenha o nome do falante (ANA, BRUNO, ou INFO)
  push(); // Salva o estilo atual para poder mudar apenas para o nome do falante
  // Define a cor do nome do falante baseada em quem está falando
  if (currentDialogue.speaker === "ANA") {
    fill(120, 80, 0); // Cor terrosa para Ana
  } else if (currentDialogue.speaker === "BRUNO") {
    fill(0, 80, 120); // Cor azulada para Bruno
  } else {
    fill(80); // Cor padrão para mensagens de informação
  }
  textStyle(BOLD); // Deixa o nome do falante em negrito
  text(currentDialogue.speaker + ":", boxX + 20, boxY + 20); // Desenha o nome do falante
  pop(); // Restaura o estilo

  // Desenha o conteúdo da fala (o texto do diálogo)
  fill(30); // Volta à cor padrão para o texto da fala
  textStyle(NORMAL); // Texto normal (sem negrito)
  // Desenha o texto da fala, com limites para que ele quebre a linha automaticamente
  text(currentDialogue.text, boxX + 20, boxY + 45, boxWidth - 40, boxHeight - 65);

  // Adiciona a instrução para o usuário continuar ou reiniciar
  fill(100); // Cor cinza para a instrução
  textSize(14); // Tamanho menor para a instrução
  textAlign(RIGHT, BOTTOM); // Alinha a instrução à direita e na parte inferior da caixa de diálogo
  if (currentDialogueIndex < dialogueText.length - 1) {
    text("Clique para continuar...", width - 60, height - 15);
  } else {
    text("Clique para reiniciar...", width - 60, height - 15);
  }
}

// Função mousePressed(): Executada quando o botão do mouse é pressionado
function mousePressed() {
  // Verifica se passou tempo suficiente desde o último clique para evitar múltiplos cliques acidentais
  if (millis() - lastClickTime > CLICK_DEBOUNCE_TIME) {
    lastClickTime = millis(); // Atualiza o tempo do último clique

    // Se ainda há falas restantes no diálogo, avança para a próxima
    if (currentDialogueIndex < dialogueText.length - 1) {
      currentDialogueIndex++;
    } else {
      // Se chegou ao final do diálogo, reinicia do começo
      currentDialogueIndex = 0;
    }
  }
}