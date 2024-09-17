const {select, input} = require("@inquirer/prompts")

let = metas = []

const cadastrarMeta = async () => {
    const meta = await input({message: "digite uma meta: " })

    if(meta.length == 0) {
        console.log("A meta não pode ser vazia, digite uma meta")
        return
    }

    metas.push({
        value: meta, checked: false
    })

}

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
                await cadastrarMeta()
                console.log(metas)
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