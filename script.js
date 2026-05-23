// ======================
// STORAGE
// ======================

let students =
JSON.parse(localStorage.getItem("students"))
|| [];

let subjects =
JSON.parse(localStorage.getItem("subjects"))
|| [];

let attendance =
JSON.parse(localStorage.getItem("attendance"))
|| [];

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
// DROPDOWNS
// ======================

function loadDropdowns(){

    let subjectSelect =
    document.getElementById("subjectSelect");

    let reportSubject =
    document.getElementById("reportSubject");

    subjectSelect.innerHTML = "";
    reportSubject.innerHTML = "";

    subjects.forEach(sub=>{

        let option1 =
        document.createElement("option");

        option1.value = sub;
        option1.innerText = sub;

        subjectSelect.appendChild(option1);

        let option2 =
        document.createElement("option");

        option2.value = sub;
        option2.innerText = sub;

        reportSubject.appendChild(option2);
    });
}

// ======================
// ADD STUDENT
// ======================

document.getElementById(
    "addStudentBtn"
).addEventListener("click", ()=>{

    let roll =
    document.getElementById("roll")
    .value.trim();

    let name =
    document.getElementById("name")
    .value.trim();

    if(!roll || !name){

        alert("Enter student details");

        return;
    }

    students.push({
        roll,
        name
    });

    saveData();

    document.getElementById("roll").value="";
    document.getElementById("name").value="";

    alert("Student Added");
});

// ======================
// ADD SUBJECT
// ======================

document.getElementById(
    "addSubjectBtn"
).addEventListener("click", ()=>{

    let subject =
    document.getElementById("subject")
    .value.trim();

    if(!subject){

        alert("Enter subject");

        return;
    }

    subjects.push(subject);

    saveData();

    loadDropdowns();

    document.getElementById("subject").value="";

    alert("Subject Added");
});

// ======================
// LOAD STUDENTS
// ======================

document.getElementById(
    "loadBtn"
).addEventListener("click", ()=>{

    let subject =
    document.getElementById("subjectSelect")
    .value;

    let date =
    document.getElementById("dateInput")
    .value;

    if(!subject || !date){

        alert("Select subject and date");

        return;
    }

    let box =
    document.getElementById("attendanceBox");

    box.innerHTML = "";

    students.forEach(stu=>{

        let div =
        document.createElement("div");

        div.className = "student";

        div.innerHTML = `

            <h3>
                ${stu.roll} - ${stu.name}
            </h3>

            <select id="status-${stu.roll}">

                <option value="Present">
                    Present
                </option>

                <option value="Absent">
                    Absent
                </option>

            </select>
        `;

        box.appendChild(div);
    });
});

// ======================
// SAVE ATTENDANCE
// ======================

document.getElementById(
    "saveBtn"
).addEventListener("click", ()=>{

    let subject =
    document.getElementById("subjectSelect")
    .value;

    let date =
    document.getElementById("dateInput")
    .value;

    if(!subject || !date){

        alert("Select subject and date");

        return;
    }

    attendance =
    attendance.filter(record=>

        !(
            record.subject===subject &&
            record.date===date
        )
    );

    students.forEach(stu=>{

        let status =
        document.getElementById(
            `status-${stu.roll}`
        ).value;

        attendance.push({

            roll:stu.roll,

            name:stu.name,

            subject,

            date,

            status
        });
    });

    saveData();

    alert("Attendance Saved");
});

// ======================
// SHOW REPORT
// ======================

document.getElementById(
    "reportBtn"
).addEventListener("click", ()=>{

    let subject =
    document.getElementById("reportSubject")
    .value;

    let date =
    document.getElementById("reportDate")
    .value;

    if(!subject || !date){

        alert("Select report subject/date");

        return;
    }

    let report =
    document.getElementById("report");

    report.innerHTML = "";

    let html = `

        <div class="student">

        <h2>
            📘 ${subject}
        </h2>

        <h3>
            📅 ${date}
        </h3>

        <table>

            <tr>

                <th>
                    Roll No
                </th>

                <th>
                    Name
                </th>

                <th>
                    Attended Classes
                </th>

                <th>
                    Status
                </th>

            </tr>
    `;

    students.forEach(stu=>{

        let record =
        attendance.find(r=>

            r.roll===stu.roll &&
            r.subject===subject &&
            r.date===date
        );

        let attended = 0;
        let status = "Absent";

        if(record){

            if(record.status==="Present"){

                attended = 1;
                status = "Present";
            }
        }

        html += `

            <tr>

                <td>
                    ${stu.roll}
                </td>

                <td>
                    ${stu.name}
                </td>

                <td>
                    ${attended}
                </td>

                <td class="
                    ${status==="Present"
                    ?
                    "present"
                    :
                    "absent"}
                ">
                    ${status}
                </td>

            </tr>
        `;
    });

    html += `
        </table>
        </div>
    `;

    report.innerHTML = html;
});

// ======================
// START
// ======================

loadDropdowns();