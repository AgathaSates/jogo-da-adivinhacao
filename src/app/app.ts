import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  public numeroSecret: number = 0;
  public numeroDigitado: number = 1;

  public dicaNumeroMaiorQue: number = 1;
  public dicaNumeroMenorQue: number = 100;

  public jogoEstaFinalizad: boolean = false;

  public dificuldadeSelecionada?: string;
  public tentativasRestantes: number = 0;
  public pontuacao: number = 100;

  public ultimaPontuacao: number[] = [];
  public dificuldadeJogada: string[] = [];

  ngOnInit(): void {}

  public selecionarDificuldade(dificuldade: string): void {
    switch (dificuldade) {
      case 'Fácil':
        this.numeroSecret = this.ObterNumeroSecreto(10);
        this.dicaNumeroMenorQue = 10;
        this.tentativasRestantes = 3;
        break;

      case 'Médio':
        this.numeroSecret = this.ObterNumeroSecreto(50);
        this.dicaNumeroMenorQue = 50;
        this.tentativasRestantes = 6;
        break;

      case 'Dificil':
        this.numeroSecret = this.ObterNumeroSecreto(100);
        this.dicaNumeroMenorQue = 100;
        this.tentativasRestantes = 7;
        break;
    }

    this.dificuldadeJogada.push(dificuldade);
    this.dificuldadeSelecionada = dificuldade;
  }

  public adivinhar() {
    this.tentativasRestantes--;
    if (this.tentativasRestantes <= 0) {
      this.jogoEstaFinalizad = true;
      return;
    }

    if (this.numeroDigitado > this.numeroSecret) {
      this.dicaNumeroMenorQue = this.numeroDigitado;
    } else if (this.numeroDigitado < this.numeroSecret) {
      this.dicaNumeroMaiorQue = this.numeroDigitado;
    } else {
      this.jogoEstaFinalizad = true;
    }

    const diferencaNumerica: number = Math.abs(this.numeroSecret - this.numeroDigitado);

    if (diferencaNumerica >= 10) this.pontuacao -= 10;
    else if (diferencaNumerica >= 5) this.pontuacao -= 5;
    else this.pontuacao -= 2;
  }

  public reiniciar() {
    this.jogoEstaFinalizad = false;
    this.numeroDigitado = 1;
    this.dicaNumeroMaiorQue = 1;
    this.dicaNumeroMenorQue = 100;
    this.dificuldadeSelecionada = undefined;
    this.ultimaPontuacao.push(this.pontuacao);
    this.pontuacao = 100;
  }

  private ObterNumeroSecreto(max: number) {
    const numeroAleatorio: number = Math.random() * (max - 1) + 1;
    const numeroSecreto = Math.floor(numeroAleatorio);

    console.log(numeroSecreto);

    return numeroSecreto;
  }
}
