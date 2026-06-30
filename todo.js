let inputbox = document.getElementById("attendance");
let btnbox = document.getElementById("addStudent");
let container = document.getElementById("studentContainer");
// Local Storage se data load karo
let students = JSON.parse(localStorage.getItem("students")) || [];
// Student show karne ka function
function showStudent(name, index) {
    let student = document.createElement("div");
    let nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", function () {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        container.innerHTML = "";
        students.forEach(function (name, index) {
            showStudent(name, index);
        });
    });
    // Edit Button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", function () {
        // Agar Edit mode me hain
        if (editBtn.textContent === "Edit") {
            let editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = nameSpan.textContent;
            student.replaceChild(editInput, nameSpan);
            editBtn.textContent = "Save";
            // Input ko button ke sath save kar diya
            editBtn.editInput = editInput;
        }
        // Agar Save mode me hain
        else {
            let updatedName = editBtn.editInput.value.trim();
            if (updatedName === "") {
                alert("Name cannot be empty!");
                return;
            }
            students[index] = updatedName;
            localStorage.setItem("students", JSON.stringify(students));
            nameSpan.textContent = updatedName;
            student.replaceChild(nameSpan, editBtn.editInput);
            editBtn.textContent = "Edit";
        }
    });
    // Student div me sab add karo
    student.appendChild(nameSpan);
    student.appendChild(deleteBtn);
    student.appendChild(editBtn)
    container.appendChild(student);
}
// Add Student
btnbox.addEventListener("click", function () {
    if (inputbox.value.trim() === "") {
        alert("Please enter student name.");
        return;
    }
    students.push(inputbox.value.trim());
    localStorage.setItem("students", JSON.stringify(students));
    showStudent(inputbox.value.trim(), students.length - 1);
    inputbox.value = "";
});
// Refresh ke baad sab students dikhao
students.forEach(function (name, index) {
    showStudent(name, index);
});