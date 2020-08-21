import { path, listBuilder, list} from "./htmlConstructor.js"
import { searchWord, endLoading, loading} from './search.js'

const button = document.getElementById('button')
let objAux = {}

button.onclick = function(e) {
    e.preventDefault()
    let arrayValues = path[0].value.split(' ')
    
    if(window.sessionStorage.getItem('words') === null) {
        window.sessionStorage.setItem('words', JSON.stringify(objAux))
        console.log('sessionStorage Criada!')
        
        // list.innerHTML = ''
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