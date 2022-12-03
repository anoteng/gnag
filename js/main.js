class Api {
    constructor() {
        this.apiURL = "api.php"
        this.county = ""
        this.university = ""
        this.firstRow = null
        this.table = []
        this.get()
    }
    get(){
        const that = this
        let string = this.apiURL
        if(this.county.length > 0){
            string = string + '?country="' + this.county + '"'
            if(this.university.length > 0){
                string = string + '&university="' + this.university + '"'
            }
        }
        if(this.university.length > 0){
            string = string + '?university="' + this.university + '"'
        }
        fetch(string)
            .then(res => {
                that.table = res
            })
            .catch(err => {
                console.log(err)
            })

    }
    updateDOM(){
        for(let row of this.table){
            let tableRow = this.tableRow(row)
            this.firstRow.parentNode.insertBefore(tableRow, this.firstRow.nextSibling)
        }
    }
    tableRow (arrElem){
        const tr = document.createElement('tr')
        const country = document.createElement('td')
        country.innerText = arrElem.county
        tr.appendChild(country)
        const university = document.createElement('td')
        const field = document.createElement('td')
        const bsc = document.createElement('td')
        const msc = document.createElement('td')
        const comm = document.createElement('td')
        const ivComm = document.createElement('td')
        const changedBy = document.createElement('td')
        const lastChange = document.createElement('td')
        return tr
    }
}
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
const api = new Api
docReady(function() {
    api.firstRow = document.getElementById('firstRow')
    api.get()
});