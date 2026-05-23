// ======================
// LOCAL STORAGE DATA
// ======================

let students =
JSON.parse(
    localStorage.getItem("students")
) || [];

let subjects =
JSON.parse(
    localStorage.getItem("subjects")
) || [];

let attendanceRecords =
JSON.parse(
    localStorage.getItem("attendanceRecords")
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
        "attendanceRecords",
        JSON.stringify(attendanceRecords)
    );
}

// ======================
// LOAD SUBJECT DROPDOWNS
// ======================

function loadSubjects(){

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
).onclick = function(){

    let roll =
    document.getElementById(
        "roll"
    ).value.trim();

    let name =
    document.getElementById(
        "name"
    ).value.trim();

    if(!roll || !name){

        alert(
            "Enter Roll Number and Name"
        );

        return;
    }

    students.push({

        roll,
        name
    });

    saveData();

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

    if(!subject){

        alert(
            "Enter Subject Name"
        );

        return;
    }

    subjects.push(subject);

    saveData();

    loadSubjects();

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

    let subject =
    document.getElementById(
        "subjectSelect"
    ).value;

    let date =
    document.getElementById(
        "dateInput"
    ).value;

    if(!subject || !date){

        alert(
            "Select Subject and Date"
        );

        return;
    }

    let box =
    document.getElementById(
        "attendanceBox"
    );

    box.innerHTML = "";

    students.forEach(stu=>{

        let div =
        document.createElement(
            "div"
        );

        div.className = "student";

        div.innerHTML = `

            <h3>

                ${stu.roll}
                -
                ${stu.name}

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

    if(!subject || !date){

        alert(
            "Select Subject and Date"
        );

        return;
    }

    // REMOVE OLD RECORDS
    attendanceRecords =
    attendanceRecords.filter(r=>

        !(
            r.subject===subject &&
            r.date===date
        )
    );

    students.forEach(stu=>{

        let status =
        document.getElementById(
            `status-${stu.roll}`
        ).value;

        attendanceRecords.push({

            roll:stu.roll,

            name:stu.name,

            subject,

            date,

            status
        });
    });

    saveData();

    alert(
        "Attendance Saved Successfully"
    );
};

// ======================
// SHOW REPORT
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

    if(!subject || !date){

        alert(
            "Select Subject and Date"
        );

        return;
    }

    let report =
    document.getElementById(
        "report"
    );

    report.innerHTML = "";

    let box =
    document.createElement(
        "div"
    );

    box.className = "student";

    let html = `

        <h2>
            📘 ${subject}
        </h2>

        <h3>
            📅 ${date}
        </h3>

        <table>

            <tr>

                <th>
                    Roll Number
                </th>

                <th>
                    Student Name
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
        attendanceRecords.find(r=>

            r.roll===stu.roll &&
            r.subject===subject &&
            r.date===date
        );

        let attended =
        (
            record &&
            record.status==="Present"
        )
        ? 1
        : 0;

        let status =
        (
            record &&
            record.status==="Present"
        )
        ? "Present"
        : "Absent";

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
    `;

    box.innerHTML = html;

    report.appendChild(box);
};

// ======================
// START
// ======================

loadSubjects();