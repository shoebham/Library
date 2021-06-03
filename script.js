let myLibrary = []

function Book(title,author,pages,read,id)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}
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
function populateStorage(book)
{
    // localStorage.setItem(`book:${book.id}`,book);
    let mytemplib = [];
    mytemplib = JSON.parse(localStorage.getItem("bookarray"))||[] ;
    mytemplib.push(book);
    console.log(mytemplib);
    localStorage.setItem("bookarray",JSON.stringify(mytemplib));
}
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
function showForm()
{
    document.querySelector(".bookForm").style ="visibility:visible";
}
function addBookToLibrary()
{
    let author = document.querySelector(".author").value;
    let title = document.querySelector(".title").value;
    let pages = document.querySelector(".pages").value;
    let read = document.querySelector(".read").checked;
    let id = Date.now();
    let newBook = new Book(title,author,pages,read,id);
    myLibrary.push(newBook);
    populateStorage(newBook);
    // console.log(newBook);
    // console.log(myLibrary);
    bookDisplay2(author,title,pages,read,id);
    console.log("mylibrary after adding",myLibrary);
}


//displays book by taking each object
function bookDisplay2(author,title,pages,read,id)
{
    let bookDisplay = document.querySelector(".bookDisplay");
    let card = document.createElement("div");
    let bookdetails = document.createElement("p");
    let remove_button = document.createElement("button")
    // let id = id;
    card.className = `card_${id}`;
    console.log("above on click ")
    remove_button.addEventListener("click",()=>
    {
        removeBook(id);
    })
    console.log("below onclick")
    remove_button.textContent="Remove"
    bookdetails.innerHTML = `Title:- ${title}<br> Author:- ${author}<br>Pages:- ${pages}<br>Read:- ${read?"Yes":"No"}`;
    // bookdetails.append(node);
    card.appendChild(bookdetails);
    card.append(remove_button);
    // console.log(e);
    bookDisplay.append(card)
    // bookDisplay.append(card);
    console.log(document);
}
//iterates over the array and passes each object to bookDisplay2
function bookDisplay(book)
{
    book.forEach(element => {
        bookDisplay2(element.author,element.title,element.pages,element.read,element.id);
    });
}
// function bookDisplay()
// {   
//     let bookDisplay = document.querySelector(".bookDisplay");
//     // let card =document.querySelector(".card");
//     // let bookname =card.querySelector(".bookname");

//     // console.log(bookname);
//     myLibrary.forEach((e)=>
//     {  
        
//         let card = document.createElement("div");
//         let bookdetails = document.createElement("p");
//         let remove_button = document.createElement("button")
//         let id = e.id;
//         card.className = `card_${e.id}`;
//         console.log("above on click ")
//         remove_button.addEventListener("click",()=>
//         {
//             removeBook(id);
//         })
//         console.log("below onclick")
//         remove_button.textContent="Remove"
//         bookdetails.innerHTML = `Title:- ${e.title}<br> Author:- ${e.author}<br>Pages:- ${e.pages}<br>Read:- ${e.read?"Yes":"No"}`;
//         // bookdetails.append(node);
//         card.appendChild(bookdetails);
//         card.append(remove_button);
//         // console.log(e);
//         bookDisplay.append(card)
//         // bookDisplay.append(card);
//         console.log(document);
//     })
//     // console.log(bookDisplay);

// }

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
}

function mySubmitFunction(e) {
    e.preventDefault();
    return false;
  }
function removeAllBooks(book)
{
    book.forEach(e=>
        {
            removeBook(e.id);
        })
}
function clearAll()
{
    let templib = JSON.parse(localStorage.getItem("bookarray"));
    removeAllBooks(templib);
    localStorage.clear();
}
//   bookDisplay();
lookForArray();