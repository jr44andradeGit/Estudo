export function domInject(seletor: string, logaSeletor: boolean = false ) {

    return function(target: any, key: string) {

        let elemento: JQuery;

        const getter = function() {

            if(!elemento) {
                
                if (logaSeletor)
                console.log(`buscando ${seletor} para injetar em ${key} - target = ${target}`);
                
                elemento = $(seletor);
            }

            return elemento;
        }

       Object.defineProperty(target, key, {
           get: getter
       });
    }
}