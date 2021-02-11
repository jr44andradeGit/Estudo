//import { Negociacao } from '../models/Negociacao'
import { Imprimivel } from '../models/index' 

//export function imprime(...negociacoes: Negociacao[]) {
export function imprime(...objeto: Imprimivel[]) {

    objeto.forEach(objeto => objeto.paraTexto());
}