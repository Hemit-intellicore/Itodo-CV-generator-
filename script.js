const { jsPDF } = window.jspdf;

document.getElementById("generateBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const summary = document.getElementById("summary").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const skills = document.getElementById("skills").value;

  const cvHTML = `
    <h2>${name}</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}</p>

    <h3>Profile Summary</h3>
    <p>${summary}</p>

    <h3>Education</h3>
    <p>${education}</p>

    <h3>Experience</h3>
    <p>${experience}</p>

    <h3>Skills</h3>
    <p>${skills}</p>
  `;

  const cvOutput = document.getElementById("cvOutput");
  cvOutput.innerHTML = cvHTML;
  cvOutput.style.display = "block";
  document.getElementById("downloadBtn").style.display = "inline-block";
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const cv = document.getElementById("cvOutput");

  doc.html(cv, {
    callback: function (pdf) {
      pdf.save("Itodo_CV.pdf");
    },
    margin: [20, 20, 20, 20],
    autoPaging: "text",
    x: 0,
    y: 0,
    width: 550,
    windowWidth: 800,
  });
});
