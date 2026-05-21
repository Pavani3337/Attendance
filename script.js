let subjects = JSON.parse(localStorage.getItem("attendance")) || [];

let currentSubject = null;

// SAVE
function save(){
    localStorage.setItem("attendance", JSON.stringify(subjects));
}

// ADD SUBJECT
document.getElementById("addSubjectBtn").onclick = function(){

    let input = document.getElementById("subjectInput");
    let name = input.value.trim();

    if(name === "") return;

    subjects.push({
        id: Date.now(),
        name: name,
        total: 0,
        present: 0,
        absent: 0
    });

    input.value = "";
    save();
    renderSubjects();
};

// RENDER HOME
function renderSubjects(){

    let container = document.getElementById("subjectsContainer");
    container.innerHTML = "";

    subjects.forEach(s => {

        container.innerHTML += `
        <div class="card">

            <h2>📘 ${s.name}</h2>

            <p>Attendance: ${getPercent(s)}%</p>

            <button onclick="openSubject(${s.id})">Open</button>
            <button onclick="deleteSubject(${s.id})">Delete</button>

        </div>
        `;
    });
}

// OPEN SUBJECT
function openSubject(id){

    currentSubject = subjects.find(s => s.id === id);

    document.getElementById("homePage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";

    document.getElementById("subjectTitle").innerText = currentSubject.name;

    updateUI();
}

// BACK
document.getElementById("backBtn").onclick = function(){

    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";

    save();
    renderSubjects();
};

// PRESENT
document.getElementById("presentBtn").onclick = function(){

    currentSubject.total++;
    currentSubject.present++;

    updateUI();
};

// ABSENT
document.getElementById("absentBtn").onclick = function(){

    currentSubject.total++;
    currentSubject.absent++;

    updateUI();
};

// UPDATE UI
function updateUI(){

    document.getElementById("total").innerText = currentSubject.total;
    document.getElementById("present").innerText = currentSubject.present;
    document.getElementById("absent").innerText = currentSubject.absent;
    document.getElementById("percentage").innerText = getPercent(currentSubject);

    save();
}

// PERCENTAGE
function getPercent(s){

    if(s.total === 0) return 0;

    return ((s.present / s.total) * 100).toFixed(1);
}

// DELETE SUBJECT
function deleteSubject(id){

    subjects = subjects.filter(s => s.id !== id);
    save();
    renderSubjects();
}

// START
renderSubjects();