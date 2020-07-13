// fetch('http://localhost:3000/weather?address=Boston').then( (response) => {
//     response.json().then( (data) => {
//         console.log(data);
//     })
// })

let myform = document.getElementById("form1");
let message = document.getElementById("message");

myform.addEventListener('submit', (e) => {
    e.preventDefault();

    message.innerText = "Loading..";
    let location = document.getElementById("address").value;
    let url = `http://localhost:3000/weather?address=${location}`;

    fetch(url).then( (res) => {
        res.json().then( (data) => {
            console.log(data);
            if ('error' in data) {
                message.innerText = data.error;
                return -1; 
            }
            message.innerText = `${data.location} - ${data.forecast}Celsius`;
        })
    })

})