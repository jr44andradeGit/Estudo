//import { Negociacao } from '../models/Negociacao'

//export function imprime(...negociacoes: Negociacao[]) {
export function imprime(...objeto: any[]) {

    objeto.forEach(objeto => objeto.paraTexto());
}