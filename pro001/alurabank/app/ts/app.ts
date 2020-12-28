import { NegociacaoController } from "./controllers/NegociacaoController";

const controller = new NegociacaoController();

// Usando JQuery !!!
$('.form').submit(controller.adiciona.bind(controller));