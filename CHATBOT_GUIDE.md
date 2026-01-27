# Chatbot System Guide

## Overview
Each AI agent card on the AgentHub dashboard now links to its own dedicated chatbot page. Users can interact with specialized AI agents through a modern, interactive chat interface.

## Features

### 🎨 Design
- **Premium UI**: Glassmorphism effects with dark theme
- **Smooth Animations**: Typing indicators, message animations, and floating effects
- **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop
- **Modern Typography**: Inter font family for clean readability

### 💬 Chat Interface
- **Real-time Messaging**: Send and receive messages instantly
- **Typing Indicators**: Visual feedback when the bot is "thinking"
- **Message History**: Scrollable chat area with all conversations
- **Quick Actions**: Pre-defined action buttons for common tasks
- **File Attachment**: Button for future file upload functionality

### 🤖 AI Integration
- **Dummy API**: Currently connected to JSONPlaceholder API for demonstration
- **Contextual Responses**: Each agent provides specialized responses based on its role
- **Smart Delays**: Realistic typing delays (1.5-2.5 seconds)

## Chatbot Pages

Each agent has its own chatbot page:

1. **PolicyOnboarding Agent** (`/chatbot-policy-onboarding.html`)
   - Icon: 🛡️
   - Focus: Customer onboarding and policy creation
   - Quick Actions: Start New Policy, View Guidelines, Check Requirements

2. **RiskAssessment Agent** (`/chatbot-risk-assessment.html`)
   - Icon: 🛡️
   - Focus: Risk evaluation for underwriting
   - Quick Actions: Analyze Risk, View Factors, Get Report

3. **PremiumCalculator Agent** (`/chatbot-premium-calculator.html`)
   - Icon: 📄
   - Focus: Insurance premium calculations
   - Quick Actions: Calculate Premium, View Breakdown, Compare Plans

4. **ClaimIntake Agent** (`/chatbot-claim-intake.html`)
   - Icon: 💰
   - Focus: Claim submission handling
   - Quick Actions: Submit Claim, Check Status, Upload Documents

5. **FraudDetection Agent** (`/chatbot-fraud-detection.html`)
   - Icon: 🔁
   - Focus: Fraudulent claim detection
   - Quick Actions: Run Analysis, View Patterns, Generate Report

6. **ClaimProcessing Agent** (`/chatbot-claim-processing.html`)
   - Icon: 🔗
   - Focus: Valid claim processing
   - Quick Actions: Process Claim, Track Progress, View Timeline

7. **ComplianceReporter Agent** (`/chatbot-compliance-reporter.html`)
   - Icon: ⚖️
   - Focus: Regulatory compliance
   - Quick Actions: Check Compliance, View Regulations, Generate Report

8. **CustomerSupport Agent** (`/chatbot-customer-support.html`)
   - Icon: 💬
   - Focus: Customer assistance
   - Quick Actions: Get Help, FAQs, Contact Support

9. **RenewalManager Agent** (`/chatbot-renewal-manager.html`)
   - Icon: 🕵️
   - Focus: Policy renewals
   - Quick Actions: Renew Policy, View Options, Check Eligibility

10. **FeedbackLoop Agent** (`/chatbot-feedback-loop.html`)
    - Icon: 🎧
    - Focus: System accuracy improvement
    - Quick Actions: Submit Feedback, View Insights, Track Improvements

## File Structure

```
Dashboard/
├── chatbot-policy-onboarding.html
├── chatbot-risk-assessment.html
├── chatbot-premium-calculator.html
├── chatbot-claim-intake.html
├── chatbot-fraud-detection.html
├── chatbot-claim-processing.html
├── chatbot-compliance-reporter.html
├── chatbot-customer-support.html
├── chatbot-renewal-manager.html
├── chatbot-feedback-loop.html
└── src/
    ├── chatbot-style.css      # Chatbot styling
    ├── chatbot.js             # Chatbot functionality
    ├── main.js                # Dashboard (updated with chatbot links)
    └── style.css              # Dashboard styling
```

## How It Works

### User Flow
1. User visits the AgentHub dashboard (`/index.html`)
2. User clicks "Chat Now →" on any agent card
3. Browser navigates to the agent's chatbot page
4. User can interact with the specialized AI agent
5. User can return to dashboard via "Back to Dashboard" button

### Technical Flow
1. **Message Input**: User types message and clicks send or presses Enter
2. **Display User Message**: Message appears in chat with timestamp
3. **Show Typing Indicator**: Animated dots indicate bot is processing
4. **API Call**: Message sent to dummy API (JSONPlaceholder)
5. **Generate Response**: Contextual response based on agent type
6. **Display Bot Response**: Response appears with animation and timestamp

## Customization

### Connecting to Real API

To connect to your actual AI backend, modify `src/chatbot.js`:

```javascript
// Replace this line:
const DUMMY_API_URL = 'https://jsonplaceholder.typicode.com/posts';

// With your actual API endpoint:
const DUMMY_API_URL = 'https://your-api.com/chat';
```

Then update the `sendToDummyAPI` function to handle your API's request/response format.

### Styling

All chatbot styling is in `src/chatbot-style.css`. Key customization areas:

- **Colors**: Modify gradient colors and accent colors
- **Animations**: Adjust timing and effects
- **Layout**: Change spacing, sizing, and responsive breakpoints
- **Typography**: Update font sizes and weights

### Adding New Quick Actions

Edit the HTML file for each agent and update the quick action buttons:

```html
<div class="quick-actions">
  <button class="quick-action-btn">Your Action 1</button>
  <button class="quick-action-btn">Your Action 2</button>
  <button class="quick-action-btn">Your Action 3</button>
</div>
```

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

- [ ] Real AI/LLM integration (OpenAI, Gemini, etc.)
- [ ] File upload functionality
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Chat history persistence
- [ ] User authentication
- [ ] Agent-to-agent handoff
- [ ] Rich media messages (images, videos, documents)
- [ ] Sentiment analysis
- [ ] Analytics dashboard

## Support

For issues or questions, refer to the main project README or contact the development team.

---

**Last Updated**: January 27, 2026  
**Version**: 1.0.0
