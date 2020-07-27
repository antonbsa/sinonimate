export const path = document.getElementsByName('q')
export const list = document.getElementById('list')

export function capitalize(elem) {
    return elem.charAt(0).toUpperCase() + elem.slice(1)
}

export function listBuilder(data) {
    const key = Object.keys(data)
    const entries = Object.entries(data)

    let node = document.createElement('h1')
    let textNode = document.createTextNode(`Mostrando sinônimos de ${path[0].value.toUpperCase()}:`)
    node.appendChild(textNode)
    list.appendChild(node)

    let objParse = JSON.parse(window.sessionStorage.getItem('words'))
    let objWords = {}

    for(let i = 0; i < entries.length; i++){
        let capWord = capitalize(key[i])
        let arrayAux = []

        node = document.createElement('ul')
        textNode = document.createTextNode(capWord)
        node.appendChild(textNode)
        list.appendChild(node)

        for(let j = 0; j < entries[i][1].length; j++){
            let node = document.createElement('li')
            
            /* set tag attributes
            node.setAttribute(name, value) */
            let textNode = document.createTextNode(entries[i][1][j])
            node.appendChild(textNode)
            list.appendChild(node)

            // saving in arrayAux
            arrayAux.push(entries[i][1][j])
        }
        objWords[key[i]] = arrayAux
    }
    // saving in sessionStorage
    objParse[`${path[0].value}`] = objWords
    window.sessionStorage.setItem('words', JSON.stringify(objParse))
}