let myLibrary = []


//constructor
function Book(title,author,pages,read,id)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

//looks for previous data of array in localstorage if not present its empty
function lookForArray()
{
    try {
        // myLibrary.push(localStorage.getItem("bookarray"));    
        myLibrary = JSON.parse(localStorage.getItem("bookarray"))||[];
        console.log(myLibrary);
        bookDisplay(myLibrary);
    } catch (error) {
        console.log(error);
    }
    
}

//populates the localstorage
function populateStorage(book)
{
    // localStorage.setItem(`book:${book.id}`,book);
    let mytemplib = [];
    mytemplib = JSON.parse(localStorage.getItem("bookarray"))||[] ;
    mytemplib.push(book);
    console.log(mytemplib);
    localStorage.setItem("bookarray",JSON.stringify(mytemplib));
}

//removes a specific book from the array 
function removeFromStorage(id)
{
    let mytemplib = JSON.parse(localStorage.getItem("bookarray"));

    mytemplib.forEach((e)=>
    {
        if(e.id==id)
        {
            const index = mytemplib.indexOf(e);
            mytemplib.splice(index,1);
        }
    })
        console.log("templib",mytemplib);
    localStorage.setItem("bookarray",JSON.stringify(mytemplib));
}

//makes the add book element visible
function showForm()
{
    document.querySelector(".bookForm").style ="visibility:visible";
}
function hideForm()
{
    document.querySelector(".bookForm").style ="visibility:hidden";
}
//adds the book to the array and passes it to bookDisplay2();
function addBookToLibrary()
{
    let author = document.querySelector(".author").value;
    let title = document.querySelector(".title").value;
    let pages = document.querySelector(".pages").value;
    let read = document.querySelector(".read").checked;
    let id = Date.now();
    if(!(author&&title&&pages))
    {
        alert("Enter all values");
    }
    else
    {

        console.log(author,title,document.querySelector(".pages"),read)
        let newBook = new Book(title,author,pages,read,id);
        myLibrary.push(newBook);
        populateStorage(newBook);
        // console.log(newBook);
        // console.log(myLibrary);
        bookDisplay2(author,title,pages,read,id);
        console.log("mylibrary after adding",myLibrary);
    }
}


//displays book by taking each object
function bookDisplay2(author,title,pages,read,id)
{
    let bookDisplay = document.querySelector(".bookDisplay");
    let card = document.createElement("div");
    let bookdetails = document.createElement("p");
    let remove_button = document.createElement("button")
    remove_button.className ="remove_butt";
    // let id = id;
    card.id = `card`;
    card.className = `card_${id}`;
    console.log("above on click ")
    remove_button.addEventListener("click",()=>
    {
        removeBook(id);
    })
    console.log("below onclick")
    remove_button.textContent="Remove"
    bookdetails.innerHTML = `<i class="bi-bookmark-check-fill" id=bookmark_${id} onclick=readBook(${id})></i>
    <div class="card-content">
    <span class="title_card">
    ${title}</span><br> 
    <span class="author_card">${author}</span><br>
    <span class="pages_card">Pages:- ${pages}</span><br>
    
    </div>`;
    console.log(bookdetails)
    // bookdetails.append(node);
    // <span class="readornot" id="readornot_${id}">Read:- ${read?"Yes":"No"} </span>
    card.appendChild(bookdetails);
    card.append(remove_button);
    // console.log(e);
    bookDisplay.append(card)
    addToSidebar(title,read,id);
    console.log(document);
    if(read){readBook(id);}
}

function readBook(id)
{
    let bookmark = document.querySelector(`#bookmark_${id}`);
    console.log(bookmark);
    bookmark.classList.toggle("bookmark-read");
    // console.log();    
    // let readornot = document.querySelector(`#readornot_${id}`);
    // readornot.textContent = `Read:- ${bookmark.classList.contains("bookmark-read")?"Yes":"No"}`;
    // console.log(readornot);
    read_bool = bookmark.classList.contains("bookmark-read");
    changeSidebar(read_bool,id);



    myLibrary.forEach(e=>
        {
            if(e.id==id)
            {
                e.read=read_bool;
            }
        })
}
function addToSidebar(title,read,id)
{
    let ul;
    if(read){ ul = document.querySelector(".books_read");}
    else{ul = document.querySelector(".books_notread");}
    let li = document.createElement("li");
        li.id = `book_${id}`;   
    li.textContent = title;
    ul.append(li);
}
function changeSidebar(read_bool,id)
{
    let ul =document.querySelector(".books_read");
    let ul2 = document.querySelector(".books_notread");
    if(!read_bool)
    {
        let li = document.querySelector(`#book_${id}`)
        li.remove();
        ul2.append(li);
    }
    else
    {
        let li = document.querySelector(`#book_${id}`)
        li.remove();
        ul.append(li);
    }
}
function removeFromSidebar(id)
{
    document.querySelector(`#book_${id}`).remove();
}
//iterates over the array and passes each object to bookDisplay2
function bookDisplay(book)
{
    book.forEach(element => {
        bookDisplay2(element.author,element.title,element.pages,element.read,element.id);
    });
}

//removes book 
function removeBook(id)
{
    console.log("inside removebook");
    console.log(id);
    mylibrary = myLibrary.map((e)=>
    {
        return e.id!=id;
    });
    let card =document.querySelector(`.card_${id}`);
    // console.log("line 70", myLibrary);
    card.remove();
    console.log("mylibrary after removing",myLibrary);
    removeFromStorage(id);
    removeFromSidebar(id);
}

//prevents submit button from refreshing the page
function mySubmitFunction(e) {
    e.preventDefault();
    return false;
  }

//removes all the books from the display
function removeAllBooks(book)
{
    book.forEach(e=>
        {
            removeBook(e.id);
        })
}

//removes all the books from localstorage
function clearAll()
{
    let templib = JSON.parse(localStorage.getItem("bookarray"));
    removeAllBooks(templib);
    localStorage.clear();
}
//   bookDisplay();
lookForArray();