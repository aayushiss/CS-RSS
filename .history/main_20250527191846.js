// console.log("Script loaded!");

document.getElementById("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const query = document.getElementById("query").value;

    try {
      const response = await fetch("https://noisy-lucia-aayushiss-org-1509952b.koyeb.app/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, query }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Query submitted successfully!");
        document.getElementById("form").reset();
      } else {
        alert(data.message || "Submission failed.");
      }
    } catch (error) {
      console.error(error);
      alert("There was an error submitting the form.");
    }
  });