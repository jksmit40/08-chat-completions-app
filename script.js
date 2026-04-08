// Get references to the DOM elements
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const responseContainer = document.getElementById('response');

// Array to keep track of conversation history
const conversationHistory = [];

// Add an event listener to handle form submission
chatForm.addEventListener('submit', async (event) => {
  // Prevent the page from refreshing when the form is submitted
  event.preventDefault();
  
  // Use try/catch to handle errors
  try {
    // Get the user's input text
    const userMessage = userInput.value;
    
    // Clear the input field for the next message
    userInput.value = '';
    
    // Show a waiting message while the AI is responding
    responseContainer.textContent = 'Thinking...';
    
    // Add the user's message to the conversation history
    conversationHistory.push({ role: 'user', content: userMessage });
    
    // Create the messages array with the system message and conversation history
    const messages = [
      { role: 'system', content: `You are a friendly Budget Travel Planner, specializing in cost-conscious travel advice. You help users find cheap flights, budget-friendly accommodations, affordable itineraries, and low-cost activities in their chosen destination. 

        If a user's query is unrelated to budget travel, respond by stating that you do not know.`},
      ...conversationHistory
    ];
    
    // Send a POST request to the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', // We are POST-ing data to the API
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        'Authorization': `Bearer ${apiKey}` // Include the API key for authorization
      },
      // Send model details and messages array
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages
      })
    });
    
    // Parse and store the response data
    const result = await response.json();
    
    // Get the AI's response
    const aiResponse = result.choices[0].message.content;
    
    // Add the AI's response to the conversation history
    conversationHistory.push({ role: 'assistant', content: aiResponse });
    
    // Display the AI's response on the page
    responseContainer.textContent = aiResponse;
  } catch (error) {
    // Log the error to the console for debugging
    console.error('Error:', error);
    
    // Show a user-friendly error message on the page
    responseContainer.textContent = 'Sorry, something went wrong. Please try again.';
  }
});