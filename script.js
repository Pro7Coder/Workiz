document.addEventListener("DOMContentLoaded", () => {
    const createJobBtn = document.querySelector(".yellow-btn");
  
    // API Details
    const API_URL = "https://api.pipedrive.com/v1/deals";
    const API_TOKEN = "f2d4ce926f14503c272f0dd03c312c6c28aa9724";  // My API token
  
    createJobBtn.addEventListener("click", async (e) => {
      e.preventDefault();
  
      // Collect input data
      const clientName = document.querySelector("input[placeholder='First name']").value.trim();
      const clientLastName = document.querySelector("input[placeholder='Last name']").value.trim();
      const clientPhone = document.querySelector("input[placeholder='(233) 333-4455']").value.trim();
      const clientEmail = document.querySelector("input[placeholder='test@test.test']").value.trim();
      const jobDescription = document.querySelector("textarea[placeholder='Job description']").value.trim();
      const address = document.querySelector("input[placeholder='Address']").value.trim();
      const city = document.querySelector("input[placeholder='City']").value.trim();
      const state = document.querySelector("input[placeholder='State']").value.trim();
      const zip = document.querySelector("input[placeholder='10038']").value.trim();
  
      if (!clientName || !clientLastName|| !clientPhone || !clientEmail || !jobDescription) {
        alert("Please fill out all required fields.");
        return;
      }
  
      // Prepare the payload to create a deal
      const dealData = {
        title: `Job for ${clientName},${clientLastName}`,
        value: 0,
        person_id: clientEmail,  // Use email or person ID for the contact person
        custom_fields: {
          phone: clientPhone,
          description: jobDescription,
          address: `${address}, ${city}, ${state}, ${zip}`,
        },
        add_time: new Date().toISOString(),
      };
  
      try {
        // API Request to Pipedrive
        const response = await fetch(`${API_URL}?api_token=${API_TOKEN}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dealData),
        });
  
        const result = await response.json();
  
        if (result.success) {
          // Display success message with link
          document.querySelector(".modal-content").innerHTML = `
            <h2>Job is created. <a href="https://pipedrive.com/deal/${result.data.id}" target="_blank">View details</a></h2>
          `;
          document.querySelector(".modal-footer").style.display = "none";
        } else {
          alert(`Error creating job: ${result.error}`);
        }
      } catch (error) {
        alert(`An error occurred: ${error.message}`);
      }
    });
  });
  