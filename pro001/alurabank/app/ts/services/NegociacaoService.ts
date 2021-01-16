import { NegociacaoParcial, Negociacao } from '../models/index';

export class NegociacaoService {

    obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {

        return <Promise<Negociacao[]>> fetch("http://localhost:8080/dados")
        .then((res) => handler(res))
        .then((res) => res.json())
        .then((dados: NegociacaoParcial[]) => 
            dados.map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
        .catch((err) => console.log(err.message));
 
         /* 
        return fetch('http://localhost:8080/dados')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(err => {
                console.log(err);
                return []
            }
            ); 
            
        */

        //Com erro pois não retorna a array no catch 
        /*     
        return fetch('http://localhost:8080/dados')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => 
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(err => console.log(err));
        */
    }
}

export interface HandlerFunction {

    (res: Response): Response
}