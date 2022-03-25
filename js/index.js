document.addEventListener("DOMContentLoaded", function() {
    getBooks()
});

const showBookInfo = (book) => {
    const info = document.getElementById("show-panel")
    const title = document.createElement("p")
    const author = document.createElement("p")
    const des = document.createElement("p")
    const thumb = document.createElement("img")
    const users = document.createElement("ul")
    const button = document.createElement("button")
    const sub = document.createElement("p")

    sub.innerText = book.subtitle
    button.innerText = "LIKE"
    title.innerText = book.title
    author.innerText = book.author
    des.innerText = book.description
    thumb.setAttribute("src", book.img_url)
    book.users.forEach(user => {
        const li = document.createElement("li")
        li.innerText = user.username
        users.appendChild(li)
    })
    clearInfo()
    info.append(thumb, title, sub, author, des, users, button)
    button.addEventListener("click", () => {
        if (button.innerText === "LIKE") {
            button.innerText = "UNLIKE" 
            likeBook(book, users)
        }
        else {
            button.innerText = "LIKE"
            unlikeBook(book, users)
        }
    })

}

const likeBook = (book, users) => {
    book.users.push({username: 'lucy'})

    fetch(`http://localhost:3000/books/${book.id}`, {
        headers: {"Content-Type" : "application/json"},
        method: 'PATCH',
        body: JSON.stringify(book)
    })
    const newUser = document.createElement("li")
    users.appendChild(newUser)
    newUser.innerText = "lucy"
}

const unlikeBook = (book, users) => {
    book.users.pop();
    fetch(`http://localhost:3000/books/${book.id}`, {
        headers: {"Content-Type" : "application/json"},
        method: 'PATCH',
        body: JSON.stringify(book)
    })
    users.removeChild(users.lastChild)
}

const getBooks = () => {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => 
        data.forEach(book => {
            const bookli = document.createElement("li")
            const list = document.getElementById("list")
            const title = book.title
            list.appendChild(bookli)
            bookli.innerText = title
            bookli.addEventListener("click", () => {
                showBookInfo(book)
            })
        })
    )}

const clearInfo = () => {
    const info = document.getElementById("show-panel")
    while (info.firstChild) {
        info.removeChild(info.firstChild)
    }
}
