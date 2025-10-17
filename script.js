document.getElementById("generateBtn").addEventListener("click", generateCV);

function generateCV() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const summary = document.getElementById("summary").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const skills = document.getElementById("skills").value.split(",");
  const photoFile = document.getElementById("photo").files[0];

  if (!name || !email || !phone) {
    alert("Please fill out the required fields.");
    return;
  }

  let photoURL = "";
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      photoURL = e.target.result;
      displayCV(photoURL);
    };
    reader.readAsDataURL(photoFile);
  } else {
    displayCV(photoURL);
  }

  function displayCV(photo) {
    const skillsList = skills.map(skill => `<li>${skill.trim()}</li>`).join("");

    const output = `
      <div class="cv-container" id="cvPreview">
        <div class="cv-left">
          ${photo ? `<img src="${photo}" alt="Profile Picture">` : ""}
          <h2>${name}</h2>
          <p><strong>Email:</strong><br>${email}</p>
          <p><strong>Phone:</strong><br>${phone}</p>
          <p><strong>Address:</strong><br>${address}</p>
          <h3>Skills</h3>
          <ul>${skillsList}</ul>
        </div>
        <div class="cv-right">
          <h3>Profile Summary</h3>
          <p>${summary}</p>
          <h3>Work Experience</h3>
          <p>${experience}</p>
          <h3>Education</h3>
          <p>${education}</p>
        </div>
      </div>
    `;

    document.getElementById("cvOutput").innerHTML = output;
    document.querySelector(".cv-section").style.display = "block";
  }
}

// PDF Export
document.getElementById("downloadPDF").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "pt", "a4");
  const elementHTML = document.getElementById("cvPreview");

  await doc.html(elementHTML, {
    callback: function (pdf) {
      pdf.save("My_CV.pdf");
    },
    x: 20,
    y: 20,
    html2canvas: { scale: 0.6 }
  });
});

// DOC Export
document.getElementById("downloadDOC").addEventListener("click", () => {
  const content = document.getElementById("cvPreview").innerHTML;
  const converted = window.htmlDocx.asBlob(`<!DOCTYPE html><html><body>${content}</body></html>`);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(converted);
  link.download = "My_CV.docx";
  link.click();
});
