const {select} = require("@inquirer/prompts")

const start = async () => {
    
    while(true){
        const opcao = await select({
            message: "menu >",
            choices: [
            {
                name: "cadastrar meta",
                value: "cadastrar"
            },
            {
                name: "sair",
                value: "sair"
            },
            {
                name: "listar",
                value: "listar"
            }
        ]
        })


        switch(opcao){
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                console.log("até a proxima")
                return        
        }
    }

}

start()