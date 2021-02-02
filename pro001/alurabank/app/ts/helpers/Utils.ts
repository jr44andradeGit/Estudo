//import { Negociacao } from '../models/Negociacao'
<<<<<<< HEAD
import { Imprimivel } from '../models/index' 

//export function imprime(...negociacoes: Negociacao[]) {
export function imprime(...objeto: Imprimivel[]) {
=======

//export function imprime(...negociacoes: Negociacao[]) {
export function imprime(...objeto: any[]) {
>>>>>>> origin

    objeto.forEach(objeto => objeto.paraTexto());
}