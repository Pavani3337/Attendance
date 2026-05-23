// ===================
// DATA
// ===================

let students =
JSON.parse(localStorage.getItem("students"))
|| [];

let subjects =
JSON.parse(localStorage.getItem("subjects"))
|| [];

let attendance =
JSON.parse(localStorage.getItem("attendance"))
|| [];

// ===================
// SAVE
// ===================

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

// ===================
// LOAD SUBJECTS
// ===================

function loadSubjects(){

    let s1 =
    document.getElementById(
        "subjectSelect"
    );

    let s2 =
    document.getElementById(
        "reportSubject"
    );

    s1.innerHTML = "";
    s2.innerHTML = "";

    for(let i=0;i<subjects.length;i++){

        let op1 =
        document.createElement("option");

        op1.value = subjects[i];
        op1.innerText = subjects[i];

        s1.appendChild(op1);

        let op2 =
        document.createElement("option");

        op2.value = subjects[i];
        op2.innerText = subjects[i];

        s2.appendChild(op2);
    }

    renderSubjects();
}

// ===================
// RENDER STUDENTS
// ===================

function renderStudents(){

    let box =
    document.getElementById(
        "studentsList"
    );

    if(!box) return;

    box.innerHTML = "";

    for(let i=0;i<students.length;i++){

        box.innerHTML += `

        <div class="student">

            ${students[i].roll}
            -
            ${students[i].name}

            <button onclick="
                deleteStudent(${i})
            ">
                Delete
            </button>

        </div>
        `;
    }
}

// ===================
// RENDER SUBJECTS
// ===================

function renderSubjects(){

    let box =
    document.getElementById(
        "subjectsList"
    );

    if(!box) return;

    box.innerHTML = "";

    for(let i=0;i<subjects.length;i++){

        box.innerHTML += `

        <div class="student">

            ${subjects[i]}

            <button onclick="
                deleteSubject(${i})
            ">
                Delete
            </button>

        </div>
        `;
    }
}

// ===================
// DELETE STUDENT
// ===================

function deleteStudent(index){

    students.splice(index,1);

    saveData();

    renderStudents();
}

// ===================
// DELETE SUBJECT
// ===================

function deleteSubject(index){

    let removedSubject =
    subjects[index];

    subjects.splice(index,1);

    attendance =
    attendance.filter(a=>
        a.subject!==removedSubject
    );

    saveData();

    loadSubjects();
}

// ===================
// ADD STUDENT
// ===================

document.getElementById(
    "addStudentBtn"
).onclick = function(){

    let roll =
    document.getElementById(
        "roll"
    ).value;

    let name =
    document.getElementById(
        "name"
    ).value;

    if(roll==="" || name===""){

        alert(
            "Enter details"
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
    ).value="";

    document.getElementById(
        "name"
    ).value="";

    alert(
        "Student Added"
    );
};

// ===================
// ADD SUBJECT
// ===================

document.getElementById(
    "addSubjectBtn"
).onclick = function(){

    let sub =
    document.getElementById(
        "subject"
    ).value;

    if(sub===""){

        alert(
            "Enter subject"
        );

        return;
    }

    subjects.push(sub);

    saveData();

    loadSubjects();

    document.getElementById(
        "subject"
    ).value="";

    alert(
        "Subject Added"
    );
};

// ===================
// LOAD ATTENDANCE
// ===================

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
        document.createElement("div");

        div.className = "student";

        div.innerHTML =

        students[i].roll
        + " - "
        + students[i].name

        + "<br><br>"

        + "<select id='status"
        + i +
        "'>"

        + "<option>Present</option>"

        + "<option>Absent</option>"

        + "</select>";

        box.appendChild(div);
    }
};

// ===================
// SAVE ATTENDANCE
// ===================

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
            "Select subject/date"
        );

        return;
    }

    for(let i=0;i<students.length;i++){

        let status =
        document.getElementById(
            "status"+i
        ).value;

        attendance.push({

            roll:students[i].roll,

            name:students[i].name,

            subject:subject,

            date:date,

            status:status
        });
    }

    saveData();

    alert(
        "Attendance Saved"
    );
};

// ===================
// REPORT
// ===================

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

// ===================
// START
// ===================

loadSubjects();
renderStudents();