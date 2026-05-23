// ======================
// DATA
// ======================

let students = [];

let subjects = [];

let attendanceRecords = [];

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

    let option =
    document.createElement(
        "option"
    );

    option.value = subject;

    option.innerText = subject;

    document.getElementById(
        "subjectSelect"
    ).appendChild(option);

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
        "Attendance Saved Successfully"
    );
};

// ======================
// SHOW REPORT
// ======================

document.getElementById(
    "reportBtn"
).onclick = function(){

    let report =
    document.getElementById(
        "report"
    );

    report.innerHTML = "";

    subjects.forEach(sub=>{

        // SUBJECT TITLE
        let subjectBox =
        document.createElement(
            "div"
        );

        subjectBox.className = "box";

        subjectBox.innerHTML = `

            <h2>
                📘 ${sub}
            </h2>
        `;

        report.appendChild(
            subjectBox
        );

        // UNIQUE DATES
        let dates = [

            ...new Set(

                attendanceRecords
                .filter(r=>
                    r.subject===sub
                )
                .map(r=>r.date)

            )
        ];

        dates.forEach(date=>{

            let tableBox =
            document.createElement(
                "div"
            );

            tableBox.className =
            "student";

            let html = `

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

                let records =
                attendanceRecords.filter(r=>

                    r.roll===stu.roll &&
                    r.subject===sub &&
                    r.date===date
                );

                let attended =
                records.filter(r=>
                    r.status==="Present"
                ).length;

                let status =
                attended > 0
                ?
                "Present"
                :
                "Absent";

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

            tableBox.innerHTML = html;

            report.appendChild(
                tableBox
            );
        });
    });
};