const userName = document.getElementById("userName");
const userEmail = document.getElementById("userMail");
const userPhone = document.getElementById("userPhone");
const userDOB = document.getElementById("userDOB");
const userGender = document.getElementById("userGender");
const userForm = document.getElementById("userForm");

let users = [];

// Read Operation

async function readData() {
  // let usersData = localStorage.getItem("userDetails");
  // let data = JSON.parse(usersData) || [];
  const res = await fetch("http://localhost:3000/users", { method: "GET" });
  const data = await res.json();
  console.log("UsersData from API", data);
  users = data;
  let output = ``;

  let newArray = data.map((item, index) => {
    output += `<tr class="text-center">
            <td  class="border-black">${item.name}</td>
            <td class="border-black">${item.email}</td>
            <td class="border-black">${item.phone}</td>
            <td class="border-black">${item.dob}</td>
            <td class="border-black">${item.gender}</td>
            <td class="border-black">
              <button class="btn btn-success">edit</button>
            </td>
            <td class="border-black">
              <button class="btn btn-danger" onclick="deleteData('${item.id}')">Delete</button>

            </td>
          </tr>`;
  });
  document.getElementById("tableBody").innerHTML = output;
}

// To Control form Reload

async function addData(e) {
  e.preventDefault();

  // Add Operation

  let newUser = {
    // id: Math.floor(Math.random() * 1000000000 + 5656),
    name: userName.value,
    email: userEmail.value,
    phone: userPhone.value,
    dob: userDOB.value,
    gender: userGender.value,
  };

  users = [...users, newUser];
  // localStorage.setItem("userDetails", JSON.stringify(users));
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(newUser),
  });
  const data = await res.json();
  console.log("Added Data", data);
  console.log(users);
  userName.value = "";
  userEmail.value = "";
  userPhone.value = "";
  userDOB.value = "";
  userGender.value = "";
  readData();
}
userForm.addEventListener(`submit`, addData);

readData();

// Delete Data

async function deleteData(id) {
  users = users.filter((item) => item.id !== id);
  // localStorage.setItem("userDetails", JSON.stringify(users));
  const res = await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log("Deleted User Detail", data);
  readData();
}
