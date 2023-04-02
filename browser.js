// Source : https://www.w3docs.com/snippets/javascript/how-to-get-the-value-of-text-input-field-using-javascript.html
// maybe https://www.javascriptguides.com/how-to-get-innerhtml-of-an-iframe-in-javascript/

// Case sensitive
const protoList = [
    "http", "https"
]

let tabs = [
    [document.getElementById("form1"), document.getElementById("tab1"), document.getElementById("save1"), document.getElementById("notif1"), false]
] // form (url box), tab (iframe), save page button, notification paragraph, pageIsLoaded

function parseURL(url) {
    result = url.split("://")
    for (i = 0; i < protoList.length; i++) {
        const protos = protoList[i]
        if (result[0].toLowerCase() === protos) {
            return url
        } else if (result.length !== 2) {
            return "https://" + url
        }
    }
    return null
}

function createNewTab() {
}

function generateBlobURL(code, type) {
    const blob = new Blob([code], {type})
    return URL.createObjectURL(blob)
}

function parseBlobURL(blob, site) {
    const startURL = blob.split("null")[0]
    const endURL = blob.split("/")[1]
    return startURL + site + endURL
}

for (j = 0; j < tabs.length; j++) {
    content = tabs[j]

    content[0].addEventListener("submit", function(e) {
        e.preventDefault()
        parsed = parseURL(content[0][0].value)
        if (parsed) {
            content[4] = false
            content[1].src = parsed
        } else {
            content[3].innerHTML = "Protocol not in protoList!"
        }
    }, false)

    content[2].addEventListener("click", function(e) {
        //console.log(content[1].contentWindow.location.search)
        //console.log(content[1].contentWindow.self)//.document.body.innerHTML)
        if (content[4]) {
            //console.log(content[1].contentDocument.documentElement.innerHTML)
            console.log(content[1])
            alert("dumped in console")
        } else {
            content[3].innerHTML = "Please wait until the page loads!"
        }
    }, false)

    content[1].addEventListener("load", function(e) {
        //const blob = generateBlobURL("<script>alert('hi'); for (let i = 0; i < 10; i++) {alert('aaa')}</script>", "text/html") // text/javascript don't work for some reason
        //const blob = generateBlobURL("<p>aaaaaaaaaaaaaaaaaaaaaaa</p>", "text/html")
        //const url = parseBlobURL(blob, content[1].src)
        //console.log(url)
        content[1].srcdoc = "<script>console.log(window.contentDocument.baseURI)</script>"
        content[4] = true
    }, false)

    /*content[1].addEventListener("unload", function(e) {
        console.log("more progress?")
    }, false)*/
}

window.addEventListener("message", function(event) {
    this.alert(event.origin)
    //if (event.origin != )
}, false)

content[3].innerHTML = "debug : js ran lmao"