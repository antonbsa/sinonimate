import { path, list, listBuilder } from "./htmlConstructor.js"

export function loading() {
    list.style.opacity = 0.4
    document.getElementById('loading').style.display = 'block'
}

export function endLoading() {
    document.getElementById('loading').style.display = 'none'
    // list.innerHTML = ''
    list.style.opacity = 1
}

export function searchWord(array) {
    const myHeader = new Headers()
    myHeader.append("Access-Control-Allow-Origin", "*")

    console.log(`array: ${array}`)

    loading()

    array.forEach((e) => { 
        console.log(`e: ${e}`)
        
        fetch(`http://localhost:3000/${e}`, { headers: myHeader, mode: "cors"})
        .then(resp => {
            list.innerHTML = ''
            resp.clone().json() 
            
            .then(function(data){
                console.log(data)
                listBuilder(data, e)
            }).then(() => { endLoading() })
        })
    })
}