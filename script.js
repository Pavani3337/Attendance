let students = [];
let subjects = [];
let attendance = {}; 
// structure:
// attendance = { DBMS: { roll1: true/false } }

function addStudent(){

    let roll = document.getElementById("roll").value;
    let name = document.getElementById("name").value;

    if(!roll || !name) return;

    students.push({roll, name});

    document.getElementById("roll").value = "";
    document.getElementById("name").value = "";
}

function addSubject(){

    let subject = document.getElementById("subject").value;

    if(!subject) return;

    subjects.push(subject);

    attendance[subject] = {};

    updateSubjectDropdown();

    document.getElementById("subject").value = "";
}

function updateSubjectDropdown(){

    let select = document.getElementById("subjectSelect");

    select.innerHTML = "";

    subjects.forEach(sub => {

        select.innerHTML += `
            <option value="${sub}">${sub}</option>
        `;
    });
}

function loadAttendance(){

    let subject = document.getElementById("subjectSelect").value;

    let box = document.getElementById("attendanceBox");

    box.innerHTML = `<h2>${subject} Attendance</h2>`;

    students.forEach(stu => {

        if(attendance[subject][stu.roll] === undefined){
            attendance[subject][stu.roll] = false;
        }

        box.innerHTML += `
        <div class="student">

            ${stu.roll} - ${stu.name}

            <button onclick="mark('${subject}','${stu.roll}',true)">
                Present
            </button>

            <button onclick="mark('${subject}','${stu.roll}',false)">
                Absent
            </button>

            <span>
                Status:
                ${attendance[subject][stu.roll] ? "Present" : "Absent"}
            </span>

        </div>
        `;
    });
}

function mark(subject, roll, status){

    attendance[subject][roll] = status;

    loadAttendance();
}

function showReport(){

    let report = document.getElementById("report");

    report.innerHTML = "";

    students.forEach(stu => {

        let total = subjects.length;
        let present = 0;

        subjects.forEach(sub => {

            if(attendance[sub] && attendance[sub][stu.roll]){
                present++;
            }

        });

        let percent = total ? (present/total)*100 : 0;

        report.innerHTML += `
            <div class="box">
                ${stu.roll} - ${stu.name}
                <br>
                Attendance: ${percent.toFixed(1)}%
            </div>
        `;
    });
}