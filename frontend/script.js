document.addEventListener("DOMContentLoaded", function() {
  // Get the backend URL from environment or default to local development URL
  const backendUrl = window.BACKEND_URL || "http://localhost:3000";

  document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    
    try {
      await fetch(`${backendUrl}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message })
      });
      
      document.getElementById("name").value = "";
      document.getElementById("message").value = "";
      
      // Show success message
      const successMessage = document.getElementById("success-message");
      if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.style.opacity = '1';
        
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      }
      
      loadFeedback();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  });

  async function loadFeedback() {
    try {
      const res = await fetch(`${backendUrl}/api/feedback`);
      const data = await res.json();
      const list = document.getElementById("feedbackList");
      
      if (!list) return;
      
      list.innerHTML = "";
      
      data.forEach((entry) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <p class="name">${entry.name}</p>
          <p class="feedback">${entry.message.length > 150 ? 
            entry.message.substring(0, 150) + '...' : entry.message}</p>
        `;
        li.addEventListener('click', function() {
          // Open modal with the selected feedback's details
          const modalName = document.getElementById("modal-name");
          const modalFeedback = document.getElementById("modal-feedback");
          const feedbackModal = document.getElementById("feedback-modal");
          
          if (modalName && modalFeedback && feedbackModal) {
            modalName.textContent = entry.name;
            modalFeedback.textContent = entry.message;
            feedbackModal.style.display = "flex";
          }
        });
        list.appendChild(li);
      });
    } catch (error) {
      console.error("Error loading feedback:", error);
    }
  }

  // Initial load of feedback data
  loadFeedback();
});
