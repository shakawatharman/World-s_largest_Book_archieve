





document.getElementById('total').style.display='none';

const searchButton = document.getElementById("search-button").addEventListener("click", function () {
    const searchField = document.getElementById('search-field');
    
  
    
    const url = `https://openlibrary.org/search.json?q=${searchField.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.docs));
      searchField.value ="";


  });

const displaySearchResult = (booklist) => {
  console.log(booklist);

//   for (const book of booklist)

  booklist.forEach(book=>{
    console.log(book);
    console.log(book.title);

    console.log(booklist.length);
    document.getElementById("total-results-update").innerText = booklist.length;

    
    const cardContainer = document.getElementById('card-container');

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Image of Book">
    <div class="card-body">
     <h4 class="fw-bold">Book: ${book.title} </h4>
     <h6> <span class="fw-bold">Author:-</span> ${book.author_name}</h6>
     <h6> <span class="fw-bold">First Publish:-</span> ${book.first_publish_year} </h6>
     <h6><span class="fw-bold">Publisher:-</span> ${book.publisher?.[0] + book.publisher?.[1]} </h6>
    </div>
  </div>
    `;
    cardContainer.appendChild(div);
    document.getElementById('total').style.display='block';
  })
};
