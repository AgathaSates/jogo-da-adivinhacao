import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit{
  public numeroSecret: number = 0;
  public numeroDigitado: number = 1;

  public dicaNumeroMaiorQue: number = 1;
  public dicaNumeroMenorQue: number = 100;

  public jogoEstaFinalizad: boolean = false;
  public venceu: boolean = false;
  public perdeu: boolean = false;
  public placar: number = 0;
  public chances: number = 4;

  ngOnInit(): void {
    this.numeroSecret = this.ObterNumeroSecreto();
  }

  public adivinhar(){
    if(this.chances == 1 && this.numeroDigitado !== this.numeroSecret){
      this.jogoEstaFinalizad = true;
      this.venceu = false
      this.perdeu = true
      this.chances = 4;
    }
    else if(this.numeroDigitado > this.numeroSecret){
      this.dicaNumeroMenorQue = this.numeroDigitado;
      this.chances -= 1;
    }
    else if(this.numeroDigitado < this.numeroSecret){
      this.dicaNumeroMaiorQue = this.numeroDigitado;
      this.chances -= 1;
    }
    else{
      this.jogoEstaFinalizad = true;
      this.venceu = true;
      this.perdeu = false
      this.placar += 1;
      this.chances = 4;
    }
  }

  public reiniciar(){
    this.jogoEstaFinalizad = false;
    this.venceu = false
    this.perdeu = false
    this.numeroDigitado = 1;
    this.dicaNumeroMaiorQue = 1;
    this.dicaNumeroMenorQue = 100;

    this.numeroSecret = this.ObterNumeroSecreto();
  }

  private ObterNumeroSecreto(){
    const numeroAleatorio: number = Math.random() * 100;
    const numeroSecreto = Math.floor(numeroAleatorio);

    console.log(numeroSecreto);

    return numeroSecreto;
  }
}
