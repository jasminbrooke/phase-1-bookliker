
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...dog,
                name: name.value,
                breed: breed.value,
                sex: sex.value
            }),
            headers: {'Content-type': "application/json"}
        })
        .then(() => clearDogs())
        .then(() => getDogs())
    })    
}