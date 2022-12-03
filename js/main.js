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
        // const that = this
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
            .then((res) => res.json())
            .then((res) => {

                this.table = res
            })
            .then(() => {
                this.updateDOM()
            })
            .catch((err) => {
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
        country.innerText = arrElem.country
        tr.appendChild(country)
        const university = document.createElement('td')
        university.innerText = arrElem.university
        tr.appendChild(university)
        const field = document.createElement('td')
        field.innerText = arrElem.NAME
        tr.appendChild(field)
        const bsc = document.createElement('td')
        bsc.innerText = arrElem.ECTS_BSC
        tr.appendChild(bsc)
        const msc = document.createElement('td')
        msc.innerText = arrElem.ECTS_MSC
        tr.appendChild(msc)
        const comm = document.createElement('td')
        comm.innerText = arrElem.COMMENT
        tr.appendChild(comm)
        const ivComm = document.createElement('td')
        ivComm.innerText = arrElem.IV_COMMENT
        tr.appendChild(ivComm)
        const changedBy = document.createElement('td')
        changedBy.innerText = arrElem.CHANGED_BY
        tr.appendChild(changedBy)
        const lastChange = document.createElement('td')
        const date = new Date(arrElem.LAST_CHANGED * 1000)
        lastChange.innerText = date.toLocaleDateString()
        tr.appendChild(lastChange)
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