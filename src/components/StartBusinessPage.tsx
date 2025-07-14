import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Send, Bot, User, Lightbulb, Leaf, TrendingUp } from "lucide-react";

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  suggestions?: string[];
}

export function StartBusinessPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    const initialMessage: Message = {
      id: "1",
      type: "bot",
      content: "Namaste! Let's bring your dream to life 🌟\n\nI'm here to help you start your perfect business. Tell me, what kind of products interest you the most?",
      suggestions: ["Fashion & Clothing", "Beauty & Skincare", "Homemade Snacks", "Handmade Crafts", "Digital Services"]
    };
    setMessages([initialMessage]);
  }, []);

  const addBotMessage = (content: string, suggestions?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      suggestions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = (message: string = inputValue) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot typing
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Bot responses based on user input
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('fashion') || lowerMessage.includes('clothing')) {
        addBotMessage(
          "Wonderful choice! Fashion is always in demand 👗\n\nHere are some trending, eco-friendly fashion ideas perfect for the Indian market:\n\n🌿 Sustainable cotton wear\n👘 Indo-western fusion clothing\n🧣 Handwoven accessories\n♻️ Upcycled vintage pieces\n🌺 Regional embroidered items\n\nWhich of these resonates with you? Or would you like to explore a specific regional style?",
          ["Sustainable Cotton", "Indo-Western Fusion", "Handwoven Accessories", "Tell me more about regional styles"]
        );
      } else if (lowerMessage.includes('beauty') || lowerMessage.includes('skincare')) {
        addBotMessage(
          "Beautiful! The beauty industry is booming in India 💄✨\n\nHere are some trending, natural beauty ideas:\n\n🌿 Ayurvedic skincare products\n🥥 Homemade organic cosmetics\n🌸 Traditional beauty remedies\n🧴 Herbal hair care solutions\n💆‍♀️ DIY beauty kits\n\nWhat type of beauty products excite you most? Natural ingredients are very popular right now!",
          ["Ayurvedic Skincare", "Organic Cosmetics", "Herbal Hair Care", "DIY Beauty Kits"]
        );
      } else if (lowerMessage.includes('snack') || lowerMessage.includes('food')) {
        addBotMessage(
          "Delicious choice! Food business is always profitable 🍪\n\nHere are some popular snack ideas that sell well:\n\n🥜 Healthy roasted nuts & seeds\n🍪 Traditional homemade sweets\n🌶️ Spicy regional namkeens\n🥤 Natural fruit drinks\n🍯 Organic honey products\n\nFood businesses start small and can grow big! Which type of snacks would you love to make?",
          ["Healthy Nuts & Seeds", "Traditional Sweets", "Regional Namkeens", "Natural Drinks"]
        );
      } else if (lowerMessage.includes('craft') || lowerMessage.includes('handmade')) {
        addBotMessage(
          "How creative! Handmade products have a special charm 🎨\n\nHere are some craft ideas that are in high demand:\n\n🪔 Decorative diyas & candles\n🎁 Personalized gift items\n🧸 Handmade toys & dolls\n🏺 Traditional pottery items\n📚 Custom notebooks & stationery\n\nHandmade products tell a story! What kind of crafts do you enjoy making?",
          ["Decorative Items", "Personalized Gifts", "Handmade Toys", "Traditional Pottery"]
        );
      } else {
        addBotMessage(
          "That's interesting! Let me help you explore this further 🤔\n\nFor any business to succeed, we need to consider:\n\n💡 Market demand\n🌱 Sustainability\n💰 Profit potential\n📍 Local relevance\n\nTell me more about what you're passionate about, and I'll suggest some specific business ideas that could work perfectly for you!",
          ["I love making things by hand", "I'm good with technology", "I enjoy helping people", "I want something eco-friendly"]
        );
      }
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/home")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Start Your Business</h1>
              <p className="text-sm text-muted-foreground">AI-powered business guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-100px)] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="bg-gradient-primary p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                <Card className={`${
                  message.type === 'user' 
                    ? 'bg-gradient-primary text-white border-0' 
                    : 'bg-card border-border/50'
                }`}>
                  <CardContent className="p-4">
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Suggestions */}
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="bg-secondary p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="bg-gradient-primary p-2 rounded-full h-10 w-10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <Card className="bg-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <Card className="border-border/50 shadow-warm">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me about your interests..."
                className="flex-1 border-border/50 focus:border-primary/50"
              />
              <Button 
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}