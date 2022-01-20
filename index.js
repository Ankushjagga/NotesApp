showNotes();
//all queryselectors
let button= document.querySelector('.btn');
let title= document.querySelector('.addtxt');
let description= document.querySelector('.description');
let start=document.querySelector('.add');

//notes object
function Note( title, content){
  this.title = title;
  this.content = content;
}


button.addEventListener('click',function () {

 //if title and decription is added or not
    if(title.value=="" && description.value==""){
       return alert("please enter title and value of your notes");
           }
          else if(title.value==""){
            return alert("please enter title of your note");
         }
         else if(description.value==""){
             return alert("please enter description of your note")
         }

//add note to localstorage
    let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let noteItem = new Note( title.value, description.value);

  notesObj.push(noteItem);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  title.value="";
  description.value="";
  // console.log(notesObj);
})

//function to show notes
function showNotes(){
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
    <div class="note-make">
    <h4>${index + 1}. ${element.title}</h4>
    <p id="p">${element.content}</p>
    <div class="buttons">

        <button class="note-btn" id="${index}" onclick="deleteNote(this.id)">Delete
            <i class="far fa-trash-alt"></i>
        </button>
    </div>
</div>`;
  });
  let notesElm = document.getElementById("notess");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Add your Notes 😉.`;
  }

}


// Function to delete a note
function deleteNote(index) {
    console.log("I am deleting", index);
  
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }

  
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('note-make');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("h4")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
