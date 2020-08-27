import { path, listBuilder, list} from "/utils/htmlConstructor.js"
import { searchWord, endLoading, loading} from "/utils/search.js"

const button = document.getElementById('button')
let objAux = {}

document.getElementById('q').addEventListener('keypress', function(e) {
    if(e.keyCode == 13){
        clicked()
    }
})

button.onclick = function(e) {
    console.log('clicado')
    e.preventDefault()
    
    clicked()
}

function clicked() {
    let arrayValues = path[0].value.split(' ')
    
    if(window.sessionStorage.getItem('words') === null) {
        window.sessionStorage.setItem('words', JSON.stringify(objAux))
        console.log('sessionStorage Criada!')
        
        // list.innerHTML = ''
        loading()
        searchWord(arrayValues)
        endLoading()
    } else {
        let objParse = JSON.parse(window.sessionStorage.getItem('words'))
        let objKey = Object.keys(objParse)
        let arrayWordFound = []
        
        for(let j in arrayValues){
            for(let i in objKey) {
                if(objKey[i] === arrayValues[j]){
                    console.log(`palavra ${arrayValues[j]}`)
                    arrayWordFound.push(objKey[i])
                    break
                }
            }
        }
        
        if(arrayWordFound.length > 0) {
            console.log('achou besteirinha ein')
            let data

            list.innerHTML = ''
            for(let i in arrayWordFound){
                data = objParse[`${arrayWordFound[i]}`]
            }
            arrayValues.forEach((e) => { 
                listBuilder(data, e)
            })
        } else {
            list.innerHTML = ''
            searchWord(arrayValues)
        }
    }
}