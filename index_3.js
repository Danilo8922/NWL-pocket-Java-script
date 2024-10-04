const {select, input, checkbox} = require("@inquirer/prompts")

let  meta = {
    value: "tomar agua todos os dias", 
    checked: false, 
}

let metas = [ meta ]


/* cadastrar metas ->*/ const cadastrarMeta = async () => {
    const meta = await input({message: "digite uma meta: " })

    if(meta.length == 0) {
        console.log("A meta não pode ser vazia, digite uma meta")
        return
    }

    metas.push({
        value: meta, checked: false
    })

}


const listarMetas = async () => {
    const respostas = await checkbox({
        message: "use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,

    })
     if(respostas.length == 0){
        console.log("nehuma meta selecionada")
        return
     }

     metas.forEach((m) => {
        m.checked = false
     })

     respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
     }) 

     console.log("meta(s) marcadas como concluidas(s)")
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
                await listarMetas()
                break
            case "sair":
                console.log("até a proxima")
                return        
        }
    }

}

start()