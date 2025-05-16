const form = document.querySelector('form')
const bookSection = document.getElementById('book')
const librarySection = document.getElementById('library')
const bookList = document.createElement('ol');

form.onsubmit = async function(e) {
    e.preventDefault()
    const userSearch = form.search.value.trim()
    localStorage.setItem('userSearch', userSearch)
    this.search.value = ''
    try {
        const res = await fetch(`https://openlibrary.org/search.json?title=${userSearch}`)
        if (userSearch === '') throw new Error('Please search for a book.')
        const bookData = await res.json()
        if (bookData.docs.length === 0) throw new Error('Book not found.')
        renderBook(bookData)
    } catch (err) {
        bookSection.innerHTML = err.message
    }
}

const renderBook = ({
    docs: {
        0: {
        author_name,
        title
        } 
    }   
}) => {
    bookSection.innerHTML = `<p>Title: ${title}</p>
    <p>Author: ${author_name}</p>`
    bookSection.style.fontFamily = "Cactus Classical Serif, serif";
    renderButton(title, author_name);
}

const renderButton = function(title, author_name) {
    const addToLibrary = document.createElement('button');
    addToLibrary.textContent = 'add to library';
    addToLibrary.onclick = function() {
        const bookListItem = document.createElement('li');
        bookListItem.textContent = `${title}, by: ${author_name}`;
        bookList.appendChild(bookListItem)
        librarySection.appendChild(bookList)
    }
    librarySection.style.fontFamily = "Cactus Classical Serif, serif";
    addToLibrary.style.fontFamily = "Cactus Classical Serif, serif";
    bookSection.appendChild(addToLibrary)
}