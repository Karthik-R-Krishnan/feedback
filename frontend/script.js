document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
  
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message })
    });
  
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    loadFeedback();
  });
  
  async function loadFeedback() {
    const res = await fetch("/api/feedback");
    const data = await res.json();
  
    const list = document.getElementById("feedbackList");
    list.innerHTML = "";
    data.forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = `${entry.name}: ${entry.message}`;
      list.appendChild(li);
    });
  }
  
  loadFeedback();
  