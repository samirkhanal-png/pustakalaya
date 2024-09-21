const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("active");
});

async function fetchAllBooks() {
  try {
    let response = await fetch(`https://freetestapi.com/api/v1/books?limit=10`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

const booksContainer = document.querySelector(".books-container");
fetchAllBooks().then((data) => {
  for (let book of data) {
    booksContainer.innerHTML += `
        <div class="book-card">
          <img src="${book.cover_image}" alt="Book Cover" class="book-cover">
          <h3>${book.title}</h3>
          <p>${book.description}</p>
          <p>${book.author} | ${book.publication_year}</p>
        </div>
      `;
  }
});

//Fetch Book By Author
async function fetchBookByAuthor(searchValue) {
  try {
    let response =
      await fetch(`https://openlibrary.org/search.json?author=${searchValue}&limit=5
 
`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Fetch Book By Title
async function fetchBookByTitle(searchValue) {
  try {
    let response = await fetch(
      `https://openlibrary.org/search.json?title=${searchValue}&limit=5`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

const search = document.querySelector("#search-bar");
const availableBooks = document.querySelector("#available-books");
const searchBy = document.querySelector("#searchBy");
let searchByAuthor = false;
let searchByTitle = false;

// Search By author name
const authorName = document.querySelector(" #ByAuthor");
searchBy.addEventListener("click", (select) => {
  console.log(select.target.innerText);
  if (select.target.innerText == `Author Name`) {
    searchByAuthor = true;
    searchByTitle = false;
  } else if (select.target.innerText == `Title`) {
    searchByAuthor = false;
    searchByTitle = true;
  }

  console.log(searchByAuthor);
  console.log(searchByTitle);

  if (searchByAuthor) {
    search.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        const searchValue = search.value;
        console.log(searchValue);

        availableBooks.innerHTML = "";
        fetchBookByAuthor(searchValue).then((data) => {
          console.log(data);
          for (let book of data.docs) {
            console.log(book);
            availableBooks.innerHTML += `
           <div class="book-card">
          <h3>${book.title}</h3>
          <p>Genre:${book.subject[0]}</p>
          <p>${book.author_name[0]} | ${book.first_publish_year}</p>
        </div>`;
          }
        });
      }
    });
  }

  if (searchByTitle) {
    search.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        const searchValue = search.value;
        console.log(searchValue);

        availableBooks.innerHTML = "";
        fetchBookByTitle(searchValue).then((data) => {
          console.log(data);
          for (let book of data.docs) {
            console.log(book);
            availableBooks.innerHTML += `
               <div class="book-card">
              <h3>${book.title}</h3>
              <p>Genre:${book.subject[0]}</p>
              <p>${book.author_name[0]} | ${book.first_publish_year}</p>
            </div>`;
          }
        });
      }
    });
  }
});
