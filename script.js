let students = [];
let subjects = [];
let attendance = {};

const rollInput = document.getElementById("roll");
const nameInput = document.getElementById("name");
const subjectInput = document.getElementById("subject");

const subjectSelect = document.getElementById("subjectSelect");
const attendanceBox = document.getElementById("attendanceBox");
const reportBox = document.getElementById("report");

// ADD STUDENT
document.getElementById("addStudentBtn").addEventListener("click", () => {

    if(!rollInput.value || !nameInput.value) return;

    students.push({
        roll: rollInput.value,
        name: nameInput.value
    });

    rollInput.value = "";
    nameInput.value = "";
});

// ADD SUBJECT
document.getElementById("addSubjectBtn").addEventListener("click", () => {

    if(!subjectInput.value) return;

    subjects.push(subjectInput.value);

    attendance[subjectInput.value] = {};

    subjectInput.value = "";

    updateDropdown();
});

// UPDATE DROPDOWN
function updateDropdown(){

    subjectSelect.innerHTML = "";

    subjects.forEach(sub => {

        let opt = document.createElement("option");
        opt.value = sub;
        opt.innerText = sub;
        subjectSelect.appendChild(opt);
    });
}

// LOAD ATTENDANCE
document.getElementById("loadBtn").addEventListener("click", () => {

    let subject = subjectSelect.value;

    if(!subject) return;

    attendanceBox.innerHTML = `<h2>${subject}</h2>`;

    students.forEach(stu => {

        if(attendance[subject][stu.roll] === undefined){
            attendance[subject][stu.roll] = false;
        }

        let div = document.createElement("div");
        div.className = "student";

        div.innerHTML = `
            ${stu.roll} - ${stu.name}
            <button class="pBtn">Present</button>
            <button class="aBtn">Absent</button>
            <span>${attendance[subject][stu.roll] ? "Present" : "Absent"}</span>
        `;

        div.querySelector(".pBtn").onclick = () => {
            attendance[subject][stu.roll] = true;
            div.querySelector("span").innerText = "Present";
        };

        div.querySelector(".aBtn").onclick = () => {
            attendance[subject][stu.roll] = false;
            div.querySelector("span").innerText = "Absent";
        };

        attendanceBox.appendChild(div);
    });
});

// REPORT
document.getElementById("reportBtn").addEventListener("click", () => {

    reportBox.innerHTML = "";

    students.forEach(stu => {

        let total = subjects.length;
        let present = 0;

        subjects.forEach(sub => {

            if(attendance[sub] && attendance[sub][stu.roll]){
                present++;
            }
        });

        let percent = total ? (present/total)*100 : 0;

        let div = document.createElement("div");
        div.className = "box";

        div.innerText =
            stu.roll + " - " + stu.name +
            " → " + percent.toFixed(1) + "%";

        reportBox.appendChild(div);
    });
});