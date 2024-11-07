const express = require("express");
const fetch = require("node-fetch");
const app = express();

// To handle POST request body (if needed)
app.use(express.json());

// Route to handle the request
app.get("/fetch-clickup", async (req, res) => {
  try {
    // Make the POST request to the ClickUp API
    const response = await fetch(
      "https://app.clickup.com/api?client_id=WMJI5VECN2FG0EETI5D1R1DOZJOX139H&redirect_uri=https://loquacious-cassata-078d95.netlify.app/%23/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body), // Ensure you're sending JSON as the body if needed
      }
    );

    // Check if the response is OK (status 200)
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // If the response is HTML, send it as raw HTML to the browser
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      const htmlContent = await response.text();
      return res.send(htmlContent); // Send HTML response as raw HTML
    }

    // Parse response data if it's JSON
    const data = await response.json();

    // Send JSON response back to the client
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
