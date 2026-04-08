// Get references to the DOM elements
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const responseContainer = document.getElementById('response');

// Add an event listener to handle form submission
chatForm.addEventListener('submit', async (event) => {
  // Prevent the page from refreshing when the form is submitted
  event.preventDefault();
  
  // Get the user's input text
  const userMessage = userInput.value;
  
  // Clear the input field for the next message
  userInput.value = '';
  
  // Send a POST request to the OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST', // We are POST-ing data to the API
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
      'Authorization': `Bearer ${apiKey}` // Include the API key for authorization
    },
    // Send model details and system message
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: `You are a friendly Budget Travel Planner, specializing in cost-conscious travel advice. You help users find cheap flights, budget-friendly accommodations, affordable itineraries, and low-cost activities in their chosen destination. 

        If a user's query is unrelated to budget travel, respond by stating that you do not know.`},
        
        { role: 'user', content: userMessage }
      ]
    })
  });
  
  // Parse and store the response data
  const result = await response.json();
  
  // Display the AI's response on the page
  const aiResponse = result.choices[0].message.content;
  responseContainer.textContent = aiResponse;
});