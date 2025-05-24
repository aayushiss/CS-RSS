console.log("Script loaded!");

document.getElementById("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const query = document.getElementById("query").value;

    try {
      const response = await fetch("http://localhost:5000/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, query }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("There was an error submitting the form.");
    }
  });