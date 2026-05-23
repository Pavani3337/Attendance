// ======================
// DATA
// ======================

let students =
JSON.parse(
localStorage.getItem("students")
) || [];

let subjects =
JSON.parse(
localStorage.getItem("subjects")
) || [];

let attendance =
JSON.parse(
localStorage.getItem("attendance")
) || [];

// ======================
// SAVE DATA
// ======================

function saveData(){

localStorage.setItem(
"students",
JSON.stringify(students)
);

localStorage.setItem(
"subjects",
JSON.stringify(subjects)
);

localStorage.setItem(
"attendance",
JSON.stringify(attendance)
);
}

// ======================
// RENDER STUDENTS
// ======================

function renderStudents(){

let list =
document.getElementById(
"studentsList"
);

list.innerHTML = "";

for(let i=0;i<students.length;i++){

list.innerHTML +=

"<div class='student'>"

+ students[i].roll
+ " - "
+ students[i].name

+ " <button onclick='deleteStudent("
+ i
+ ")'>Delete</button>"

+ "</div>";
}
}

// ======================
// RENDER SUBJECTS
// ======================

function renderSubjects(){

let list =
document.getElementById(
"subjectsList"
);

list.innerHTML = "";

let subjectSelect =
document.getElementById(
"subjectSelect"
);

let reportSubject =
document.getElementById(
"reportSubject"
);

subjectSelect.innerHTML = "";
reportSubject.innerHTML = "";

for(let i=0;i<subjects.length;i++){

list.innerHTML +=

"<div class='student'>"

+ subjects[i]

+ " <button onclick='deleteSubject("
+ i
+ ")'>Delete</button>"

+ "</div>";

let op1 =
document.createElement("option");

op1.value = subjects[i];
op1.innerText = subjects[i];

subjectSelect.appendChild(op1);

let op2 =
document.createElement("option");

op2.value = subjects[i];
op2.innerText = subjects[i];

reportSubject.appendChild(op2);
}
}

// ======================
// DELETE STUDENT
// ======================

function deleteStudent(index){

students.splice(index,1);

saveData();

renderStudents();
}

// ======================
// DELETE SUBJECT
// ======================

function deleteSubject(index){

let removedSubject =
subjects[index];

subjects.splice(index,1);

attendance =
attendance.filter(a=>
a.subject !== removedSubject
);

saveData();

renderSubjects();
}

// ======================
// ADD STUDENT
// ======================

document.getElementById(
"addStudentBtn"
).onclick = function(){

let roll =
document.getElementById(
"roll"
).value.trim();

let name =
document.getElementById(
"name"
).value.trim();

if(roll==="" || name===""){

alert(
"Enter Student Details"
);

return;
}

students.push({

roll:roll,
name:name

});

saveData();

renderStudents();

document.getElementById(
"roll"
).value = "";

document.getElementById(
"name"
).value = "";

alert(
"Student Added"
);
};

// ======================
// ADD SUBJECT
// ======================

document.getElementById(
"addSubjectBtn"
).onclick = function(){

let subject =
document.getElementById(
"subject"
).value.trim();

if(subject===""){

alert(
"Enter Subject"
);

return;
}

subjects.push(subject);

saveData();

renderSubjects();

document.getElementById(
"subject"
).value = "";

alert(
"Subject Added"
);
};

// ======================
// LOAD STUDENTS
// ======================

document.getElementById(
"loadBtn"
).onclick = function(){

let box =
document.getElementById(
"attendanceBox"
);

box.innerHTML = "";

for(let i=0;i<students.length;i++){

let div =
document.createElement(
"div"
);

div.className = "student";

div.innerHTML =

students[i].roll
+ " - "
+ students[i].name

+ "<br><br>"

+ "<select id='status"
+ i
+ "'>"

+ "<option>Present</option>"

+ "<option>Absent</option>"

+ "</select>";

box.appendChild(div);
}
};

// ======================
// SAVE ATTENDANCE
// ======================

document.getElementById(
"saveBtn"
).onclick = function(){

let subject =
document.getElementById(
"subjectSelect"
).value;

let date =
document.getElementById(
"dateInput"
).value;

if(subject==="" || date===""){

alert(
"Select Subject and Date"
);

return;
}

for(let i=0;i<students.length;i++){

let status =
document.getElementById(
"status"+i
).value;

attendance.push({

roll:
students[i].roll,

name:
students[i].name,

subject:
subject,

date:
date,

status:
status
});
}

saveData();

alert(
"Attendance Saved"
);
};

// ======================
// SUBJECT DATE REPORT
// ======================

document.getElementById(
"reportBtn"
).onclick = function(){

let subject =
document.getElementById(
"reportSubject"
).value;

let date =
document.getElementById(
"reportDate"
).value;

let report =
document.getElementById(
"report"
);

report.innerHTML = "";

let html =

"<table>"

+ "<tr>"

+ "<th>Roll No</th>"

+ "<th>Name</th>"

+ "<th>Subject</th>"

+ "<th>Date</th>"

+ "<th>Status</th>"

+ "</tr>";

for(let i=0;i<attendance.length;i++){

if(

attendance[i].subject===subject

&&

attendance[i].date===date

){

html +=

"<tr>"

+ "<td>"
+ attendance[i].roll
+ "</td>"

+ "<td>"
+ attendance[i].name
+ "</td>"

+ "<td>"
+ attendance[i].subject
+ "</td>"

+ "<td>"
+ attendance[i].date
+ "</td>"

+ "<td>"
+ attendance[i].status
+ "</td>"

+ "</tr>";
}
}

html += "</table>";

report.innerHTML = html;
};

// ======================
// STUDENT FULL REPORT
// ======================

document.getElementById(
"studentReportBtn"
).onclick = function(){

let roll =
document.getElementById(
"searchRoll"
).value.trim();

let report =
document.getElementById(
"studentReport"
);

report.innerHTML = "";

if(roll===""){

alert(
"Enter Roll Number"
);

return;
}

let found = false;

let html =

"<table>"

+ "<tr>"

+ "<th>Roll No</th>"

+ "<th>Name</th>"

+ "<th>Subject</th>"

+ "<th>Date</th>"

+ "<th>Status</th>"

+ "</tr>";

for(let i=0;i<attendance.length;i++){

if(

attendance[i].roll
.toString()
.trim()

===

roll
.toString()
.trim()

){

found = true;

html +=

"<tr>"

+ "<td>"
+ attendance[i].roll
+ "</td>"

+ "<td>"
+ attendance[i].name
+ "</td>"

+ "<td>"
+ attendance[i].subject
+ "</td>"

+ "<td>"
+ attendance[i].date
+ "</td>"

+ "<td>"
+ attendance[i].status
+ "</td>"

+ "</tr>";
}
}

html += "</table>";

if(found){

report.innerHTML = html;

}else{

report.innerHTML =

"<h3>No Attendance Found</h3>";
}
};

// ======================
// START
// ======================

renderStudents();

renderSubjects();