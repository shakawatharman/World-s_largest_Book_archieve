const cardContainer = document.getElementById('card-container');
const searchButton = document.getElementById("search-button");


document.getElementById('total').style.display = 'none';
document.getElementById('spinner').style.display='none';

searchButton.addEventListener("click", function(e) {
    e.preventDefault();
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;

    if(searchFieldText === ''){

        document.getElementById('search-results').innerHTML=`
        <h1 class="text-center text-danger">Please type a book name.</h1>
        `;
        document.getElementById('total').style.display = 'none';
        return;

    }else{

        document.getElementById('search-results').innerHTML = "";

        document.getElementById('total').style.display = 'none';

        const url = `https://openlibrary.org/search.json?q=${searchFieldText}`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data.docs))
        .catch(e => console.log(e))
        
        document.getElementById('spinner').style.display='block';
        searchField.value='';

    }   
    
});

const displaySearchResult = (booklist) => {

    if ( booklist.length === 0 ) {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('search-results').innerHTML= "<h1 class='text-center text-danger'>NO DATA FOUND</h1>";
    }

    booklist.forEach((book) => {


        document.getElementById("total-results-update").innerText = booklist.length;

        const div = document.createElement("div");
        div.classList.add("col-md-4","mb-2");
        div.innerHTML = `
        <div class="card">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Image of Book">
        <div class="card-body">
        <h4 class="fw-bold">Book: ${book.title} </h4>
        <h6> <span class="fw-bold">Author:-</span> ${book.author_name}</h6>
        <h6> <span class="fw-bold">First Publish:-</span> ${book.first_publish_year} </h6>
        <h6><span class="fw-bold">Publisher:-</span> ${book.publisher?.[0] + book.publisher?.[1]} </h6>
        </div>
        </div>
        `;

        
        document.getElementById('search-results').appendChild(div);
        document.getElementById('spinner').style.display='none';
        document.getElementById('total').style.display = 'block';
    })
};