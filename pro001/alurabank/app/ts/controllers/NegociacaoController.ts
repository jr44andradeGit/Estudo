import { NegociacoesView, MensagemView } from "../views/index";
import { Negociacoes, Negociacao } from '../models/index';
//import { logarTempoDeExecucao } from '../helpers/decorators/index';
import { domInject, logarTempoDeExecucao, throttle } from '../helpers/decorators/index';
import { NegociacaoParcial } from '../models/index'
import { NegociacaoService, HandlerFunction } from '../services/index';

let timer = 0;

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _service = new NegociacaoService();

    constructor() {

        //this._inputData = $('#data');
        //this._inputQuantidade = $('#quantidade');
        // this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    //@logarTempoDeExecucao()
    @throttle()
    adiciona(event: Event) {

        //event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this._ehDiautil(data)) {
            this._mensagemView.update('Negociação não permitida nos finais de semana!');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val()));

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    private _ehDiautil(data: Date) {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    importaDados() {

        /*         
        function isOK(res: Response) {
        
                    if (res.ok) {
                        return res;
                    } else {
                        throw new Error(res.statusText);
                    }
                }
         */

        const isOk: HandlerFunction = (res: Response) => {
            if(res.ok) return res;
            throw new Error(res.statusText);
        }

        this._service.obterNegociacoes(isOk)
            .then(negociacoes => {
                negociacoes.forEach((negociacao: Negociacao) =>
                    this._negociacoes.adiciona(negociacao));
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociação importada com sucesso!');
            });

        /*         
        fetch('http://localhost:8080/dados')
                        .then(res => isOK(res))
                        .then(res => res.json())
                        .then((dados: NegociacaoParcial[]) => {
                            dados
                                .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                            this._negociacoesView.update(this._negociacoes);
                            this._mensagemView.update('Negociação importada com sucesso!');
                        })
                        .catch(err => console.log(err.message));
         */
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}