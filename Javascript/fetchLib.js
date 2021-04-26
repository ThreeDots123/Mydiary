function Requests() {}

Requests.prototype = {
    Get : function(URL){
        return new Promise((resolve, reject) => {
            fetch(URL)
            .then(data => data.json())
            .then(data => { resolve(data) })
            .catch(err => { reject(err) })
        })
    },
    Post : function (URL, data){
        return new Promise(function(resolve, reject){
            fetch(URL, {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(data)
            })
            .then(data => data.json())
            .then(data => { resolve(data) })
            .catch(err => { reject(err) })
        })
    },
    Delete : function(URL){
        return new Promise((resolve, reject) => {
            fetch(URL, {
                method : "DELETE"
            })
            .then(data => data.json())
            .then(data => { resolve(data) })
            .catch(err => { reject(err) })
        })
    },
    Update : function(URL, data){
        return new Promise((resolve, reject) => {
            fetch(URL, {
                method : "UPDATE",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(data)
            })
            .then(data => data.json())
            .then(data => { resolve(data) })
            .catch(err => { reject(err) })
        })
    }
}