// array e objetos
let meta = {
    value: "ler um livro todo mês",
    checked: false,
   /* log: (info) => {
        console.log(info)
    }*/ 
}

let metas = [
    meta,
    {
        value: "caminhar 20 minutos por dia",
        checked: false
    }
]

console.log(metas[1].value)

//meta.value = "não é mais ler um livro"
//meta.log(meta.value)

//function // arrow function

//const CriarMeta = () => {}
// function CriarMeta () {}