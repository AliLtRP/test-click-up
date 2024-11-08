const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 3000;

// To handle POST request body (if needed)
app.use(express.json());

// Route to handle the request
app.get("/fetch-clickup", async (req, res) => {
  const { code } = req.query;
  try {
    // Make the POST request to the ClickUp API
    const response = await fetch(
      `https://api.clickup.com/api/v2/oauth/token?client_id=WMJI5VECN2FG0EETI5D1R1DOZJOX139H&client_secret=4CKQU8TJVJEU3HH8RT7LIO3ADWIX7UB9ERARYSM7CWZX2VBBGV9HFW1R76A49CRK&code=${code}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is OK (status 200)
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // Parse the response data
    const data = await response.json();
    console.log(data);

    // Send the parsed data as a response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
