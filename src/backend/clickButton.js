import { path, listBuilder } from "./htmlConstructor.js"
import { searchWord, endLoading } from './search.js'

const button = document.getElementById('button')
let objAux = {}
    
button.onclick = function(e) {
    e.preventDefault()

    if(window.sessionStorage.getItem('words') === null) {
        window.sessionStorage.setItem('words', JSON.stringify(objAux))
        console.log('sessionStorage Criada!')

        searchWord()
    } else {
        let objParse = JSON.parse(window.sessionStorage.getItem('words'))
        let objKey = Object.keys(objParse)
        let foundWord = ''

        for(let i in objKey) {
            if(objKey[i] === path[0].value){
                console.log('encontrado!')
                foundWord = objKey[i]
                break
            }
        }

        if(foundWord !== '') {
            let data = objParse[`${foundWord}`]
            console.log(data)
            endLoading()
            listBuilder(data)
        } else {
            searchWord()
        }
    }

}