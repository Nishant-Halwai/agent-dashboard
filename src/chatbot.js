// Chatbot Functionality

// Get DOM elements
const chatArea = document.getElementById('chatArea');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const quickActionButtons = document.querySelectorAll('.quick-action-btn');

// Dummy API endpoint (replace with your actual API)
const DUMMY_API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Get agent name from page title
const agentName = document.querySelector('.agent-name').textContent;
const agentIcon = document.querySelector('.agent-icon').textContent;

// Function to get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Function to create a message element
function createMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? '👤' : agentIcon;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    const messagePara = document.createElement('p');
    messagePara.textContent = content;

    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = getCurrentTime();

    messageContent.appendChild(messagePara);
    messageContent.appendChild(messageTime);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);

    return messageDiv;
}

// Function to create typing indicator
function createTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = agentIcon;

    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingContent.appendChild(dot);
    }

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);

    return typingDiv;
}

// Function to scroll to bottom of chat
function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Function to send message to dummy API
async function sendToDummyAPI(message) {
    try {
        const response = await fetch(DUMMY_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: message,
                body: message,
                userId: 1,
            }),
        });

        const data = await response.json();

        // Simulate AI response based on agent type
        return generateAgentResponse(message);
    } catch (error) {
        console.error('Error sending to API:', error);
        return "I apologize, but I'm having trouble connecting right now. Please try again later.";
    }
}

// Function to generate contextual responses based on agent type
function generateAgentResponse(userMessage) {
    const responses = {
        'PolicyOnboarding': [
            "I can help you start the policy onboarding process. What type of insurance are you interested in?",
            "To create a new policy, I'll need some basic information. Shall we begin?",
            "I've reviewed your request. Let me guide you through the onboarding steps.",
        ],
        'RiskAssessment': [
            "I'll analyze the risk factors for your case. This may take a moment.",
            "Based on the information provided, I'm calculating the risk assessment.",
            "Let me evaluate the risk profile for this scenario.",
        ],
        'PremiumCalculator': [
            "I'm calculating the premium based on the provided details.",
            "The premium calculation depends on several factors. Let me process this for you.",
            "I'll compute the most accurate premium for your policy.",
        ],
        'ClaimIntake': [
            "I've received your claim submission. Let me verify the details.",
            "Thank you for submitting your claim. I'll process this right away.",
            "I'm reviewing your claim information to ensure everything is complete.",
        ],
        'FraudDetection': [
            "I'm analyzing the claim for any potential fraud indicators.",
            "Running fraud detection algorithms on the submitted data.",
            "Let me check this claim against our fraud detection system.",
        ],
        'ClaimProcessing': [
            "I'm processing your claim through our automated system.",
            "Your claim is being reviewed. I'll update you on the status shortly.",
            "Processing the claim details and verifying documentation.",
        ],
        'ComplianceReporter': [
            "I'm checking compliance with current regulations.",
            "Let me verify this against our compliance requirements.",
            "Running compliance checks on the provided information.",
        ],
        'CustomerSupport': [
            "I'm here to help! What questions do you have?",
            "Let me assist you with that inquiry.",
            "I'll do my best to resolve your concern.",
        ],
        'RenewalManager': [
            "I can help you with policy renewal. When does your current policy expire?",
            "Let me check your renewal options and pricing.",
            "I'll guide you through the renewal process.",
        ],
        'FeedbackLoop': [
            "Thank you for your feedback. I'm learning from this interaction.",
            "I'm analyzing this feedback to improve our system.",
            "Your input helps me become more accurate. Thank you!",
        ],
    };

    // Find matching agent type
    let agentType = 'CustomerSupport'; // default
    for (const key in responses) {
        if (agentName.includes(key)) {
            agentType = key;
            break;
        }
    }

    // Get random response from agent's response pool
    const agentResponses = responses[agentType];
    const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];

    return randomResponse;
}

// Function to handle sending message
async function handleSendMessage() {
    const message = messageInput.value.trim();

    if (!message) return;

    // Add user message to chat
    const userMessage = createMessage(message, true);
    chatArea.appendChild(userMessage);
    scrollToBottom();

    // Clear input
    messageInput.value = '';

    // Show typing indicator
    const typingIndicator = createTypingIndicator();
    chatArea.appendChild(typingIndicator);
    scrollToBottom();

    // Disable send button
    sendButton.disabled = true;

    // Simulate API call delay
    setTimeout(async () => {
        // Remove typing indicator
        typingIndicator.remove();

        // Get bot response
        const botResponse = await sendToDummyAPI(message);
        const botMessage = createMessage(botResponse, false);
        chatArea.appendChild(botMessage);
        scrollToBottom();

        // Re-enable send button
        sendButton.disabled = false;
        messageInput.focus();
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
}

// Event listeners
sendButton.addEventListener('click', handleSendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

// Quick action buttons
quickActionButtons.forEach(button => {
    button.addEventListener('click', () => {
        messageInput.value = button.textContent;
        messageInput.focus();
    });
});

// Auto-focus on input when page loads
window.addEventListener('load', () => {
    messageInput.focus();
});
