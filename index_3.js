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


/* metas realizadas*/const listarMetas = async () => {
    const respostas = await checkbox({
        message: "use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
     })

     if(respostas.length == 0){
        console.log("nehuma meta selecionada")
        return
     }

 
     respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
     }) 

     console.log("meta(s) marcadas como concluidas(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length == 0){
        console.log("não existem metas realizadas! :(")
        return
    }

    await select({
        message: "metas Realizadas " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        console.log("não existem metas em aberta :)")
        return
    }

    await select({
        message: "metas abertas " + abertas.length,
        choices: [...abertas]
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
                name: "listar",
                value: "listar"
            },

            {
                name: "metas realizadas",
                value: "realizadas"
            },

            {
                name: "metas abertas",
                value: "abertas"
            },

            {
                name: "sair",
                value: "sair"
            },
          
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
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "sair":
                console.log("até a proxima")
                return        
        }
    }

}

start()