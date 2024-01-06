//Query Selectors
let form = document.querySelector('form');

let inputTitle = document.querySelector('#title');
let inputNote = document.querySelector('#note');

let noteContainer = document.querySelector('.note-container')
console.log(form);

let template=`
    <div class="note">
        <h2 class="note-title">{title}</h2>
        <p class="note-body">{body}</p>
    </div>
`
console.log(form);

let notes=[];
//Class for new note
class Note{
    constructor(title,body){  //the title and body as function parameter
        this.title=title;   
        this.body=body;
        this.id=Math.random();
    }
}


///            UI Updates             ///

//Create Note in UI

///             Events                ///

let removeNote = (e) => {
    e.target.parentNode.removeChild(e.target);
}

let refreshUI=()=>{
    //let notesHTML='';
    for(let i=0;i<notes.length;i++){
        let updateTemplate=getTemplateObject(notes[i].title,notes[i].body);
        //notesHTML=updateTemplate+notesHTML;
        noteContainer.appendChild(updateTemplate);
        console.log(updateTemplate);
    }
    //console.log(notesHTML);
    //noteContainer.innerHTML=notesHTML;
}

let getTemplateObject= (title,body)=> {
    const newUINote = document.createElement('div')
    newUINote.classList.add('note');
    newUINote.innerHTML = `
    <h2 class = "note-title"> ${title} </h2>
    <p class = "note-body"> ${body} <p>
   `
    newUINote.addEventListener('click', removeNote)

    //noteContainer.appendChild(newUINote);
    return newUINote;



}



let submitForm = (e) => {
    e.preventDefault();
    let title = inputTitle.value;
    let note = inputNote.value;

    let newNoteObj =  new Note(title,note);      //every time we create an object mandatory to give suffix object as obj

    notes.push(newNoteObj);
    localStorage.setItem('notesApp.notes',JSON.stringify(notes));
    refreshUI();

//     //we added a html template here
//    const newUINote = document.createElement('div')
//    newUINote.classList.add('note');
//    newUINote.innerHTML = `
//     <h2 class = "note-title"> ${title} </h2>
//     <p class = "note-body"> ${note} <p>
//    `
//     newUINote.addEventListener('click', removeNote)

//     noteContainer.appendChild(newUINote);

// 
}

form.addEventListener('submit', submitForm);

let displayNotes =(e)=>{
    notes=localStorage.getItem('notesApp.notes');
    if (notes == null){
        notes=[];
    }
    
}

document.addEventListener('DOMContentLoaded',displayNotes);