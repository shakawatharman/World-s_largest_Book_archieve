const cardContainer = document.getElementById('card-container');


document.getElementById('total').style.display = 'none';
document.getElementById('spinner').style.display='none';

const searchButton = document.getElementById("search-button").addEventListener("click", function() {
    const searchField = document.getElementById('search-field');
    const searchFieldText= searchField.value;
    

    
  
if(searchFieldText === ''){

    document.getElementById('search-results').innerHTML=`
        <h1 class="text-center text-danger">Please type a book name.</h1>
    `
    return;
}
else{
    
    const url = `https://openlibrary.org/search.json?q=${searchFieldText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data.docs));
        
        document.getElementById('spinner').style.display='block';
        searchField.value='';
        cardContainer.innerHTML = ''; 
        document.getElementById('total').style.display = 'none'; 
    }   
    
});

const displaySearchResult = (booklist) => {

    booklist.forEach(book => {

    document.getElementById("total-results-update").innerText = booklist.length;

    const div = document.createElement("div");
        div.classList.add("col-md-4");
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

        
        cardContainer.appendChild(div);
        document.getElementById('spinner').style.display='none';
        document.getElementById('total').style.display = 'block';
    })
};