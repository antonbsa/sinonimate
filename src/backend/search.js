import { path, list, listBuilder } from "./htmlConstructor.js"

export function loading() {
    list.style.opacity = 0.4
    document.getElementById('loading').style.display = 'block'
}

export function endLoading() {
    document.getElementById('loading').style.display = 'none'
    list.innerHTML = ''
    list.style.opacity = 1
}

export function searchWord() {
    const myHeader = new Headers()
    myHeader.append("Access-Control-Allow-Origin", "*")

    console.log(path[0].value)

    loading()

    fetch(`http://localhost:3000/${path[0].value}`, { headers: myHeader, mode: "cors"})
    .then(resp => resp.clone().json())
    .then(function(data){
        endLoading()        
        listBuilder(data)
    })
}