const cards = document.querySelectorAll('.card');

let girarCarta = false;
let tabuleiroTravado = false;
let primeiraCarta, segundaCarta;

function girarTabuleiro() {
  if (tabuleiroTravado) return;
  if (this === primeiraCarta) return;

  this.classList.add('flip');

  if (!girarCarta) {
    girarCarta = true;
    primeiraCarta = this;
    return;
  }

  segundaCarta = this;
  tabuleiroTravado = true;

  verificarIgualdade();
}

function verificarIgualdade() {
  let verificacao = primeiraCarta.dataset.personagem === segundaCarta.dataset.personagem;
  verificacao ? desativarCartas() : desvirarCartas();
}

function desativarCartas() {
  primeiraCarta.removeEventListener('click', girarTabuleiro);
  segundaCarta.removeEventListener('click', girarTabuleiro);

  reiniciarTabuleiro();
}

function desvirarCartas() {
  setTimeout(() => {
    primeiraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');

    reiniciarTabuleiro();
  }, 800);
}

function reiniciarTabuleiro() {
  [girarCarta, tabuleiroTravado] = [false, false];
  [primeiraCarta, segundaCarta] = [null, null];
}

(function embaralhar() {
  cards.forEach(card => {
    let posicaoRandomica = Math.floor(Math.random() * 12);
    card.style.order = posicaoRandomica;
  });
})();

cards.forEach(card => card.addEventListener('click', girarTabuleiro));