let inputbox= document.getElementById("attendance");
let btnbox= document.getElementById("addStudent");
let container= document.getElementById("studentContainer");
//studeent ak arry ha 
//student ak html div ha
let students = JSON.parse(localStorage.getItem("students")) || [];
function showStudent(name,index){
    let student = document.createElement("div"); // name div creat
    // student.textContent = inputbox.value;
    
    let nameSpan=document.createElement("span"); //single name store inspan
    nameSpan.textContent= name;

    let deletbtn = document.createElement("button");//btn create
    deletbtn.textContent="Delete"; //name of btn
    deletbtn.classList.add("deleteBtn");//css class k liye


    deletbtn.addEventListener("click",function(){ //code runafter click
        students.splice(index,1); //  delet index 1

        localStorage.setItem("students",JSON.stringify(students)); //arry into string then save in brwser
        container.innerHTML="";
        students.forEach(function(name,index){ //data in function
            showStudent(name,index);// all student show
});
        
    });

    let editbtn = document.createElement("button"); //edit btn banana
    editbtn.textContent="Edit"; //btn ka name
    editbtn.classList.add("editBtn"); // css style

    editbtn.addEventListener("click", function(){  //run after click
        let updateName=prompt("Enter new name"); // neme name from user
        if(updateName){ // ckack karna ka empty ho ni di value
            students[index]=updateName; //change from index
            localStorage.setItem("students",JSON.stringify(students));//arry ko string m 
        }
        nameSpan.textContent= updateName; // new name on screen
    });
    

    container.appendChild(student);  // students ko show karo
     

    student.appendChild(nameSpan);  // span chaild of dive ko dive ka andar rakhna
    student.appendChild(deletbtn);  //deletebtn ko div ka andar add karo
    student.appendChild(editbtn); //editbtn ko dive ka andar add karo

}

btnbox.addEventListener("click",function(){ // add student click karo or code run ho jay ga
    if(inputbox.value===""){ //agar user empty ya null input da to error show kar0
        alert("Erroe!plz add student");
        return; //bad wala code ni chaly ga
    }
    students.push(inputbox.value);  // arry ka end ma new add karo
    localStorage.setItem("students", JSON.stringify(students)); // arry ko string ma change karo
    showStudent(inputbox.value,students.length-1); //add student ko show karo
    inputbox.value=""; //inputbox ko kahali karo

});
students.forEach(function(name,index){ // har student pa function km kryna cahiye
    showStudent(name,index); // sab student ko chow kro

});