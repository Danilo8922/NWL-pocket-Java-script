const {select, input, checkbox} = require("@inquirer/prompts")

let mensagem = "bem vindo(a) ao app de metas"

let  meta = {
    value: "tomar agua todos os dias", 
    checked: false, 
}

let metas = [ meta ]


/* cadastrar metas ->*/ const cadastrarMeta = async () => {
    const meta = await input({message: "digite uma meta: " })

    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia, digite uma meta"
        return
    }

    metas.push({
        value: meta, checked: false
    })

    mensagem = "meta cadastrada com sucesso"

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
        mensagem = "nehuma meta selecionada"
        return
     }

 
     respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
     }) 
     

     mensagem = "meta(s) marcadas como concluidas(s)"
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length == 0){
        mensagem = "não existem metas realizadas! :("
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
        mensagem = "não existem metas em aberta :)"
        return
    }

    await select({
        message: "metas abertas " + abertas.length,
        choices: [...abertas]
    })
}

const deletarmetas = async () =>{
    const metasdesmarcadas = metas.map((meta) => {
        
        return {value: meta.value, checked: false}
    })
    const itensAdeletar = await checkbox({
        message: "selecione uma meta para deletar",
        choices: [...metasdesmarcadas],
        instructions: false,
    })

    if(itensAdeletar.length == 0) {
        mensagem = "nehuma meta selecionada para deletar"
        return
    }

    itensAdeletar.forEach ((item) => {
        metas = metas.filter((meta) =>{
            return meta.value != item
        })

    })

    console.log("metas deletadas com sucesso")

} 

const mostrarMensagem = () => {
    console.clear();

    if (mensagem != "" ){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}
 
const start = async () => {
    
    while(true){
        mostrarMensagem()
    

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
                name: "deletar metas",
                value: "deletar"
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
            case "deletar":
                await deletarmetas()
                break    
            case "sair":
                console.log("até a proxima")
                return        
        }
    }

}

start()