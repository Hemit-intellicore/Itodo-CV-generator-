document.getElementById("generateBtn").addEventListener("click", generateCV);

function generateCV() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const summary = document.getElementById("summary").value.trim();
  const education = document.getElementById("education").value.trim();
  const experience = document.getElementById("experience").value.trim();
  const skills = document.getElementById("skills").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill in all required fields.");
    return;
  }

  const cvHTML = `
    <div class="cv" id="cvPreview">
      <h2>${name}</h2>
      <p>${email} | ${phone} | ${address}</p>

      <section>
        <h3>Profile Summary</h3>
        <p>${summary}</p>
      </section>

      <section>
        <h3>Experience</h3>
        <p>${experience}</p>
      </section>

      <section>
        <h3>Education</h3>
        <p>${education}</p>
      </section>

      <section>
        <h3>Skills</h3>
        <p>${skills}</p>
      </section>
    </div>
  `;

  document.getElementById("cvOutput").innerHTML = cvHTML;
  document.querySelector(".cv-section").style.display = "block";
}

// PDF Download (working)
document.getElementById("downloadPDF").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const cvElement = document.getElementById("cvPreview");
  const canvas = await html2canvas(cvElement, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("Itodo_CV.pdf");
});

// DOC Download (working)
document.getElementById("downloadDOC").addEventListener("click", () => {
  const cvHTML = document.getElementById("cvPreview").outerHTML;
  const blob = window.htmlDocx.asBlob(`<!DOCTYPE html><html><body>${cvHTML}</body></html>`);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Itodo_CV.docx";
  link.click();
});
