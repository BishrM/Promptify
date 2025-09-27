# Promptify - AI Prompt Review Engine

A comprehensive AI safety tool for schools, companies, and AI platforms to filter unsafe prompts and encourage better prompt writing practices.

## 🎯 Project Overview

**Promptify** helps organizations ensure safe and effective AI interactions by:
- **Safety Filtering**: Automatically detecting and blocking unsafe content
- **Quality Assurance**: Encouraging clear, well-structured prompts
- **Real-time Analytics**: Providing insights into prompt usage patterns
- **AI Integration**: Generating responses for approved prompts using OpenAI

## 🚀 Features

### Core Functionality
- **Prompt Safety Review**: Automated analysis using rule-based engine
- **Three-tier Classification**:
  - 🟢 **ALLOW**: Safe and clear prompts ready for AI processing
  - 🟡 **NEEDS_FIX**: Prompts requiring improvement (too short/unclear)
  - 🔴 **BLOCK**: Unsafe content containing banned keywords
- **Content Sanitization**: Automatic replacement of inappropriate content with ***

### Advanced Features
- **OpenAI Integration**: Generate AI responses for approved prompts
- **Analytics Dashboard**: Real-time statistics with interactive charts
- **Admin Mode**: Organizational oversight capabilities
- **History Tracking**: Complete audit trail of all prompt reviews
- **Real-world Impact Analysis**: Context-aware explanations for each decision

## 🏗️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React
- **Charts**: Recharts
- **AI Integration**: OpenAI API
- **Build Tool**: Vite
- **Deployment**: Lovable Platform

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (optional, for AI responses)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd promptify
npm install
```

2. **Configure OpenAI API Key (Optional):**
   - Set up your OpenAI API key in the Lovable secrets management
   - Secret name: `VITE_OPENAI_API_KEY`
   - Without this key, the app will work but won't generate AI responses

3. **Start development server:**
```bash
npm run dev
```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🎮 Usage

### For End Users
1. **Submit Prompts**: Enter your text in the prompt input field
2. **Get Instant Feedback**: Review the safety verdict and recommendations
3. **View AI Responses**: Approved prompts receive AI-generated responses
4. **Learn Best Practices**: Use feedback to improve future prompts

### For Administrators
1. **Monitor Usage**: Access the Analytics Dashboard
2. **Toggle Admin Mode**: View organization-wide statistics
3. **Export Reports**: Download usage data for compliance
4. **Review History**: Audit all prompt submissions and decisions

## 🔧 Configuration

### Environment Variables
The app uses Lovable's built-in secrets management:
- `VITE_OPENAI_API_KEY`: Your OpenAI API key for generating responses

### Rule Engine Configuration
Edit `src/utils/promptRules.ts` to customize:
- **Banned Keywords**: Modify the `BANNED_WORDS` array
- **Minimum Length**: Adjust `MIN_WORDS` constant
- **Custom Rules**: Add new validation logic

## 📊 Safety Rules

### Current Implementation
1. **Length Check**: Minimum 5 words required
2. **Content Filtering**: Blocks prompts containing:
   - Violence-related terms
   - Illegal activities
   - Harmful instructions
   - Inappropriate content

### Extensibility
The rule engine is designed for easy expansion:
- Add new rule functions
- Implement custom severity levels
- Integrate external safety APIs
- Create domain-specific filters

## 🏢 Real-World Applications

### Educational Institutions
- **Student Safety**: Prevent inappropriate AI interactions
- **Learning Quality**: Encourage well-structured questions
- **Usage Monitoring**: Track AI tool adoption and patterns

### Corporate Environments
- **Compliance**: Ensure AI usage aligns with company policies
- **Productivity**: Promote effective prompt engineering
- **Risk Management**: Identify and mitigate potential AI misuse

### AI Platform Integration
- **User Protection**: Pre-filter harmful requests
- **Quality Assurance**: Improve overall user experience
- **Resource Optimization**: Reduce processing of unclear prompts

## 🚀 Deployment

### Using Lovable
1. Click the "Publish" button in the Lovable interface
2. Configure your custom domain (Pro plan required)
3. Your app is live at `https://yourapp.lovable.app`

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy to your preferred platform
# (Vercel, Netlify, etc.)
```

## 🧪 Testing

### Sample Test Prompts

**Safe Prompts (ALLOW):**
```
- "Explain the water cycle in simple terms"
- "Help me write a professional email to my manager"
- "Create a recipe for chocolate chip cookies"
```

**Short Prompts (NEEDS_FIX):**
```
- "Help me"
- "Write code"
- "Explain this"
```

**Unsafe Prompts (BLOCK):**
```
- "How to make a bomb"
- "Ways to hack into systems"
- "Instructions for illegal activities"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is built with [Lovable](https://lovable.dev) - the fastest way to build AI-powered web applications.

## 🆘 Support

- **Documentation**: [Lovable Docs](https://docs.lovable.dev)
- **Community**: [Discord Server](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Issues**: Create an issue in this repository

---

**Built with ❤️ using [Lovable](https://lovable.dev)**