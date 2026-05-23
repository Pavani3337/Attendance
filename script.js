let students = [];
let subjects = [];
let attendanceRecords = [];

// ADD STUDENT
document.getElementById(
    "addStudentBtn"
).onclick = function(){

    let roll =
    document.getElementById("roll").value;

    let name =
    document.getElementById("name").value;

    if(!roll || !name) return;

    students.push({
        roll,
        name
    });

    document.getElementById("roll").value="";
    document.getElementById("name").value="";
};

// ADD SUBJECT
document.getElementById(
    "addSubjectBtn"
).onclick = function(){

    let sub =
    document.getElementById("subject").value;

    if(!sub) return;

    subjects.push(sub);

    let option =
    document.createElement("option");

    option.value = sub;
    option.innerText = sub;

    document.getElementById(
        "subjectSelect"
    ).appendChild(option);

    document.getElementById("subject").value="";
};

// LOAD STUDENTS
document.getElementById(
    "loadBtn"
).onclick = function(){

    let box =
    document.getElementById(
        "attendanceBox"
    );

    box.innerHTML="";

    students.forEach(stu=>{

        let div =
        document.createElement("div");

        div.className = "student";

        div.innerHTML = `

            ${stu.roll} - ${stu.name}

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

// SAVE ATTENDANCE
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
            "Select subject and date"
        );

        return;
    }

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

    alert(
        "Attendance Saved"
    );
};

// REPORT
document.getElementById(
    "reportBtn"
).onclick = function(){

    let report =
    document.getElementById(
        "report"
    );

    report.innerHTML="";

    students.forEach(stu=>{

        let div =
        document.createElement("div");

        div.className = "student";

        let html =
        `<h3>
            ${stu.roll} - ${stu.name}
        </h3>`;

        subjects.forEach(sub=>{

            let records =
            attendanceRecords.filter(r=>

                r.roll===stu.roll &&
                r.subject===sub
            );

            let total =
            records.length;

            let present =
            records.filter(r=>
                r.status==="Present"
            ).length;

            let percent =
            total
            ?
            ((present/total)*100)
            .toFixed(1)
            :
            0;

            html += `

                <p>

                    ${sub}

                    →
                    ${percent}%

                    (${present}/${total})

                </p>
            `;
        });

        div.innerHTML = html;

        report.appendChild(div);
    });
};