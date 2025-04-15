document.addEventListener("DOMContentLoaded", function() {
  // Get the backend URL from environment or default to local development URL
  const backendUrl = window.BACKEND_URL || "http://localhost:8080";
  console.log("Using backend URL:", backendUrl);

  document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    
    try {
      const response = await fetch(`${backendUrl}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
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
      alert(`Failed to submit feedback: ${error.message}`);
    }
  });

  async function loadFeedback() {
    try {
      const response = await fetch(`${backendUrl}/api/feedback`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
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
      alert(`Failed to load feedback: ${error.message}`);
    }
  }

  // Initial load of feedback data
  loadFeedback();
});
