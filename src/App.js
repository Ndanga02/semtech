import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { Calendar, Book, Users, FileText, Bell, Settings, LogOut, Home, Award, MessageSquare, Video, Download, Upload, Clock, CheckCircle, AlertCircle, BarChart, User, Menu, X, ChevronRight, Plus, Edit, Trash2, Eye, Search, Filter, Star, Share2 } from 'lucide-react';

// Add this CSS injection for theme support
const themeStyles = `
  /* Light Theme */
  .light {
    --bg-primary: #ffffff;
    --bg-secondary: #f9fafb;
    --text-primary: #111827;
    --text-secondary: #6b7280;
    --border: #e5e7eb;
    --hover: #f3f4f6;
  }
  
  /* Dark Theme */
  .dark {
    --bg-primary: #1f2937;
    --bg-secondary: #111827;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --border: #374151;
    --hover: #374151;
  }
  
  .dark .bg-white {
    background-color: #1f2937 !important;
  }
  
  .dark .bg-gray-50 {
    background-color: #111827 !important;
  }
  
  .dark .text-gray-900 {
    color: #f9fafb !important;
  }
  
  .dark .text-gray-700 {
    color: #d1d5db !important;
  }
  
  .dark .text-gray-600 {
    color: #9ca3af !important;
  }
  
  .dark .border-gray-200 {
    border-color: #374151 !important;
  }
  
  .dark .border-gray-300 {
    border-color: #4b5563 !important;
  }
  
  .dark .hover\\:bg-gray-50:hover {
    background-color: #374151 !important;
  }
  
  .dark .hover\\:bg-gray-100:hover {
    background-color: #374151 !important;
  }
  
  /* Midnight Theme */
  .midnight {
    --bg-primary: #1a1a2e;
    --bg-secondary: #0f0f23;
    --text-primary: #eeeeff;
    --text-secondary: #a0a0c0;
    --border: #2a2a4e;
    --hover: #2a2a4e;
  }
  
  .midnight .bg-white {
    background-color: #1a1a2e !important;
  }
  
  .midnight .bg-gray-50 {
    background-color: #0f0f23 !important;
  }
  
  .midnight .text-gray-900 {
    color: #eeeeff !important;
  }
  
  .midnight .text-gray-700 {
    color: #c0c0e0 !important;
  }
  
  .midnight .text-gray-600 {
    color: #a0a0c0 !important;
  }
  
  .midnight .border-gray-200 {
    border-color: #2a2a4e !important;
  }
  
  .midnight .border-gray-300 {
    border-color: #3a3a5e !important;
  }
  
  .midnight .hover\\:bg-gray-50:hover {
    background-color: #2a2a4e !important;
  }
  
  .midnight .hover\\:bg-gray-100:hover {
    background-color: #2a2a4e !important;
  }
`;

// Inject styles
if (typeof document !== 'undefined' && !document.getElementById('theme-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'theme-styles';
  styleSheet.textContent = themeStyles;
  document.head.appendChild(styleSheet);
}

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

// Add this after your other contexts (after ThemeContext)
const AIAssistantContext = createContext();
const useAIAssistant = () => useContext(AIAssistantContext);

// Mock AI Service (in production, this would connect to your AI API)
class AIService {
  // Simulate AI responses with realistic delays
  static async askQuestion(question, context = {}) {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Mock responses based on keywords
    const responses = {
      'quantum mechanics': 'Quantum mechanics is the branch of physics that describes matter and energy at the atomic and subatomic level. Key concepts include wave-particle duality, uncertainty principle, and quantum superposition. From the recent lecture, we emphasized how particles can exist in multiple states simultaneously until observed.',
      'assignment': 'Your assignments should follow the standard academic format: introduction, body paragraphs with clear arguments, and conclusion. Remember to cite all sources using APA format. Each assignment should be 1000-1500 words unless otherwise specified.',
      'exam': 'The upcoming exam will cover chapters 1-5 of the textbook. Focus on understanding core concepts rather than memorization. Practice problems are available in the study guide section.',
      'default': 'I understand your question. Based on the course materials, here\'s what I can tell you: The topic you\'re asking about relates to fundamental concepts we\'ve covered in class. Would you like me to provide more specific information about any particular aspect?'
    };
    
    const lowerQuestion = question.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return { success: true, response, confidence: 0.85 + Math.random() * 0.15 };
      }
    }
    
    return { success: true, response: responses.default, confidence: 0.75 };
  }
  
  static async provideFeedback(text, assignmentType = 'essay') {
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Analyze text and provide feedback
    const wordCount = text.split(' ').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split('\n\n').filter(p => p.trim()).length;
    
    const feedback = {
      grammar: {
        score: 85 + Math.floor(Math.random() * 10),
        issues: [
          { type: 'spelling', count: Math.floor(Math.random() * 3), suggestion: 'Check spelling of technical terms' },
          { type: 'punctuation', count: Math.floor(Math.random() * 5), suggestion: 'Review comma usage in complex sentences' },
          { type: 'grammar', count: Math.floor(Math.random() * 4), suggestion: 'Ensure subject-verb agreement' }
        ]
      },
      structure: {
        score: 80 + Math.floor(Math.random() * 15),
        feedback: [
          'Good introduction that sets up your argument',
          'Consider adding more transition sentences between paragraphs',
          'Conclusion could be stronger - try restating your thesis more clearly'
        ]
      },
      content: {
        wordCount,
        sentences,
        paragraphs,
        readabilityScore: 70 + Math.floor(Math.random() * 20),
        suggestions: [
          'Add more supporting evidence for your main arguments',
          'Consider addressing potential counterarguments',
          'Good use of examples to illustrate your points'
        ]
      },
      overallScore: 75 + Math.floor(Math.random() * 20)
    };
    
    return { success: true, feedback };
  }
  
  static async generateQuiz(sourceText, options = {}) {
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    const { numQuestions = 5, difficulty = 'medium', questionTypes = ['multiple', 'truefalse', 'short'] } = options;
    
    const questions = [];
    const sampleQuestions = [
      {
        type: 'multiple',
        question: 'What is the primary focus of quantum mechanics?',
        options: [
          'Large-scale celestial bodies',
          'Atomic and subatomic particles',
          'Chemical reactions',
          'Biological processes'
        ],
        correct: 1,
        explanation: 'Quantum mechanics specifically deals with phenomena at the atomic and subatomic scale.'
      },
      {
        type: 'truefalse',
        question: 'The uncertainty principle states that we can simultaneously know both the exact position and momentum of a particle.',
        correct: false,
        explanation: 'The uncertainty principle actually states that we cannot simultaneously know both with perfect precision.'
      },
      {
        type: 'short',
        question: 'Briefly explain the concept of wave-particle duality.',
        sampleAnswer: 'Wave-particle duality is the concept that all matter and energy exhibits both wave-like and particle-like properties depending on the experimental context.',
        keywords: ['wave', 'particle', 'duality', 'properties', 'matter', 'energy']
      }
    ];
    
    // Generate requested number of questions
    for (let i = 0; i < numQuestions; i++) {
      const typeIndex = i % questionTypes.length;
      const baseQuestion = sampleQuestions[typeIndex % sampleQuestions.length];
      questions.push({
        ...baseQuestion,
        id: i + 1,
        difficulty,
        topic: 'Quantum Mechanics Basics'
      });
    }
    
    return { success: true, questions, metadata: { generated: new Date(), source: 'Course Material' } };
  }
}

// AI Teaching Assistant Component
function AITeachingAssistant() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      message: 'Hello! I\'m your AI Teaching Assistant. I can help you with course materials, answer questions, provide feedback on assignments, and generate practice quizzes. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [quizSource, setQuizSource] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizOptions, setQuizOptions] = useState({
    numQuestions: 5,
    difficulty: 'medium',
    questionTypes: ['multiple', 'truefalse', 'short']
  });
  
  const chatEndRef = useRef(null);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: currentMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);
    
    try {
      const response = await AIService.askQuestion(currentMessage);
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        message: response.response,
        confidence: response.confidence,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        message: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleAnalyzeAssignment = async () => {
    if (!assignmentText.trim()) return;
    
    setIsAnalyzing(true);
    setFeedback(null);
    
    try {
      const result = await AIService.provideFeedback(assignmentText);
      setFeedback(result.feedback);
    } catch (error) {
      alert('Error analyzing assignment. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleGenerateQuiz = async () => {
    if (!quizSource.trim()) return;
    
    setIsGenerating(true);
    setGeneratedQuiz(null);
    
    try {
      const result = await AIService.generateQuiz(quizSource, quizOptions);
      setGeneratedQuiz(result);
    } catch (error) {
      alert('Error generating quiz. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">AI Teaching Assistant</h1>
          <p className="text-gray-600 mt-1">Your 24/7 intelligent learning companion</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Questions Answered</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Assignments Reviewed</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <FileText className="w-8 h-8 text-green-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Quizzes Generated</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Edit className="w-8 h-8 text-purple-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Avg Response Time</p>
                <p className="text-2xl font-bold">1.2s</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'chat'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Q&A Chat</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'feedback'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Assignment Feedback</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'quiz'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Quiz Generator</span>
                </div>
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'chat' && (
              <AIChat
                messages={chatMessages}
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
                handleSendMessage={handleSendMessage}
                isTyping={isTyping}
                chatEndRef={chatEndRef}
              />
            )}
            
            {activeTab === 'feedback' && (
              <AIFeedback
                assignmentText={assignmentText}
                setAssignmentText={setAssignmentText}
                handleAnalyzeAssignment={handleAnalyzeAssignment}
                feedback={feedback}
                isAnalyzing={isAnalyzing}
              />
            )}
            
            {activeTab === 'quiz' && (
              <AIQuizGenerator
                quizSource={quizSource}
                setQuizSource={setQuizSource}
                quizOptions={quizOptions}
                setQuizOptions={setQuizOptions}
                handleGenerateQuiz={handleGenerateQuiz}
                generatedQuiz={generatedQuiz}
                isGenerating={isGenerating}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// AI Chat Component
function AIChat({ messages, currentMessage, setCurrentMessage, handleSendMessage, isTyping, chatEndRef }) {
  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-2xl ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`rounded-lg px-4 py-3 ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{msg.message}</p>
                {msg.confidence && (
                  <p className="text-xs mt-2 opacity-75">
                    Confidence: {Math.round(msg.confidence * 100)}%
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 px-1">
                {msg.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="border-t pt-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about your course..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isTyping}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        
        {/* Quick Questions */}
        <div className="mt-3">
          <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCurrentMessage('What topics will be on the exam?')}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
            >
              What's on the exam?
            </button>
            <button
              onClick={() => setCurrentMessage('Can you explain quantum mechanics?')}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
            >
              Explain quantum mechanics
            </button>
            <button
              onClick={() => setCurrentMessage('What are the assignment requirements?')}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
            >
              Assignment requirements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// AI Feedback Component
function AIFeedback({ assignmentText, setAssignmentText, handleAnalyzeAssignment, feedback, isAnalyzing }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Submit Your Assignment for AI Feedback</h3>
        <p className="text-sm text-gray-600">
          Get instant feedback on grammar, structure, and writing quality before final submission.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste or type your assignment
          </label>
          <textarea
            value={assignmentText}
            onChange={(e) => setAssignmentText(e.target.value)}
            placeholder="Enter your assignment text here..."
            className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-3 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Word count: {assignmentText.split(' ').filter(w => w).length}
            </p>
            <button
              onClick={handleAnalyzeAssignment}
              disabled={!assignmentText.trim() || isAnalyzing}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Analyze Assignment</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Feedback Section */}
        <div>
          {feedback ? (
            <div className="space-y-4">
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Overall Score</h4>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {feedback.overallScore}%
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${feedback.overallScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Grammar Analysis */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Grammar & Spelling</h4>
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="font-medium">{feedback.grammar.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${feedback.grammar.score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  {feedback.grammar.issues.map((issue, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{issue.type}</span>
                      <span className="text-red-600">{issue.count} issues</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Structure Analysis */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Structure & Organization</h4>
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="font-medium">{feedback.structure.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${feedback.structure.score}%` }}
                    ></div>
                  </div>
                </div>
                <ul className="space-y-1">
                  {feedback.structure.feedback.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Content Stats */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Content Analysis</h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Words</p>
                    <p className="text-lg font-semibold">{feedback.content.wordCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sentences</p>
                    <p className="text-lg font-semibold">{feedback.content.sentences}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Paragraphs</p>
                    <p className="text-lg font-semibold">{feedback.content.paragraphs}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Readability</p>
                    <p className="text-lg font-semibold">{feedback.content.readabilityScore}%</p>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Suggestions:</p>
                  <ul className="space-y-1">
                    {feedback.content.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Submit your assignment to receive AI feedback</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// AI Quiz Generator Component
function AIQuizGenerator({ quizSource, setQuizSource, quizOptions, setQuizOptions, handleGenerateQuiz, generatedQuiz, setGeneratedQuiz, isGenerating }) {
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  const handleAnswer = (questionId, answer) => {
    setCurrentAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const calculateScore = () => {
    if (!generatedQuiz) return 0;
    let correct = 0;
    generatedQuiz.questions.forEach(q => {
      if (q.type === 'multiple' || q.type === 'truefalse') {
        if (currentAnswers[q.id] === q.correct) correct++;
      }
    });
    return (correct / generatedQuiz.questions.length) * 100;
  };
  
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">AI Quiz Generator</h3>
        <p className="text-sm text-gray-600">
          Provide any text source and let AI generate practice questions automatically.
        </p>
      </div>
      
      {!generatedQuiz ? (
        <div className="space-y-6">
          {/* Source Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source Material
            </label>
            <textarea
              value={quizSource}
              onChange={(e) => setQuizSource(e.target.value)}
              placeholder="Paste your study material, lecture notes, or any text you want to generate questions from..."
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Quiz Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <select
                value={quizOptions.numQuestions}
                onChange={(e) => setQuizOptions({ ...quizOptions, numQuestions: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={quizOptions.difficulty}
                onChange={(e) => setQuizOptions({ ...quizOptions, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Types
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={quizOptions.questionTypes.includes('multiple')}
                    onChange={(e) => {
                      const types = e.target.checked? [...quizOptions.questionTypes, 'multiple']
                       : quizOptions.questionTypes.filter(t => t !== 'multiple');
                     setQuizOptions({ ...quizOptions, questionTypes: types });
                   }}
                   className="mr-2"
                 />
                 <span className="text-sm">Multiple Choice</span>
               </label>
               <label className="flex items-center">
                 <input
                   type="checkbox"
                   checked={quizOptions.questionTypes.includes('truefalse')}
                   onChange={(e) => {
                     const types = e.target.checked
                       ? [...quizOptions.questionTypes, 'truefalse']
                       : quizOptions.questionTypes.filter(t => t !== 'truefalse');
                     setQuizOptions({ ...quizOptions, questionTypes: types });
                   }}
                   className="mr-2"
                 />
                 <span className="text-sm">True/False</span>
               </label>
               <label className="flex items-center">
                 <input
                   type="checkbox"
                   checked={quizOptions.questionTypes.includes('short')}
                   onChange={(e) => {
                     const types = e.target.checked
                       ? [...quizOptions.questionTypes, 'short']
                       : quizOptions.questionTypes.filter(t => t !== 'short');
                     setQuizOptions({ ...quizOptions, questionTypes: types });
                   }}
                   className="mr-2"
                 />
                 <span className="text-sm">Short Answer</span>
               </label>
             </div>
           </div>
         </div>
         
         {/* Generate Button */}
         <div className="flex justify-center">
           <button
             onClick={handleGenerateQuiz}
             disabled={!quizSource.trim() || isGenerating || quizOptions.questionTypes.length === 0}
             className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
           >
             {isGenerating ? (
               <>
                 <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                 <span>Generating Quiz...</span>
               </>
             ) : (
               <>
                 <Edit className="w-5 h-5" />
                 <span>Generate Quiz</span>
               </>
             )}
           </button>
         </div>
       </div>
     ) : (
       <div className="space-y-6">
         {/* Quiz Header */}
         <div className="bg-purple-50 rounded-lg p-4">
           <div className="flex justify-between items-center">
             <div>
               <h4 className="font-semibold text-lg">Generated Quiz</h4>
               <p className="text-sm text-gray-600 mt-1">
                 {generatedQuiz.questions.length} questions • {quizOptions.difficulty} difficulty
               </p>
             </div>
             <button
               onClick={() => {
                 setGeneratedQuiz(null);
                 setCurrentAnswers({});
                 setShowResults(false);
               }}
               className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
             >
               Generate New Quiz
             </button>
           </div>
         </div>
         
         {/* Questions */}
         <div className="space-y-6">
           {generatedQuiz.questions.map((question, idx) => (
             <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-6">
               <div className="mb-4">
                 <div className="flex items-start justify-between mb-2">
                   <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                     Question {idx + 1}
                   </span>
                   <span className="text-xs text-gray-500">{question.type}</span>
                 </div>
                 <p className="font-medium text-gray-900">{question.question}</p>
               </div>
               
               {question.type === 'multiple' && (
                 <div className="space-y-2">
                   {question.options.map((option, optIdx) => (
                     <label key={optIdx} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                       <input
                         type="radio"
                         name={`question-${question.id}`}
                         value={optIdx}
                         checked={currentAnswers[question.id] === optIdx}
                         onChange={() => handleAnswer(question.id, optIdx)}
                         className="mr-3"
                       />
                       <span className="text-sm">{option}</span>
                     </label>
                   ))}
                 </div>
               )}
               
               {question.type === 'truefalse' && (
                 <div className="flex space-x-4">
                   <label className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer flex-1">
                     <input
                       type="radio"
                       name={`question-${question.id}`}
                       value={true}
                       checked={currentAnswers[question.id] === true}
                       onChange={() => handleAnswer(question.id, true)}
                       className="mr-3"
                     />
                     <span className="text-sm">True</span>
                   </label>
                   <label className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer flex-1">
                     <input
                       type="radio"
                       name={`question-${question.id}`}
                       value={false}
                       checked={currentAnswers[question.id] === false}
                       onChange={() => handleAnswer(question.id, false)}
                       className="mr-3"
                     />
                     <span className="text-sm">False</span>
                   </label>
                 </div>
               )}
               
               {question.type === 'short' && (
                 <div>
                   <textarea
                     value={currentAnswers[question.id] || ''}
                     onChange={(e) => handleAnswer(question.id, e.target.value)}
                     placeholder="Type your answer here..."
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none h-24"
                   />
                   {showResults && (
                     <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                       <p className="text-sm font-medium text-blue-900 mb-1">Sample Answer:</p>
                       <p className="text-sm text-blue-700">{question.sampleAnswer}</p>
                     </div>
                   )}
                 </div>
               )}
               
               {showResults && (question.type === 'multiple' || question.type === 'truefalse') && (
                 <div className={`mt-4 p-3 rounded-lg ${
                   currentAnswers[question.id] === question.correct
                     ? 'bg-green-50 border border-green-200'
                     : 'bg-red-50 border border-red-200'
                 }`}>
                   <div className="flex items-start space-x-2">
                     {currentAnswers[question.id] === question.correct ? (
                       <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                     ) : (
                       <X className="w-5 h-5 text-red-600 mt-0.5" />
                     )}
                     <div>
                       <p className={`text-sm font-medium ${
                         currentAnswers[question.id] === question.correct
                           ? 'text-green-800'
                           : 'text-red-800'
                       }`}>
                         {currentAnswers[question.id] === question.correct ? 'Correct!' : 'Incorrect'}
                       </p>
                       <p className="text-sm text-gray-700 mt-1">{question.explanation}</p>
                     </div>
                   </div>
                 </div>
               )}
             </div>
           ))}
         </div>
         
         {/* Submit/Results */}
         <div className="flex justify-center">
           {!showResults ? (
             <button
               onClick={() => setShowResults(true)}
               className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
             >
               Submit Quiz
             </button>
           ) : (
             <div className="w-full max-w-md">
               <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center">
                 <h4 className="text-xl font-semibold mb-2">Quiz Results</h4>
                 <div className="text-4xl font-bold text-blue-600 mb-2">
                   {calculateScore().toFixed(0)}%
                 </div>
                 <p className="text-gray-600">
                   You got {Math.round(calculateScore() * generatedQuiz.questions.length / 100)} out of {generatedQuiz.questions.length} questions correct
                 </p>
                 <button
                   onClick={() => {
                     setCurrentAnswers({});
                     setShowResults(false);
                   }}
                   className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                 >
                   Retake Quiz
                 </button>
               </div>
             </div>
           )}
         </div>
       </div>
     )}
   </div>
 );
}
// Auth Context
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// Main App Component with Theme Support
export default function LMS() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to 'light'
    return localStorage.getItem('lms-theme') || 'light';
  });

  useEffect(() => {
    // Simulate logged in user
    setUser({
      id: 1,
      name: 'Sarah Johnson',
      role: 'student',
      email: 'sarah.j@university.edu',
      avatar: null
    });
  }, []);

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.className = theme;
    localStorage.setItem('lms-theme', theme);
    
    // Apply theme colors
    if (theme === 'dark') {
      document.documentElement.style.backgroundColor = '#111827';
    } else if (theme === 'midnight') {
      document.documentElement.style.backgroundColor = '#0f0f23';
    } else {
      document.documentElement.style.backgroundColor = '#f9fafb';
    }
  }, [theme]);

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard />;
       case 'profile':
  return <ProfileView onNavigate={handleNavigate} />;
      case 'ai-assistant':  // ADD THIS
      return <AITeachingAssistant />;  // ADD THIS    
  case 'certificates':
        return <CertificatesView />;
      case 'courses':
        return <CoursesManagement />;
      case 'assignments':
        return <AssignmentsView />;
      case 'grades':
        return <GradesView />;
      case 'calendar':
        return <CalendarView />;
      case 'discussions':
        return <DiscussionsView />;
      case 'gradebook':
        return <GradebookView />;
      case 'students':
        return <StudentsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`min-h-screen transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-900' : 
          theme === 'midnight' ? 'bg-[#0f0f23]' : 
          'bg-gray-50'
        }`}>
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onNavigate={handleNavigate} />
          <div className="flex">
            <Sidebar open={sidebarOpen} onNavigate={handleNavigate} />
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
              {renderContent()}
            </main>
          </div>
        </div>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
// Login Page
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({
      id: 1,
      name: role === 'instructor' ? 'Dr. Smith' : role === 'admin' ? 'Admin User' : 'Sarah Johnson',
      role: role,
      email: email || 'user@university.edu',
      avatar: null
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Book className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome to EduHub</h2>
          <p className="text-gray-600 mt-2">Modern Learning Management System</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@university.edu"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Login as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Demo Mode: Click Sign In with any credentials
        </p>
      </div>
    </div>
  );
}

// Navbar Component
function Navbar({ sidebarOpen, setSidebarOpen, onNavigate }) {
  const { user, setUser } = useAuth();
  const notificationSystem = NotificationCenter(); // Add this line
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Update the notifications count
  const notifications = notificationSystem.unreadCount;

  const handleLogout = () => {
    setUser(null);
    setShowProfile(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="ml-4 flex items-center">
              <Book className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduHub</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <NotificationItem
                      icon={<FileText className="w-4 h-4" />}
                      title="New Assignment Posted"
                      desc="CS101: Project 3 is now available"
                      time="2 hours ago"
                    />
                    <NotificationItem
                      icon={<MessageSquare className="w-4 h-4" />}
                      title="Discussion Reply"
                      desc="Someone replied to your post"
                      time="5 hours ago"
                    />
                    <NotificationItem
                      icon={<Award className="w-4 h-4" />}
                      title="Grade Posted"
                      desc="Your midterm exam has been graded"
                      time="1 day ago"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </button>
              
              {showProfile && (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
    <button 
      onClick={() => {
        onNavigate('profile');
        setShowProfile(false);
      }}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <User className="w-4 h-4 inline mr-2" />
      Profile
    </button>
    <button 
      onClick={() => {
        onNavigate('settings');
        setShowProfile(false);
      }}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <Settings className="w-4 h-4 inline mr-2" />
      Settings
    </button>
    <hr className="my-1" />
    <button 
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <LogOut className="w-4 h-4 inline mr-2" />
      Logout
    </button>
  </div>
)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Notification Item
function NotificationItem({ icon, title, desc, time }) {
  return (
    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-start">
        <div className="bg-blue-100 p-2 rounded-full">
          {icon}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-600">{desc}</p>
          <p className="text-xs text-gray-400 mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar({ open, onNavigate }) {
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState('dashboard');
  
const studentMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'courses', label: 'My Courses', icon: Book },
  { id: 'assignments', label: 'Assignments', icon: FileText },
  { id: 'grades', label: 'Grades', icon: Award },
  { id: 'ai-assistant', label: 'AI Assistant', icon: MessageSquare },  // ADD THIS
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'discussions', label: 'Discussions', icon: MessageSquare },
];

  
  const instructorMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'My Courses', icon: Book },
    { id: 'gradebook', label: 'Gradebook', icon: BarChart },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
  ];

  const adminMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'courses', label: 'Course Management', icon: Book },
    { id: 'reports', label: 'Reports', icon: BarChart },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];
  
  const getMenu = () => {
    switch (user?.role) {
      case 'instructor':
        return instructorMenu;
      case 'admin':
        return adminMenu;
      default:
        return studentMenu;
    }
  };
  
  const menu = getMenu();
  
  return (
    <div className={`fixed left-0 top-16 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
      open ? 'w-64' : 'w-0 overflow-hidden'
    }`}>
      <nav className="p-4 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                onNavigate(item.id);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeItem === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}



// Dashboard Component
// AI Assistant Quick Access Widget
function AIAssistantWidget({ onNavigate }) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">AI Teaching Assistant</h3>
          <p className="text-purple-100 mb-4">
            Get instant help with your coursework, 24/7
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Answer course questions instantly</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Get feedback on assignments</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Generate practice quizzes</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('ai-assistant')}
            className="mt-4 px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            Start Chatting
          </button>
        </div>
        <div className="bg-white/20 p-3 rounded-lg">
          <MessageSquare className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
function Dashboard() {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  
  
  const courses = [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Computer Science',
      instructor: 'Dr. Smith',
      progress: 75,
      nextDeadline: 'Assignment 3 - Due Tomorrow',
      students: 45,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      code: 'MATH201',
      name: 'Calculus II',
      instructor: 'Prof. Johnson',
      progress: 60,
      nextDeadline: 'Quiz 5 - Due in 3 days',
      students: 38,
      color: 'bg-green-500'
    },
    {
      id: 3,
      code: 'ENG102',
      name: 'Academic Writing',
      instructor: 'Dr. Williams',
      progress: 85,
      nextDeadline: 'Essay Draft - Due in 5 days',
      students: 32,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      code: 'PHY301',
      name: 'Quantum Mechanics',
      instructor: 'Prof. Chen',
      progress: 40,
      nextDeadline: 'Lab Report - Due in 1 week',
      students: 28,
      color: 'bg-orange-500'
    }
  ];
  
  const upcomingTasks = [
    { id: 1, title: 'CS101 Assignment 3', due: 'Tomorrow, 11:59 PM', type: 'assignment', status: 'pending' },
    { id: 2, title: 'MATH201 Quiz 5', due: 'Oct 25, 3:00 PM', type: 'quiz', status: 'pending' },
    { id: 3, title: 'ENG102 Essay Draft', due: 'Oct 27, 11:59 PM', type: 'assignment', status: 'in-progress' },
    { id: 4, title: 'PHY301 Lab Report', due: 'Oct 30, 5:00 PM', type: 'lab', status: 'not-started' },
  ];
  
  const announcements = [
    { id: 1, course: 'CS101', title: 'Office Hours Changed', time: '2 hours ago', priority: 'high' },
    { id: 2, course: 'MATH201', title: 'Extra Practice Problems Posted', time: '5 hours ago', priority: 'normal' },
    { id: 3, course: 'All Courses', title: 'University Holiday - Nov 1', time: '1 day ago', priority: 'high' },
  ];

  if (selectedCourse) {
    return <CourseView course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }
  
  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Book className="w-6 h-6" />}
          label="Active Courses"
          value={courses.length}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          label="Pending Tasks"
          value={upcomingTasks.filter(t => t.status === 'pending').length}
          color="bg-orange-500"
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          label="Average Grade"
          value="A-"
          color="bg-green-500"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          label="Study Hours"
          value="24.5"
          color="bg-purple-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">My Courses</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}`}>
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  viewMode={viewMode}
                  onClick={() => setSelectedCourse(course)}
                  isInstructor={user?.role === 'instructor'}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            </div>
            <div className="p-4 space-y-3">
              {upcomingTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
              <button className="w-full text-blue-600 text-sm font-medium hover:text-blue-700">
                View All Tasks →
              </button>
            </div>
          </div>
          
          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Announcements</h2>
            </div>
            <div className="p-4 space-y-3">
              {announcements.map((announcement) => (
                <AnnouncementItem key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`${color} bg-opacity-10 p-3 rounded-lg`}>
          <div className={`${color} bg-opacity-100 text-white rounded`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course, viewMode, onClick, isInstructor }) {
  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-2 h-12 ${course.color} rounded-full`}></div>
          <div>
            <h3 className="font-semibold text-gray-900">{course.code} - {course.name}</h3>
            <p className="text-sm text-gray-600">
              {isInstructor ? `${course.students} students` : course.instructor}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    );
  }
  
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`${course.color} text-white px-3 py-1 rounded-lg text-sm font-semibold`}>
          {course.code}
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Star className="w-4 h-4" />
        </button>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
      <p className="text-sm text-gray-600 mb-3">
        {isInstructor ? `${course.students} students` : course.instructor}
      </p>
      
      {!isInstructor && (
        <>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${course.color} h-2 rounded-full transition-all`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.nextDeadline}</span>
          </div>
        </>
      )}
    </div>
  );
}

// Task Item Component
function TaskItem({ task }) {
  const statusColors = {
    'pending': 'text-orange-600 bg-orange-50',
    'in-progress': 'text-blue-600 bg-blue-50',
    'not-started': 'text-gray-600 bg-gray-50'
  };
  
  const typeIcons = {
    'assignment': <FileText className="w-4 h-4" />,
    'quiz': <Edit className="w-4 h-4" />,
    'lab': <Users className="w-4 h-4" />
  };
  
  return (
    <div className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer">
      <div className="bg-gray-100 p-2 rounded">
        {typeIcons[task.type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{task.title}</p>
        <p className="text-xs text-gray-600">{task.due}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
        {task.status.replace('-', ' ')}
      </span>
    </div>
  );
}

// Announcement Item Component
function AnnouncementItem({ announcement }) {
  return (
    <div className="p-2 rounded hover:bg-gray-50 cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-500">{announcement.course}</span>
            {announcement.priority === 'high' && (
              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full">Important</span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-900 mt-1">{announcement.title}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{announcement.time}</p>
    </div>
  );
}

// Course View Component
function CourseView({ course, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'content', label: 'Content', icon: Book },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'grades', label: 'Grades', icon: Award },
    { id: 'people', label: 'People', icon: Users },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className={`${course.color} text-white`}>
        <div className="p-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-4"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{course.code}: {course.name}</h1>
              <p className="text-white/80 mt-2">{course.instructor}</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Video className="w-4 h-4" />
                <span>Join Class</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 px-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-white text-white'
                    : 'border-transparent text-white/70 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && <CourseOverview course={course} />}
        {activeTab === 'content' && <CourseContent />}
        {activeTab === 'assignments' && <AssignmentsTab isInstructor={user?.role === 'instructor'} />}
        {activeTab === 'discussions' && <DiscussionsTab />}
        {activeTab === 'grades' && <GradesTab isInstructor={user?.role === 'instructor'} />}
        {activeTab === 'people' && <PeopleTab />}
      </div>
    </div>
  );
}

// Course Overview Component
function CourseOverview({ course }) {
  const recentActivity = [
    { type: 'assignment', title: 'Project 3 Posted', time: '2 hours ago' },
    { type: 'grade', title: 'Midterm Exam Graded', time: '1 day ago' },
    { type: 'discussion', title: 'New Discussion: Final Project Ideas', time: '2 days ago' },
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Course Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Course Information</h2>
          <div className="prose max-w-none text-gray-600">
            <p>Welcome to {course.name}! This course provides a comprehensive introduction to fundamental concepts in computer science, including programming, algorithms, data structures, and computational thinking.</p>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Learning Objectives</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Understand basic programming concepts and syntax</li>
              <li>Develop problem-solving skills using computational thinking</li>
              <li>Learn fundamental data structures and algorithms</li>
              <li>Build practical projects to reinforce learning</li>
            </ul>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'grade' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'assignment' ? <FileText className="w-4 h-4" /> :
                   activity.type === 'grade' ? <Award className="w-4 h-4" /> :
                   <MessageSquare className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Course Schedule */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Schedule</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Lectures</p>
                <p className="text-sm text-gray-600">Mon, Wed, Fri - 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Lab Sessions</p>
                <p className="text-sm text-gray-600">Tuesday - 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Office Hours</p>
                <p className="text-sm text-gray-600">Thursday - 3:00-5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <div className="space-y-2">
            <a href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Download className="w-4 h-4" />
              <span className="text-sm">Syllabus</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Book className="w-4 h-4" />
              <span className="text-sm">Textbook Resources</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Video className="w-4 h-4" />
              <span className="text-sm">Recorded Lectures</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Course Content Component
function CourseContent() {
  const modules = [
    {
      id: 1,
      title: 'Module 1: Introduction to Programming',
      items: [
        { type: 'video', title: 'Welcome to CS101', duration: '15:30' },
        { type: 'reading', title: 'Chapter 1: Getting Started', pages: '1-25' },
        { type: 'assignment', title: 'Hello World Program', due: 'Completed' },
      ]
    },
    {
      id: 2,
      title: 'Module 2: Variables and Data Types',
      items: [
        { type: 'video', title: 'Understanding Variables', duration: '22:15' },
        { type: 'reading', title: 'Chapter 2: Data Types', pages: '26-54' },
        { type: 'quiz', title: 'Quiz: Variables and Types', questions: 10 },
      ]
    },
    {
      id: 3,
      title: 'Module 3: Control Structures',
      items: [
        { type: 'video', title: 'If Statements and Loops', duration: '28:45' },
        { type: 'reading', title: 'Chapter 3: Control Flow', pages: '55-89' },
        { type: 'assignment', title: 'Project: Calculator', due: 'Oct 28' },
      ]
    },
  ];
  
  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg">{module.title}</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {module.items.map((item, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {item.type === 'video' && <Video className="w-5 h-5 text-blue-600" />}
                    {item.type === 'reading' && <Book className="w-5 h-5 text-green-600" />}
                    {item.type === 'assignment' && <FileText className="w-5 h-5 text-orange-600" />}
                    {item.type === 'quiz' && <Edit className="w-5 h-5 text-purple-600" />}
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        {item.duration || item.pages || item.due || `${item.questions} questions`}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Assignments Tab Component
function AssignmentsTab({ isInstructor }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const assignments = [
    {
      id: 1,
      title: 'Project 1: Hello World',
      due: 'Oct 15, 2024',
      status: 'submitted',
      grade: '95/100',
      submissions: 42,
      type: 'project'
    },
    {
      id: 2,
      title: 'Assignment 2: Variables Practice',
      due: 'Oct 20, 2024',
      status: 'submitted',
      grade: '88/100',
      submissions: 44,
      type: 'homework'
    },
    {
      id: 3,
      title: 'Project 3: Calculator Application',
      due: 'Oct 28, 2024',
      status: 'pending',
      grade: null,
      submissions: 12,
      type: 'project'
    },
    {
      id: 4,
      title: 'Midterm Exam',
      due: 'Nov 5, 2024',
      status: 'upcoming',
      grade: null,
      submissions: 0,
      type: 'exam'
    },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assignments</h2>
        {isInstructor && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    assignment.type === 'project' ? 'bg-blue-100' :
                    assignment.type === 'exam' ? 'bg-red-100' :
                    'bg-green-100'
                  }`}>
                    {assignment.type === 'exam' ? <Edit className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                    <p className="text-sm text-gray-600">Due: {assignment.due}</p>
                    {isInstructor && (
                      <p className="text-sm text-gray-600">{assignment.submissions}/45 submitted</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {!isInstructor && (
                    <>
                      {assignment.status === 'submitted' && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Submitted
                        </span>
                      )}
                      {assignment.status === 'pending' && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                          In Progress
                        </span>
                      )}
                      {assignment.status === 'upcoming' && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          Upcoming
                        </span>
                      )}
                      {assignment.grade && (
                        <span className="font-semibold text-gray-900">{assignment.grade}</span>
                      )}
                    </>
                  )}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    {isInstructor ? 'View Submissions' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showCreateModal && (
        <CreateAssignmentModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

// Create Assignment Modal
function CreateAssignmentModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    instructions: '',
    dueDate: '',
    points: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Creating assignment:', formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Assignment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <textarea 
              rows="4" 
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input 
                type="datetime-local" 
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
              <input 
                type="number" 
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Discussions Tab Component
function DiscussionsTab() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const discussions = [
    {
      id: 1,
      title: 'Questions about Project 3',
      author: 'John Doe',
      replies: 12,
      lastActivity: '2 hours ago',
      pinned: true
    },
    {
      id: 2,
      title: 'Study Group for Midterm',
      author: 'Jane Smith',
      replies: 8,
      lastActivity: '5 hours ago',
      pinned: false
    },
    {
      id: 3,
      title: 'Clarification on Variable Scope',
      author: 'Mike Johnson',
      replies: 5,
      lastActivity: '1 day ago',
      pinned: false
    },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Discussions</h2>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <button className="text-blue-600 font-medium">All Discussions</button>
            <button className="text-gray-600 hover:text-gray-900">Pinned</button>
            <button className="text-gray-600 hover:text-gray-900">My Posts</button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {discussion.pinned && (
                    <div className="mt-1">
                      <div className="bg-blue-100 p-1 rounded">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16a1 1 0 11-2 0V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Started by {discussion.author} • {discussion.replies} replies • Last activity {discussion.lastActivity}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <CreateDiscussionModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

// Create Discussion Modal
function CreateDiscussionModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating discussion:', formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Start New Discussion</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea 
              rows="6" 
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Post Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Grades Tab Component - continues...
function GradesTab({ isInstructor }) {
 const grades = [
   { assignment: 'Project 1: Hello World', score: 95, total: 100, weight: '10%' },
   { assignment: 'Assignment 2: Variables', score: 88, total: 100, weight: '5%' },
   { assignment: 'Quiz 1', score: 18, total: 20, weight: '5%' },
   { assignment: 'Midterm Exam', score: null, total: 100, weight: '25%' },
 ];
 
 const students = [
   { name: 'John Doe', id: 'JD001', average: 92, submissions: 8 },
   { name: 'Jane Smith', id: 'JS002', average: 88, submissions: 7 },
   { name: 'Mike Johnson', id: 'MJ003', average: 95, submissions: 8 },
   { name: 'Sarah Williams', id: 'SW004', average: 85, submissions: 6 },
 ];
 
 if (isInstructor) {
   return (
     <div>
       <h2 className="text-2xl font-bold mb-6">Gradebook</h2>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead className="bg-gray-50 border-b border-gray-200">
               <tr>
                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Student</th>
                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Average</th>
                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Submissions</th>
                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-200">
               {students.map((student) => (
                 <tr key={student.id} className="hover:bg-gray-50">
                   <td className="px-4 py-3 text-sm text-gray-900">{student.name}</td>
                   <td className="px-4 py-3 text-sm text-gray-600">{student.id}</td>
                   <td className="px-4 py-3 text-sm">
                     <span className={`font-semibold ${
                       student.average >= 90 ? 'text-green-600' :
                       student.average >= 80 ? 'text-blue-600' :
                       'text-orange-600'
                     }`}>
                       {student.average}%
                     </span>
                   </td>
                   <td className="px-4 py-3 text-sm text-gray-600">{student.submissions}/8</td>
                   <td className="px-4 py-3 text-sm">
                     <button className="text-blue-600 hover:text-blue-700">View Details</button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     </div>
   );
 }
 
 return (
   <div>
     <h2 className="text-2xl font-bold mb-6">My Grades</h2>
     
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Current Grade</p>
         <p className="text-3xl font-bold text-green-600 mt-1">A-</p>
         <p className="text-sm text-gray-600 mt-1">90.3%</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Assignments Completed</p>
         <p className="text-3xl font-bold text-blue-600 mt-1">3/4</p>
         <p className="text-sm text-gray-600 mt-1">75% completion</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Class Rank</p>
         <p className="text-3xl font-bold text-purple-600 mt-1">5/45</p>
         <p className="text-sm text-gray-600 mt-1">Top 11%</p>
       </div>
     </div>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="p-4 border-b border-gray-200">
         <h3 className="font-semibold">Grade Breakdown</h3>
       </div>
       <div className="divide-y divide-gray-200">
         {grades.map((grade, index) => (
           <div key={index} className="p-4">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium text-gray-900">{grade.assignment}</p>
                 <p className="text-sm text-gray-600">Weight: {grade.weight}</p>
               </div>
               <div className="text-right">
                 {grade.score !== null ? (
                   <>
                     <p className="font-semibold text-gray-900">{grade.score}/{grade.total}</p>
                     <p className="text-sm text-gray-600">{((grade.score/grade.total) * 100).toFixed(1)}%</p>
                   </>
                 ) : (
                   <p className="text-gray-400">Not graded</p>
                 )}
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}

// People Tab Component
function PeopleTab() {
 const instructors = [
   { name: 'Dr. Robert Smith', role: 'Professor', email: 'r.smith@university.edu' },
   { name: 'Sarah Johnson', role: 'Teaching Assistant', email: 's.johnson@university.edu' },
 ];
 
 const students = [
   { name: 'Alice Anderson', email: 'a.anderson@university.edu', status: 'online' },
   { name: 'Bob Brown', email: 'b.brown@university.edu', status: 'offline' },
   { name: 'Charlie Chen', email: 'c.chen@university.edu', status: 'online' },
   { name: 'Diana Davis', email: 'd.davis@university.edu', status: 'offline' },
   { name: 'Eric Evans', email: 'e.evans@university.edu', status: 'online' },
 ];
 
 return (
   <div>
     <div className="flex justify-between items-center mb-6">
       <h2 className="text-2xl font-bold">People</h2>
       <div className="flex items-center space-x-2">
         <Search className="w-5 h-5 text-gray-400" />
         <input
           type="text"
           placeholder="Search people..."
           className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
         />
       </div>
     </div>
     
     {/* Instructors */}
     <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
       <div className="p-4 border-b border-gray-200">
         <h3 className="font-semibold">Instructors</h3>
       </div>
       <div className="divide-y divide-gray-200">
         {instructors.map((instructor, index) => (
           <div key={index} className="p-4">
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                   <User className="w-6 h-6 text-white" />
                 </div>
                 <div>
                   <p className="font-medium text-gray-900">{instructor.name}</p>
                   <p className="text-sm text-gray-600">{instructor.role} • {instructor.email}</p>
                 </div>
               </div>
               <button className="text-blue-600 hover:text-blue-700">
                 <MessageSquare className="w-5 h-5" />
               </button>
             </div>
           </div>
         ))}
       </div>
     </div>
     
     {/* Students */}
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="p-4 border-b border-gray-200">
         <h3 className="font-semibold">Students ({students.length})</h3>
       </div>
       <div className="divide-y divide-gray-200">
         {students.map((student, index) => (
           <div key={index} className="p-4">
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <div className="relative">
                   <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                     <User className="w-6 h-6 text-white" />
                   </div>
                   {student.status === 'online' && (
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                   )}
                 </div>
                 <div>
                   <p className="font-medium text-gray-900">{student.name}</p>
                   <p className="text-sm text-gray-600">{student.email}</p>
                 </div>
               </div>
               <button className="text-blue-600 hover:text-blue-700">
                 <MessageSquare className="w-5 h-5" />
               </button>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}

// Enhanced Dashboard with dynamic state management
function EnhancedDashboard() {
 const { user } = useAuth();
 const [courses, setCourses] = useState([
   {
     id: 1,
     code: 'CS101',
     name: 'Introduction to Computer Science',
     instructor: 'Dr. Smith',
     progress: 75,
     nextDeadline: 'Assignment 3 - Due Tomorrow',
     students: 45,
     color: 'bg-blue-500',
     announcements: [
       { id: 1, title: 'Office Hours Changed', content: 'Office hours moved to Thursday 4-6 PM', date: new Date() }
     ]
   },
   // ... other courses
 ]);
 
 const [assignments, setAssignments] = useState([
   {
     id: 1,
     courseId: 1,
     title: 'Project 1: Hello World',
     description: 'Create your first program',
     dueDate: '2024-10-28',
     points: 100,
     submissions: [],
     type: 'project'
   }
 ]);
 
 const [discussions, setDiscussions] = useState([
   {
     id: 1,
     courseId: 1,
     title: 'Questions about Project 3',
     content: 'I need help with the calculator logic',
     author: user?.name || 'Anonymous',
     authorId: user?.id,
     replies: [],
     createdAt: new Date(),
     pinned: false
   }
 ]);

 const addAssignment = (newAssignment) => {
   setAssignments(prev => [...prev, {
     ...newAssignment,
     id: Date.now(),
     submissions: []
   }]);
 };

 const addDiscussion = (newDiscussion) => {
   setDiscussions(prev => [...prev, {
     ...newDiscussion,
     id: Date.now(),
     author: user?.name || 'Anonymous',
     authorId: user?.id,
     replies: [],
     createdAt: new Date(),
     pinned: false
   }]);
 };

 const submitAssignment = (assignmentId, submission) => {
   setAssignments(prev => prev.map(assignment => 
     assignment.id === assignmentId 
       ? {
           ...assignment,
           submissions: [...assignment.submissions, {
             id: Date.now(),
             studentId: user?.id,
             studentName: user?.name,
             content: submission,
             submittedAt: new Date(),
             grade: null
           }]
         }
       : assignment
   ));
 };

 return {
   courses,
   assignments,
   discussions,
   addAssignment,
   addDiscussion,
   submitAssignment,
   setCourses,
   setAssignments,
   setDiscussions
 };
}

// File Upload Component
function FileUpload({ onFileUpload, acceptedTypes = ".pdf,.doc,.docx,.txt", multiple = false }) {
 const [dragActive, setDragActive] = useState(false);
 const [uploadedFiles, setUploadedFiles] = useState([]);

 const handleDrag = (e) => {
   e.preventDefault();
   e.stopPropagation();
   if (e.type === "dragenter" || e.type === "dragover") {
     setDragActive(true);
   } else if (e.type === "dragleave") {
     setDragActive(false);
   }
 };

 const handleDrop = (e) => {
   e.preventDefault();
   e.stopPropagation();
   setDragActive(false);
   
   const files = Array.from(e.dataTransfer.files);
   handleFiles(files);
 };

 const handleChange = (e) => {
   const files = Array.from(e.target.files);
   handleFiles(files);
 };

 const handleFiles = (files) => {
   const newFiles = files.map(file => ({
     id: Date.now() + Math.random(),
     name: file.name,
     size: file.size,
     type: file.type,
     file: file
   }));
   
   setUploadedFiles(prev => multiple ? [...prev, ...newFiles] : newFiles);
   onFileUpload(newFiles);
 };

 const removeFile = (fileId) => {
   setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
 };

 return (
   <div className="space-y-4">
     <div
       className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
         dragActive 
           ? 'border-blue-500 bg-blue-50' 
           : 'border-gray-300 hover:border-gray-400'
       }`}
       onDragEnter={handleDrag}
       onDragLeave={handleDrag}
       onDragOver={handleDrag}
       onDrop={handleDrop}
     >
       <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
       <p className="text-sm text-gray-600 mb-2">
         Drag and drop files here, or{' '}
         <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
           browse
           <input
             type="file"
             multiple={multiple}
             accept={acceptedTypes}
             onChange={handleChange}
             className="hidden"
           />
         </label>
       </p>
       <p className="text-xs text-gray-500">
         Supported formats: {acceptedTypes.replace(/\./g, '').toUpperCase()}
       </p>
     </div>

     {uploadedFiles.length > 0 && (
       <div className="space-y-2">
         <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
         {uploadedFiles.map(file => (
           <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
             <div className="flex items-center space-x-2">
               <FileText className="w-4 h-4 text-gray-500" />
               <span className="text-sm text-gray-700">{file.name}</span>
               <span className="text-xs text-gray-500">
                 ({(file.size / 1024).toFixed(1)} KB)
               </span>
             </div>
             <button
               onClick={() => removeFile(file.id)}
               className="text-red-500 hover:text-red-700"
             >
               <X className="w-4 h-4" />
             </button>
           </div>
         ))}
       </div>
     )}
   </div>
 );
}

// Assignment Submission Modal
function AssignmentSubmissionModal({ assignment, onClose, onSubmit }) {
 const [submission, setSubmission] = useState({
   text: '',
   files: []
 });

 const handleSubmit = (e) => {
   e.preventDefault();
   if (!submission.text.trim() && submission.files.length === 0) {
     alert('Please provide either text or file submission');
     return;
   }
   
   onSubmit(assignment.id, submission);
   onClose();
 };

 const handleFileUpload = (files) => {
   setSubmission(prev => ({
     ...prev,
     files: files
   }));
 };

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto">
       <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-semibold">Submit Assignment</h2>
         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
           <X className="w-5 h-5" />
         </button>
       </div>
       
       <div className="mb-4 p-4 bg-gray-50 rounded-lg">
         <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
         <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
         <p className="text-sm text-red-600 mt-2">
           Due: {new Date(assignment.dueDate).toLocaleDateString()}
         </p>
       </div>
       
       <div className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">
             Text Submission
           </label>
           <textarea
             value={submission.text}
             onChange={(e) => setSubmission(prev => ({ ...prev, text: e.target.value }))}
             rows="6"
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             placeholder="Type your submission here or upload files below..."
           />
         </div>
         
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">
             File Upload
           </label>
           <FileUpload 
             onFileUpload={handleFileUpload}
             multiple={true}
             acceptedTypes=".pdf,.doc,.docx,.txt,.zip"
           />
         </div>
         
         <div className="flex justify-end space-x-3 pt-4">
           <button 
             type="button" 
             onClick={onClose} 
             className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
           >
             Cancel
           </button>
           <button 
             onClick={handleSubmit} 
             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
           >
             Submit Assignment
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}

// Enhanced Notifications
function NotificationCenter() {
 const [notifications, setNotifications] = useState([
   {
     id: 1,
     type: 'assignment',
     title: 'New Assignment Posted',
     message: 'CS101: Project 3 is now available',
     time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
     read: false,
     courseId: 1
   },
   {
     id: 2,
     type: 'grade',
     title: 'Grade Posted',
     message: 'Your midterm exam has been graded: 88/100',
     time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
     read: false,
     courseId: 1
   }
 ]);

 const markAsRead = (notificationId) => {
   setNotifications(prev => 
     prev.map(notif => 
       notif.id === notificationId ? { ...notif, read: true } : notif
     )
   );
 };

 const markAllAsRead = () => {
   setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
 };

 const getTimeAgo = (date) => {
   const now = new Date();
   const diff = now - date;
   const hours = Math.floor(diff / (1000 * 60 * 60));
   const days = Math.floor(hours / 24);
   
   if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
   if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
   return 'Just now';
 };

 return {
   notifications,
   markAsRead,
   markAllAsRead,
   getTimeAgo,
   unreadCount: notifications.filter(n => !n.read).length
 };
}

// Calendar Component
function Calendarr() {
 const [currentDate, setCurrentDate] = useState(new Date());
 const [events, setEvents] = useState([
   {
     id: 1,
     title: 'CS101 Lecture',
     date: new Date(2024, 9, 23), // October 23, 2024
     type: 'lecture',
     time: '10:00 AM'
   },
   {
     id: 2,
     title: 'Project 3 Due',
     date: new Date(2024, 9, 28),
     type: 'assignment',
     time: '11:59 PM'
   }
 ]);

 const getDaysInMonth = (date) => {
   const year = date.getFullYear();
   const month = date.getMonth();
   const firstDay = new Date(year, month, 1);
   const lastDay = new Date(year, month + 1, 0);
   const daysInMonth = lastDay.getDate();
   const startingDayOfWeek = firstDay.getDay();

   const days = [];
   
   // Add empty cells for days before the first day of the month
   for (let i = 0; i < startingDayOfWeek; i++) {
     days.push(null);
   }
   
   // Add days of the month
   for (let day = 1; day <= daysInMonth; day++) {
     days.push(new Date(year, month, day));
   }
   
   return days;
 };

 const getEventsForDay = (date) => {
   if (!date) return [];
   return events.filter(event => 
     event.date.toDateString() === date.toDateString()
   );
 };

 const navigateMonth = (direction) => {
   setCurrentDate(prev => {
     const newDate = new Date(prev);
     newDate.setMonth(prev.getMonth() + direction);
     return newDate;
   });
 };

 const days = getDaysInMonth(currentDate);
 const monthNames = [
   'January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'
 ];
 const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

 return (
   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
     <div className="flex justify-between items-center mb-4">
       <h2 className="text-xl font-semibold">
         {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
       </h2>
       <div className="flex space-x-2">
         <button
           onClick={() => navigateMonth(-1)}
           className="p-2 hover:bg-gray-100 rounded"
         >
           <ChevronRight className="w-5 h-5 rotate-180" />
         </button>
         <button
           onClick={() => navigateMonth(1)}
           className="p-2 hover:bg-gray-100 rounded"
         >
           <ChevronRight className="w-5 h-5" />
         </button>
       </div>
     </div>
     
     <div className="grid grid-cols-7 gap-1 mb-2">
       {dayNames.map(day => (
         <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
           {day}
         </div>
       ))}
     </div>
     
     <div className="grid grid-cols-7 gap-1">
       {days.map((day, index) => {
         const dayEvents = getEventsForDay(day);
         const isToday = day && day.toDateString() === new Date().toDateString();
         
         return (
           <div
             key={index}
             className={`min-h-20 p-1 border border-gray-200 ${
               day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
             } ${isToday ? 'bg-blue-50 border-blue-200' : ''}`}
           >
             {day && (
               <>
                 <div className={`text-sm font-medium ${
                   isToday ? 'text-blue-600' : 'text-gray-900'
                 }`}>
                   {day.getDate()}
                 </div>
                 <div className="space-y-1">
                   {dayEvents.slice(0, 2).map(event => (
                     <div
                       key={event.id}
                       className={`text-xs p-1 rounded truncate ${
                         event.type === 'lecture' 
                           ? 'bg-blue-100 text-blue-700'
                           : 'bg-red-100 text-red-700'
                       }`}
                       title={`${event.title} - ${event.time}`}
                     >
                       {event.title}
                     </div>
                   ))}
                   {dayEvents.length > 2 && (
                     <div className="text-xs text-gray-500 text-center">
                       +{dayEvents.length - 2} more
                     </div>
                   )}
                 </div>
               </>
             )}
           </div>
         );
       })}
     </div>
   </div>
 );
}

// Continue with remaining components...

// Student Progress Tracker
function StudentProgressTracker({ studentId, courseId }) {
 const [progressData, setProgressData] = useState({
   completedAssignments: 8,
   totalAssignments: 12,
   averageGrade: 87.5,
   attendance: 94,
   weeklyProgress: [
     { week: 'Week 1', score: 85 },
     { week: 'Week 2', score: 88 },
     { week: 'Week 3', score: 92 },
     { week: 'Week 4', score: 87 },
     { week: 'Week 5', score: 90 }
   ]
 });

 const progressPercentage = (progressData.completedAssignments / progressData.totalAssignments) * 100;

 return (
   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
     <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
     
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
       <div className="text-center">
         <div className="text-2xl font-bold text-blue-600">{progressData.completedAssignments}</div>
         <div className="text-sm text-gray-600">Assignments Done</div>
       </div>
       <div className="text-center">
         <div className="text-2xl font-bold text-green-600">{progressData.averageGrade}%</div>
         <div className="text-sm text-gray-600">Average Grade</div>
       </div>
       <div className="text-center">
         <div className="text-2xl font-bold text-purple-600">{progressData.attendance}%</div>
         <div className="text-sm text-gray-600">Attendance</div>
       </div>
       <div className="text-center">
         <div className="text-2xl font-bold text-orange-600">{progressPercentage.toFixed(0)}%</div>
         <div className="text-sm text-gray-600">Course Progress</div>
       </div>
     </div>

     <div className="mb-4">
       <div className="flex justify-between text-sm mb-1">
         <span>Course Completion</span>
         <span>{progressData.completedAssignments}/{progressData.totalAssignments}</span>
       </div>
       <div className="w-full bg-gray-200 rounded-full h-2">
         <div 
           className="bg-blue-500 h-2 rounded-full transition-all duration-500"
           style={{ width: `${progressPercentage}%` }}
         ></div>
       </div>
     </div>

     <div>
       <h4 className="font-medium mb-2">Weekly Performance</h4>
       <div className="space-y-2">
         {progressData.weeklyProgress.map((week, index) => (
           <div key={index} className="flex items-center justify-between">
             <span className="text-sm text-gray-600">{week.week}</span>
             <div className="flex items-center space-x-2">
               <div className="w-24 bg-gray-200 rounded-full h-2">
                 <div 
                   className="bg-green-500 h-2 rounded-full"
                   style={{ width: `${week.score}%` }}
                 ></div>
               </div>
               <span className="text-sm font-medium">{week.score}%</span>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}

// Grade Calculator
function GradeCalculator({ assignments }) {
 const [weights, setWeights] = useState({
   assignments: 40,
   quizzes: 20,
   midterm: 20,
   final: 20
 });

 const [predictions, setPredictions] = useState({
   midterm: 85,
   final: 85
 });

 const calculateCurrentGrade = () => {
   // Mock calculation based on completed assignments
   const completedAssignments = assignments.filter(a => a.grade !== null);
   if (completedAssignments.length === 0) return 0;
   
   const assignmentAvg = completedAssignments.reduce((acc, a) => acc + (a.score / a.total * 100), 0) / completedAssignments.length;
   return assignmentAvg;
 };

 const calculateProjectedGrade = () => {
   const currentGrade = calculateCurrentGrade();
   const projectedGrade = (
     (currentGrade * weights.assignments / 100) +
     (85 * weights.quizzes / 100) + // Assuming 85% for quizzes
     (predictions.midterm * weights.midterm / 100) +
     (predictions.final * weights.final / 100)
   );
   return projectedGrade;
 };

 return (
   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
     <h3 className="text-lg font-semibold mb-4">Grade Calculator</h3>
     
     <div className="space-y-4">
       <div>
         <h4 className="font-medium mb-2">Category Weights</h4>
         <div className="space-y-2">
           {Object.entries(weights).map(([category, weight]) => (
             <div key={category} className="flex items-center justify-between">
               <span className="text-sm capitalize">{category}</span>
               <div className="flex items-center space-x-2">
                 <input
                   type="range"
                   min="0"
                   max="50"
                   value={weight}
                   onChange={(e) => setWeights(prev => ({ ...prev, [category]: parseInt(e.target.value) }))}
                   className="w-20"
                 />
                 <span className="text-sm font-medium w-10">{weight}%</span>
               </div>
             </div>
           ))}
         </div>
       </div>

       <div>
         <h4 className="font-medium mb-2">Predictions</h4>
         <div className="space-y-2">
           <div className="flex items-center justify-between">
             <span className="text-sm">Midterm Score</span>
             <input
               type="number"
               min="0"
               max="100"
               value={predictions.midterm}
               onChange={(e) => setPredictions(prev => ({ ...prev, midterm: parseInt(e.target.value) }))}
               className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
             />
           </div>
           <div className="flex items-center justify-between">
             <span className="text-sm">Final Score</span>
             <input
               type="number"
               min="0"
               max="100"
               value={predictions.final}
               onChange={(e) => setPredictions(prev => ({ ...prev, final: parseInt(e.target.value) }))}
               className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
             />
           </div>
         </div>
       </div>

       <div className="border-t pt-4">
         <div className="flex justify-between items-center">
           <span className="font-medium">Current Grade:</span>
           <span className="text-lg font-bold text-blue-600">{calculateCurrentGrade().toFixed(1)}%</span>
         </div>
         <div className="flex justify-between items-center mt-2">
           <span className="font-medium">Projected Final Grade:</span>
           <span className="text-lg font-bold text-green-600">{calculateProjectedGrade().toFixed(1)}%</span>
         </div>
       </div>
     </div>
   </div>
 );
}

// Courses Management View
function CoursesManagement() {
 const { user } = useAuth();
 const [courses, setCourses] = useState([
   { id: 1, code: 'CS101', name: 'Introduction to Computer Science', instructor: 'Dr. Smith', students: 45, term: 'Fall 2024', status: 'active' },
   { id: 2, code: 'MATH201', name: 'Calculus II', instructor: 'Prof. Johnson', students: 38, term: 'Fall 2024', status: 'active' },
   { id: 3, code: 'ENG102', name: 'Academic Writing', instructor: 'Dr. Williams', students: 32, term: 'Fall 2024', status: 'active' },
 ]);
 const [showCreateModal, setShowCreateModal] = useState(false);
 const [searchTerm, setSearchTerm] = useState('');

 const filteredCourses = courses.filter(course => 
   course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   course.code.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
   <div className="p-6">
     <div className="flex justify-between items-center mb-6">
       <h1 className="text-3xl font-bold">Course Management</h1>
       {(user?.role === 'instructor' || user?.role === 'admin') && (
         <button 
           onClick={() => setShowCreateModal(true)}
           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
         >
           <Plus className="w-4 h-4" />
           <span>Create Course</span>
         </button>
       )}
     </div>

     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
       <div className="flex items-center space-x-4">
         <div className="flex-1 relative">
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
           <input
             type="text"
             placeholder="Search courses..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
           />
         </div>
         <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
           <Filter className="w-4 h-4" />
           <span>Filter</span>
         </button>
       </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {filteredCourses.map(course => (
         <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-3">
             <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-semibold">{course.code}</span>
             <span className={`px-2 py-1 rounded text-xs ${
               course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
             }`}>
               {course.status}
             </span>
           </div>
           <h3 className="font-semibold text-gray-900 mb-2">{course.name}</h3>
           <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
           <div className="flex justify-between items-center text-sm text-gray-500">
             <span>{course.students} students</span>
             <span>{course.term}</span>
           </div>
           <div className="mt-4 flex space-x-2">
             <button className="flex-1 px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm">View</button>
             {user?.role !== 'student' && (
               <button className="flex-1 px-3 py-1 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 text-sm">Edit</button>
             )}
           </div>
         </div>
       ))}
     </div>

     {showCreateModal && (
       <CreateCourseModal onClose={() => setShowCreateModal(false)} onCreate={(newCourse) => {
         setCourses([...courses, { ...newCourse, id: Date.now() }]);
         setShowCreateModal(false);
       }} />
     )}
   </div>
 );
}

// Create Course Modal
function CreateCourseModal({ onClose, onCreate }) {
 const [formData, setFormData] = useState({
   code: '',
   name: '',
   instructor: '',
   term: 'Fall 2024',
   maxStudents: 50
 });

 const handleSubmit = (e) => {
   e.preventDefault();
   onCreate({ ...formData, students: 0, status: 'active' });
 };

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg w-full max-w-2xl p-6">
       <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-semibold">Create New Course</h2>
         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
           <X className="w-5 h-5" />
         </button>
       </div>
       
       <form onSubmit={handleSubmit} className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
             <input
               type="text"
               value={formData.code}
               onChange={(e) => setFormData({...formData, code: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
               required
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
             <select
               value={formData.term}
               onChange={(e) => setFormData({...formData, term: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
             >
               <option>Fall 2024</option>
               <option>Spring 2025</option>
               <option>Summer 2025</option>
             </select>
           </div>
         </div>
         
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
           <input
             type="text"
             value={formData.name}
             onChange={(e) => setFormData({...formData, name: e.target.value})}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
         
         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
             <input
               type="text"
               value={formData.instructor}
               onChange={(e) => setFormData({...formData, instructor: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
               required
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Max Students</label>
             <input
               type="number"
               value={formData.maxStudents}
               onChange={(e) => setFormData({...formData, maxStudents: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
               required
             />
           </div>
         </div>
         
         <div className="flex justify-end space-x-3 pt-4">
           <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
             Cancel
           </button>
           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
             Create Course
           </button>
         </div>
       </form>
     </div>
   </div>
 );
}

// Assignments View
function AssignmentsView() {
 const { user } = useAuth();
 const [assignments] = useState([
   { id: 1, title: 'Project 1', course: 'CS101', due: '2024-10-28', status: 'pending', grade: null },
   { id: 2, title: 'Essay Draft', course: 'ENG102', due: '2024-10-30', status: 'submitted', grade: '88/100' },
   { id: 3, title: 'Lab Report', course: 'PHY301', due: '2024-11-01', status: 'not-started', grade: null },
 ]);

 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">All Assignments</h1>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="p-4 border-b border-gray-200">
         <div className="flex space-x-4">
           <button className="text-blue-600 font-medium">All</button>
           <button className="text-gray-600 hover:text-gray-900">Pending</button>
           <button className="text-gray-600 hover:text-gray-900">Submitted</button>
           <button className="text-gray-600 hover:text-gray-900">Graded</button>
         </div>
       </div>
       
       <div className="divide-y divide-gray-200">
         {assignments.map(assignment => (
           <div key={assignment.id} className="p-4 hover:bg-gray-50">
             <div className="flex items-center justify-between">
               <div>
                 <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                 <p className="text-sm text-gray-600">{assignment.course} • Due: {assignment.due}</p>
               </div>
               <div className="flex items-center space-x-4">
                 <span className={`px-3 py-1 rounded-full text-sm ${
                   assignment.status === 'submitted' ? 'bg-green-100 text-green-700' :
                   assignment.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                   'bg-gray-100 text-gray-700'
                 }`}>
                   {assignment.status}
                 </span>
                 {assignment.grade && <span className="font-semibold">{assignment.grade}</span>}
                 <button className="text-blue-600 hover:text-blue-700">View</button>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}

// Grades View
function GradesView() {
 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">My Grades</h1>
     
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Overall GPA</p>
         <p className="text-3xl font-bold text-green-600 mt-1">3.7</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Credits Earned</p>
         <p className="text-3xl font-bold text-blue-600 mt-1">45</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Current Semester</p>
         <p className="text-3xl font-bold text-purple-600 mt-1">Fall 2024</p>
       </div>
     </div>
     
     <GradeCalculator assignments={[]} />
   </div>
 );
}

// Calendar View
function CalendarView() {
 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Calendar</h1>
     <Calendarr />
   </div>
 );
}

// Discussions View
function DiscussionsView() {
 const [discussions] = useState([
   { id: 1, title: 'General Questions', posts: 45, lastActivity: '2 hours ago', category: 'General' },
   { id: 2, title: 'Study Groups', posts: 23, lastActivity: '5 hours ago', category: 'Study' },
   { id: 3, title: 'Project Collaboration', posts: 67, lastActivity: '1 day ago', category: 'Projects' },
 ]);

 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Discussion Forums</h1>
     
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {discussions.map(discussion => (
         <div key={discussion.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
           <div className="flex justify-between items-start mb-3">
             <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
             <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{discussion.category}</span>
           </div>
           <div className="flex justify-between items-center text-sm text-gray-600">
             <span>{discussion.posts} posts</span>
             <span>{discussion.lastActivity}</span>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}

// Gradebook View (Instructor)
function GradebookView() {
 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Gradebook</h1>
     <GradesTab isInstructor={true} />
   </div>
 );
}

// Students View (Instructor)
function StudentsView() {
 const [students] = useState([
   { id: 1, name: 'John Doe', email: 'john@university.edu', courses: 4, gpa: 3.5 },
   { id: 2, name: 'Jane Smith', email: 'jane@university.edu', courses: 5, gpa: 3.8 },
   { id: 3, name: 'Mike Johnson', email: 'mike@university.edu', courses: 4, gpa: 3.2 },
 ]);

 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Students</h1>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="overflow-x-auto">
         <table className="w-full">
           <thead className="bg-gray-50 border-b border-gray-200">
             <tr>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Courses</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">GPA</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-200">
             {students.map(student => (
               <tr key={student.id} className="hover:bg-gray-50">
                 <td className="px-4 py-3 text-sm text-gray-900">{student.name}</td>
                 <td className="px-4 py-3 text-sm text-gray-600">{student.email}</td>
                 <td className="px-4 py-3 text-sm text-gray-600">{student.courses}</td>
                 <td className="px-4 py-3 text-sm font-semibold">{student.gpa}</td>
                 <td className="px-4 py-3 text-sm">
                   <button className="text-blue-600 hover:text-blue-700 mr-3">View</button>
                   <button className="text-gray-600 hover:text-gray-700">Message</button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   </div>
 );
}

// Analytics View (Instructor)
function AnalyticsView() {
 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Analytics</h1>
     
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Average Grade</p>
         <p className="text-3xl font-bold text-green-600 mt-1">85.3%</p>
         <p className="text-xs text-green-600 mt-1">↑ 2.3% from last month</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Attendance Rate</p>
         <p className="text-3xl font-bold text-blue-600 mt-1">92%</p>
         <p className="text-xs text-blue-600 mt-1">↑ 1.5% from last month</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Assignment Completion</p>
         <p className="text-3xl font-bold text-purple-600 mt-1">78%</p>
         <p className="text-xs text-red-600 mt-1">↓ 3.2% from last month</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Active Students</p>
         <p className="text-3xl font-bold text-orange-600 mt-1">156</p>
         <p className="text-xs text-gray-600 mt-1">Total enrolled: 180</p>
       </div>
     </div>
     
     <StudentProgressTracker studentId={1} courseId={1} />
   </div>
 );
}

// User Management (Admin) - continues next...// User Management (Admin) - continues next...
function UserManagement() {
 const [users, setUsers] = useState([
   { id: 1, name: 'Dr. Smith', email: 'smith@university.edu', role: 'instructor', status: 'active' },
   { id: 2, name: 'Sarah Johnson', email: 'sarah@university.edu', role: 'student', status: 'active' },
   { id: 3, name: 'Admin User', email: 'admin@university.edu', role: 'admin', status: 'active' },
 ]);
 const [showCreateModal, setShowCreateModal] = useState(false);

 return (
   <div className="p-6">
     <div className="flex justify-between items-center mb-6">
       <h1 className="text-3xl font-bold">User Management</h1>
       <button 
         onClick={() => setShowCreateModal(true)}
         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
       >
         <Plus className="w-4 h-4" />
         <span>Add User</span>
       </button>
     </div>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="p-4 border-b border-gray-200">
         <div className="flex items-center space-x-4">
           <Search className="w-5 h-5 text-gray-400" />
           <input
             type="text"
             placeholder="Search users..."
             className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
           />
           <select className="px-3 py-2 border border-gray-300 rounded-lg">
             <option>All Roles</option>
             <option>Students</option>
             <option>Instructors</option>
             <option>Admins</option>
           </select>
         </div>
       </div>
       
       <div className="overflow-x-auto">
         <table className="w-full">
           <thead className="bg-gray-50 border-b border-gray-200">
             <tr>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-200">
             {users.map(user => (
               <tr key={user.id} className="hover:bg-gray-50">
                 <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                 <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                 <td className="px-4 py-3 text-sm">
                   <span className={`px-2 py-1 rounded-full text-xs ${
                     user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                     user.role === 'instructor' ? 'bg-blue-100 text-blue-700' :
                     'bg-green-100 text-green-700'
                   }`}>
                     {user.role}
                   </span>
                 </td>
                 <td className="px-4 py-3 text-sm">
                   <span className={`px-2 py-1 rounded-full text-xs ${
                     user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                   }`}>
                     {user.status}
                   </span>
                 </td>
                 <td className="px-4 py-3 text-sm">
                   <button className="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
                   <button className="text-red-600 hover:text-red-700">Deactivate</button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>

     {showCreateModal && (
       <CreateUserModal onClose={() => setShowCreateModal(false)} onCreate={(newUser) => {
         setUsers([...users, { ...newUser, id: Date.now(), status: 'active' }]);
         setShowCreateModal(false);
       }} />
     )}
   </div>
 );
}

// Create User Modal
function CreateUserModal({ onClose, onCreate }) {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   role: 'student',
   password: ''
 });

 const handleSubmit = (e) => {
   e.preventDefault();
   onCreate(formData);
 };

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg w-full max-w-md p-6">
       <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-semibold">Add New User</h2>
         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
           <X className="w-5 h-5" />
         </button>
       </div>
       
       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
           <input
             type="text"
             value={formData.name}
             onChange={(e) => setFormData({...formData, name: e.target.value})}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
         
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
           <input
             type="email"
             value={formData.email}
             onChange={(e) => setFormData({...formData, email: e.target.value})}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
         
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
           <select
             value={formData.role}
             onChange={(e) => setFormData({...formData, role: e.target.value})}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
           >
             <option value="student">Student</option>
             <option value="instructor">Instructor</option>
             <option value="admin">Admin</option>
           </select>
         </div>
         
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
           <input
             type="password"
             value={formData.password}
             onChange={(e) => setFormData({...formData, password: e.target.value})}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
         
         <div className="flex justify-end space-x-3 pt-4">
           <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
             Cancel
           </button>
           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
             Add User
           </button>
         </div>
       </form>
     </div>
   </div>
 );
}

// Reports View (Admin)
function ReportsView() {
 const [reportType, setReportType] = useState('enrollment');
 
 const reports = {
   enrollment: {
     title: 'Enrollment Report',
     data: [
       { course: 'CS101', enrolled: 45, capacity: 50, percentage: 90 },
       { course: 'MATH201', enrolled: 38, capacity: 40, percentage: 95 },
       { course: 'ENG102', enrolled: 32, capacity: 35, percentage: 91 },
     ]
   },
   performance: {
     title: 'Performance Report',
     data: [
       { course: 'CS101', avgGrade: 85.2, passRate: 92, completion: 88 },
       { course: 'MATH201', avgGrade: 78.5, passRate: 85, completion: 90 },
       { course: 'ENG102', avgGrade: 88.7, passRate: 95, completion: 93 },
     ]
   },
   attendance: {
     title: 'Attendance Report',
     data: [
       { course: 'CS101', avgAttendance: 92, lastWeek: 95, trend: 'up' },
       { course: 'MATH201', avgAttendance: 88, lastWeek: 85, trend: 'down' },
       { course: 'ENG102', avgAttendance: 90, lastWeek: 91, trend: 'stable' },
     ]
   }
 };

 return (
   <div className="p-6">
     <div className="flex justify-between items-center mb-6">
       <h1 className="text-3xl font-bold">Reports</h1>
       <div className="flex space-x-2">
         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
           <Download className="w-4 h-4" />
           <span>Export PDF</span>
         </button>
         <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
           <Download className="w-4 h-4" />
           <span>Export Excel</span>
         </button>
       </div>
     </div>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
       <div className="flex space-x-4">
         <button
           onClick={() => setReportType('enrollment')}
           className={`px-4 py-2 rounded-lg ${reportType === 'enrollment' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
         >
           Enrollment
         </button>
         <button
           onClick={() => setReportType('performance')}
           className={`px-4 py-2 rounded-lg ${reportType === 'performance' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
         >
           Performance
         </button>
         <button
           onClick={() => setReportType('attendance')}
           className={`px-4 py-2 rounded-lg ${reportType === 'attendance' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
         >
           Attendance
         </button>
       </div>
     </div>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="p-4 border-b border-gray-200">
         <h2 className="text-lg font-semibold">{reports[reportType].title}</h2>
       </div>
       <div className="overflow-x-auto">
         <table className="w-full">
           <thead className="bg-gray-50 border-b border-gray-200">
             <tr>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Course</th>
               {reportType === 'enrollment' && (
                 <>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Enrolled</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Capacity</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Fill Rate</th>
                 </>
               )}
               {reportType === 'performance' && (
                 <>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Avg Grade</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Pass Rate</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Completion</th>
                 </>
               )}
               {reportType === 'attendance' && (
                 <>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Avg Attendance</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Week</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Trend</th>
                 </>
               )}
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-200">
             {reports[reportType].data.map((row, index) => (
               <tr key={index} className="hover:bg-gray-50">
                 <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.course}</td>
                 {reportType === 'enrollment' && (
                   <>
                     <td className="px-4 py-3 text-sm text-gray-600">{row.enrolled}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{row.capacity}</td>
                     <td className="px-4 py-3 text-sm">
                       <div className="flex items-center">
                         <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                           <div className="bg-blue-500 h-2 rounded-full" style={{width: `${row.percentage}%`}}></div>
                         </div>
                         <span className="font-medium">{row.percentage}%</span>
                       </div>
                     </td>
                   </>
                 )}
                 {reportType === 'performance' && (
                   <>
                     <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.avgGrade}%</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{row.passRate}%</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{row.completion}%</td>
                   </>
                 )}
                 {reportType === 'attendance' && (
                   <>
                     <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.avgAttendance}%</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{row.lastWeek}%</td>
                     <td className="px-4 py-3 text-sm">
                       <span className={`flex items-center ${
                         row.trend === 'up' ? 'text-green-600' : 
                         row.trend === 'down' ? 'text-red-600' : 
                         'text-gray-600'
                       }`}>
                         {row.trend === 'up' ? '↑' : row.trend === 'down' ? '↓' : '→'} {row.trend}
                       </span>
                     </td>
                   </>
                 )}
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   </div>
 );
}

// Settings View
function SettingsView() {
 const { user } = useAuth();
 const [activeTab, setActiveTab] = useState('profile');
 const [settings, setSettings] = useState({
   emailNotifications: true,
   pushNotifications: false,
   weeklyReports: true,
   twoFactorAuth: false,
   language: 'English',
   timezone: 'UTC-5',
   theme: 'light'
 });

 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Settings</h1>
     
     <div className="flex space-x-6">
       <div className="w-64">
         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
           <nav className="space-y-1">
             <button
               onClick={() => setActiveTab('profile')}
               className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
             >
               Profile
             </button>
             <button
               onClick={() => setActiveTab('notifications')}
               className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
             >
               Notifications
             </button>
             <button
               onClick={() => setActiveTab('security')}
               className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
             >
               Security
             </button>
             <button
               onClick={() => setActiveTab('preferences')}
               className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'preferences' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
             >
               Preferences
             </button>
             {user?.role === 'admin' && (
               <button
                 onClick={() => setActiveTab('system')}
                 className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'system' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
               >
                 System
               </button>
             )}
           </nav>
         </div>
       </div>
       
       <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
         {activeTab === 'profile' && (
           <div>
             <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                 <input type="text" defaultValue={user?.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                 <input type="email" defaultValue={user?.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                 <textarea rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
               </div>
               <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save Changes</button>
             </div>
           </div>
         )}
         
         {activeTab === 'notifications' && (
           <div>
             <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
             <div className="space-y-4">
               <label className="flex items-center justify-between">
                 <span>Email Notifications</span>
                 <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})} className="w-4 h-4" />
               </label>
               <label className="flex items-center justify-between">
                 <span>Push Notifications</span>
                 <input type="checkbox" checked={settings.pushNotifications} onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})} className="w-4 h-4" />
               </label>
               <label className="flex items-center justify-between">
                 <span>Weekly Reports</span>
                 <input type="checkbox" checked={settings.weeklyReports} onChange={(e) => setSettings({...settings, weeklyReports: e.target.checked})} className="w-4 h-4" />
               </label>
             </div>
           </div>
         )}
         
         {activeTab === 'security' && (
           <div>
             <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                 <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                 <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
               </div>
               <label className="flex items-center justify-between">
                 <span>Two-Factor Authentication</span>
                 <input type="checkbox" checked={settings.twoFactorAuth} onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})} className="w-4 h-4" />
               </label>
               <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Update Security</button>
             </div>
           </div>
         )}
         
         {activeTab === 'preferences' && (
  <div>
    <h2 className="text-xl font-semibold mb-4">Preferences</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
        <select value={settings.language} onChange={(e) => setSettings({...settings, language: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
        <select value={settings.timezone} onChange={(e) => setSettings({...settings, timezone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
          <option>UTC-5 (Eastern)</option>
          <option>UTC-6 (Central)</option>
          <option>UTC-7 (Mountain)</option>
          <option>UTC-8 (Pacific)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
        <ThemeSelector />
      </div>
    </div>
  </div>
)}
         {activeTab === 'system' && user?.role === 'admin' && (
           <div>
             <h2 className="text-xl font-semibold mb-4">System Settings</h2>
             <div className="space-y-4">
               <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                 <p className="text-sm text-yellow-800">⚠️ Changes to system settings affect all users</p>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                 <input type="text" defaultValue="University" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                   <option>2024-2025</option>
                   <option>2025-2026</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Registration Status</label>
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                   <option>Open</option>
                   <option>Closed</option>
                 </select>
               </div>
               <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Save System Settings</button>
             </div>
           </div>
         )}
       </div>
     </div>
   </div>
 );
}
// Instructor AI Settings Component
function InstructorAISettings() {
  const [aiSettings, setAISettings] = useState({
    autoFeedback: true,
    feedbackDelay: 'immediate',
    quizDifficulty: 'adaptive',
    allowStudentQuizGen: true,
    contextSources: ['lectures', 'textbook', 'assignments']
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">AI Assistant Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium">Enable Auto-Feedback</span>
            <input
              type="checkbox"
              checked={aiSettings.autoFeedback}
              onChange={(e) => setAISettings({...aiSettings, autoFeedback: e.target.checked})}
              className="w-4 h-4"
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Automatically provide initial feedback on student submissions
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Feedback Timing</label>
          <select
            value={aiSettings.feedbackDelay}
            onChange={(e) => setAISettings({...aiSettings, feedbackDelay: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="immediate">Immediate</option>
            <option value="1hour">After 1 hour</option>
            <option value="24hours">After 24 hours</option>
          </select>
        </div>
        
        <div>
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium">Allow Student Quiz Generation</span>
            <input
              type="checkbox"
              checked={aiSettings.allowStudentQuizGen}
              onChange={(e) => setAISettings({...aiSettings, allowStudentQuizGen: e.target.checked})}
              className="w-4 h-4"
            />
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">AI Knowledge Sources</label>
          <div className="space-y-2">
            {['lectures', 'textbook', 'assignments', 'discussions'].map(source => (
              <label key={source} className="flex items-center">
                <input
                  type="checkbox"
                  checked={aiSettings.contextSources.includes(source)}
                  onChange={(e) => {
                    const sources = e.target.checked
                      ? [...aiSettings.contextSources, source]
                      : aiSettings.contextSources.filter(s => s !== source);
                    setAISettings({...aiSettings, contextSources: sources});
                  }}
                  className="mr-2"
                />
                <span className="text-sm capitalize">{source}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save AI Settings
        </button>
      </div>
    </div>
  );
}
// Export all components
export { 
 EnhancedDashboard, 
 FileUpload, 
 AssignmentSubmissionModal, 
 NotificationCenter, 
 Calendarr,
 StudentProgressTracker,
 GradeCalculator,
 CoursesManagement,
 AssignmentsView,
 GradesView,
 CalendarView,
 DiscussionsView,
 GradebookView,
 StudentsView,
 AnalyticsView,
 UserManagement,
 ReportsView,
 SettingsView
};

// Profile View Component
function ProfileView({ onNavigate }) {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '080000000',
    bio: 'Passionate learner focused on computer science and technology.',
    department: 'Computer Science',
    studentId: 'STU-2024-001',
    enrollmentDate: 'September 2024',
    avatar: null
  });

  const [stats] = useState({
    coursesEnrolled: 4,
    coursesCompleted: 12,
    averageGrade: 'A-',
    creditsEarned: 45,
    gpa: 3.7,
    attendance: 94
  });

  const handleSave = () => {
    // Update user context with new data
    setUser(prev => ({
      ...prev,
      name: profileData.name,
      email: profileData.email
    }));
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Edit className="w-4 h-4 text-gray-600" />
                  </label>
                )}
              </div>
              
              {/* Basic Info */}
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="text-2xl font-bold mb-1 px-2 py-1 border border-gray-300 rounded"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                )}
                <p className="text-gray-600">{user?.role === 'student' ? 'Student' : user?.role === 'instructor' ? 'Instructor' : 'Administrator'}</p>
                <p className="text-sm text-gray-500 mt-1">ID: {profileData.studentId}</p>
              </div>
            </div>
            
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              {isEditing ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        {user?.role === 'student' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.coursesEnrolled}</p>
              <p className="text-sm text-gray-600">Active Courses</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.coursesCompleted}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.averageGrade}</p>
              <p className="text-sm text-gray-600">Avg Grade</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{stats.creditsEarned}</p>
              <p className="text-sm text-gray-600">Credits</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{stats.gpa}</p>
              <p className="text-sm text-gray-600">GPA</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-teal-600">{stats.attendance}%</p>
              <p className="text-sm text-gray-600">Attendance</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    {isEditing ? (
                      <select
                        value={profileData.department}
                        onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option>Computer Science</option>
                        <option>Mathematics</option>
                        <option>Engineering</option>
                        <option>Business</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profileData.department}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.bio}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Submitted Assignment</p>
                    <p className="text-xs text-gray-500">CS101 - Project 3</p>
                  </div>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Grade Received</p>
                    <p className="text-xs text-gray-500">MATH201 - Quiz 5: 88%</p>
                  </div>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Posted in Discussion</p>
                    <p className="text-xs text-gray-500">Study Group for Midterm</p>
                  </div>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Side Information */}
          <div className="space-y-6">
            {/* Academic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Student ID</p>
                  <p className="font-medium">{profileData.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Enrollment Date</p>
                  <p className="font-medium">{profileData.enrollmentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Academic Year</p>
                  <p className="font-medium">2024-2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
  <div className="space-y-2">
    <button 
      onClick={() => onNavigate('certificates')}
      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
    >
      <Award className="w-4 h-4 text-gray-600" />
      <span className="text-sm">View Certificates</span>
    </button>
    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
      <Download className="w-4 h-4 text-gray-600" />
      <span className="text-sm">Download Transcript</span>
    </button>
    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
      <Calendar className="w-4 h-4 text-gray-600" />
      <span className="text-sm">Schedule Advisor Meeting</span>
    </button>
    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
      <Settings className="w-4 h-4 text-gray-600" />
      <span className="text-sm">Privacy Settings</span>
    </button>

  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Certificates View Component
function CertificatesView() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: 'Introduction to Computer Science',
      courseCode: 'CS101',
      issueDate: '2024-06-15',
      instructor: 'Dr. Robert Smith',
      grade: 'A',
      credits: 4,
      verificationCode: 'CERT-2024-CS101-001',
      status: 'verified',
      downloadUrl: '#',
      skills: ['Programming Basics', 'Problem Solving', 'Algorithms']
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      courseCode: 'CS201',
      issueDate: '2024-08-20',
      instructor: 'Prof. Jane Wilson',
      grade: 'A-',
      credits: 4,
      verificationCode: 'CERT-2024-CS201-002',
      status: 'verified',
      downloadUrl: '#',
      skills: ['Data Structures', 'Algorithm Design', 'Complexity Analysis']
    },
    {
      id: 3,
      title: 'Web Development Fundamentals',
      courseCode: 'CS301',
      issueDate: '2024-09-10',
      instructor: 'Dr. Michael Chen',
      grade: 'B+',
      credits: 3,
      verificationCode: 'CERT-2024-CS301-003',
      status: 'verified',
      downloadUrl: '#',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js']
    },
    {
      id: 4,
      title: 'Database Management Systems',
      courseCode: 'CS302',
      issueDate: '2024-10-01',
      instructor: 'Prof. Sarah Johnson',
      grade: 'A',
      credits: 3,
      verificationCode: 'CERT-2024-CS302-004',
      status: 'pending',
      downloadUrl: '#',
      skills: ['SQL', 'Database Design', 'Query Optimization']
    }
  ]);

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCertificates = certificates.filter(cert => {
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalCredits = certificates.reduce((sum, cert) => sum + cert.credits, 0);
  const verifiedCount = certificates.filter(cert => cert.status === 'verified').length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="text-gray-600 mt-1">Your earned course certificates and achievements</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Download All</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Certificates</p>
              <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
            </div>
            <Award className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Credits</p>
              <p className="text-2xl font-bold text-purple-600">{totalCredits}</p>
            </div>
            <Star className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">
                {certificates.filter(cert => cert.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'all' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('verified')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'verified' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'pending' 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedCertificate(certificate)}
          >
            {/* Certificate Header */}
            <div className={`h-2 ${
              certificate.status === 'verified' ? 'bg-green-500' : 'bg-orange-500'
            }`}></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{certificate.title}</h3>
                  <p className="text-sm text-gray-600">{certificate.courseCode}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  certificate.status === 'verified' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {certificate.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium">{certificate.instructor}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Issue Date:</span>
                  <span className="font-medium">{certificate.issueDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-semibold text-green-600">{certificate.grade}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Credits:</span>
                  <span className="font-medium">{certificate.credits}</span>
                </div>
              </div>
              
              {/* Skills Tags */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Skills Acquired:</p>
                <div className="flex flex-wrap gap-1">
                  {certificate.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-1 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-1 text-sm">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}

// Certificate Modal Component
function CertificateModal({ certificate, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Certificate Preview */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 border-b border-gray-200">
          <div className="text-center">
            <div className="mb-4">
              <Award className="w-16 h-16 text-gold-500 mx-auto text-yellow-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Completion</h2>
            <p className="text-gray-600">This is to certify that</p>
            <p className="text-2xl font-semibold text-gray-900 my-3">{certificate.title}</p>
            <p className="text-gray-600">has been successfully completed by</p>
            <p className="text-xl font-semibold text-gray-900 mt-3">Sarah Johnson</p>
          </div>
        </div>
        
        {/* Certificate Details */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Course Code</p>
              <p className="font-semibold">{certificate.courseCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Issue Date</p>
              <p className="font-semibold">{certificate.issueDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Instructor</p>
              <p className="font-semibold">{certificate.instructor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Final Grade</p>
              <p className="font-semibold text-green-600">{certificate.grade}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Credits Earned</p>
              <p className="font-semibold">{certificate.credits}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Verification Code</p>
              <p className="font-mono text-sm">{certificate.verificationCode}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Skills Acquired</p>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Verify Certificate</span>
            </button>
            <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
          
          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Theme Selector Component
function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  
  const themes = [
    { 
      id: 'light', 
      name: 'Light', 
      description: 'Clean and bright',
      colors: ['#ffffff', '#f3f4f6', '#e5e7eb'],
      icon: '☀️'
    },
    { 
      id: 'dark', 
      name: 'Dark', 
      description: 'Easy on the eyes',
      colors: ['#1f2937', '#111827', '#030712'],
      icon: '🌙'
    },
    { 
      id: 'midnight', 
      name: 'Midnight', 
      description: 'Deep space vibes',
      colors: ['#1a1a2e', '#0f0f23', '#050510'],
      icon: '🌌'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {themes.map((themeOption) => (
        <button
          key={themeOption.id}
          onClick={() => setTheme(themeOption.id)}
          className={`p-4 rounded-lg border-2 transition-all ${
            theme === themeOption.id 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="text-2xl mb-2">{themeOption.icon}</div>
          <div className="flex space-x-1 mb-2 justify-center">
            {themeOption.colors.map((color, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <h3 className="font-semibold text-gray-900">{themeOption.name}</h3>
          <p className="text-xs text-gray-600 mt-1">{themeOption.description}</p>
          {theme === themeOption.id && (
            <div className="mt-2">
              <CheckCircle className="w-5 h-5 text-blue-500 mx-auto" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}