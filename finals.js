const students = document.querySelector('#studentTable')
const submit = document.querySelector('#submit')

window.addEventListener('load', ()=>{
    getstudents();
})
function getstudents(){
    let html = '';
    fetch('http://localhost:3000/students', {mode: "cors"})
    .then(response  =>{
        console.log(response);
        return response.json();
    })
    .then(data =>{
        console.log(data);
        data.forEach(student => {
            html += `
            <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.grade}</td>
            <td><a href = "javascript:void(0)" onclick = "deleteStudent(${student.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
  <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
</svg></a>
            <a href = "javascript:void(0)" onclick = "updatestudent(${student.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
</svg></a></td>
            </tr>`;
        });
        students.innerHTML = html;
        
    })
    .catch(error =>{
        console.log(error);
    })
}

//DELETE FETCH
function deleteStudent(id) {
    const userConfirmed = confirm("Are you sure you want to delete this member?");
    
    if (userConfirmed) {
        let formData = { id };
        fetch('http://localhost:3000/students', {
            method: 'DELETE',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.text())
        .then(response => {
            console.log(response);
            alert('Member deleted successfully!');
            location.reload(); // Reload the current page
        })
        .catch(error => {
            console.error(error);
            alert('An error occurred. Please try again.');
        });
    } else {
        console.log("Deletion canceled by the user.");
    }
}

//PUT FETCH (UPDATE)
function updatestudent(id) {
    fetch(`http://localhost:3000/students/${id}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#name').value = data[0].name;
            document.querySelector('#email').value = data[0].email;
            document.querySelector('#grade').value = data[0].grade;
            document.querySelector('#id').value = data[0].id;
        })
        .catch(error => console.log('Error fetching member data:', error));
}

submit.addEventListener('click', () => {
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let grade = document.querySelector('#grade').value;
    let id = document.querySelector('#id').value;

    // Form data
    let formData = { name, email, grade, id };

    // Sending the update request
    fetch('http://localhost:3000/students', {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                // Alert the user on success
                alert('Member updated successfully!');
                // Reload the page
                location.reload();
            } else {
                throw new Error('Failed to update member');
            }
        })
        .catch(error => {
            console.log('Error updating member:', error);
            alert('An error occurred while updating the member.');
        });
});

// fetch("http://localhost:3000/students", { mode: "cors" })
//   .then((response) => response.json())
//   .then((data) => {
//     const tableBody = document.querySelector("#studentTable");
//     if (!tableBody) {
//       console.error('Element with ID "studentTable" (tbody) not found.');
//       return;
//     }

//     tableBody.innerHTML = "";
//     data.forEach((student) => {
//       const row = document.createElement("tr");
//       const idCell = document.createElement("td");
//       idCell.textContent = student.id;
//       row.appendChild(idCell);
//       const nameCell = document.createElement("td");
//       nameCell.textContent = student.name;
//      row.appendChild(nameCell);
//       const emailCell = document.createElement("td");
//       emailCell.textContent = student.email;
//       row.appendChild(emailCell);
//       const gradeCell = document.createElement("td");
//       gradeCell.textContent = student.grade;
//       row.appendChild(gradeCell);
//       tableBody.appendChild(row);

//     });
//   })
//   .catch((error) => console.error("Error fetching students:", error));


const addBtn = document.querySelector("#submitBtn");


addBtn.addEventListener("click", () => {
  let name = document.getElementById("name").value;


  let email = document.getElementById("email").value;


  let grade = document.getElementById("grade").value;


  let newStudent = { name, email, grade };


  fetch("http://localhost:3000/students/", {
    method: "POST",


    headers: {
      "Content-Type": "application/json",
    },


    body: JSON.stringify(newStudent),
  })
    .then((response) => {
      if (response.ok) {
        alert("Student added successfully!");

        location.reload();
      } else {
        throw new Error("Error creating student");
      }
    })


    .catch((error) => console.error("Error creating student:", error));
});


