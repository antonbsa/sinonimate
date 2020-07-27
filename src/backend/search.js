const button = document.getElementById('button')
const path = document.getElementsByName('q')
const content = document.getElementById('content')
const section = document.getElementById('content')
const list = document.getElementById('list')
let objAux = {}
    
button.onclick = function(e) {
    e.preventDefault()

    if(window.sessionStorage.getItem('words') === null) {
        window.sessionStorage.setItem('words', JSON.stringify(objAux))
    } else {
        let objParse = JSON.parse(window.sessionStorage.getItem('words'))
        let objKey = Object.keys(objParse)

        for(i in objKey) {
            if(objKey[i] === path[0].value){
                console.log('encontrado!')
            }
        }
    }

    const myHeader = new Headers()
    myHeader.append("Access-Control-Allow-Origin", "*")

    console.log(path[0].value)

    function capitalize(elem) {
        return elem.charAt(0).toUpperCase() + elem.slice(1)
    }

    // LOADING
    list.style.opacity = 0.4
    document.getElementById('loading').style.display = 'block'
    

    fetch(`http://localhost:3000/${path[0].value}`, { headers: myHeader, mode: "cors"})
    .then(resp => resp.clone().json())
    .then(function(data){
        // FIM LOADING
        document.getElementById('loading').style.display = 'none'
        list.innerHTML = ''
        list.style.opacity = 1
        
        const key = Object.keys(data)
        const entries = Object.entries(data)

        node = document.createElement('h1')
        textNode = document.createTextNode(`Mostrando sinônimos de ${path[0].value.toUpperCase()}:`)
        node.appendChild(textNode)
        list.appendChild(node)

        let objParse = JSON.parse(window.sessionStorage.getItem('words'))
        let objWords = {}

        for(i = 0; i < entries.length; i++){
            let capWord = capitalize(key[i])
            let arrayAux = []

            let node = document.createElement('ul')
            let textNode = document.createTextNode(capWord)
            node.appendChild(textNode)
            list.appendChild(node)

            for(j = 0; j < entries[i][1].length; j++){
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
    })
}