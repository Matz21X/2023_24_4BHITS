fetch('http://localhost:3000/exoplanets/')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log('ERROR'))