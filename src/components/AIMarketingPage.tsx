import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Megaphone, Copy, Instagram, MessageCircle, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductData {
  category: string;
  productName: string;
  costPrice: string;
  description: string;
  platform: string;
}

interface MarketingContent {
  instagramCaption: string;
  whatsappMessage: string;
  offerTagline: string;
}

export function AIMarketingPage() {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [targetAudience, setTargetAudience] = useState("");
  const [marketingContent, setMarketingContent] = useState<MarketingContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const data = localStorage.getItem("product_data");
    if (!data) {
      navigate("/sell-online");
      return;
    }
    setProductData(JSON.parse(data));
  }, [navigate]);

  const generateContent = async () => {
    if (!productData) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation (replace with actual Gemini API call)
    setTimeout(() => {
      const audience = targetAudience || "young adults";
      const content: MarketingContent = {
        instagramCaption: `✨ Introducing the perfect ${productData.productName}! ✨

Looking for premium quality ${productData.category.toLowerCase()} that fits your lifestyle? Look no further! 💫

🌟 Why you'll love it:
• Premium quality materials
• Perfect for ${audience}
• Affordable luxury
• Fast delivery guaranteed

💝 Special Launch Offer - Limited Time!
📱 DM us to order or click the link in bio

#${productData.category.replace(/\s+/g, '')} #${productData.productName.replace(/\s+/g, '')} #OnlineShopping #QualityProducts #${productData.platform} #TrendingNow #LifestyleEssentials #PremiumQuality`,

        whatsappMessage: `🛍️ *Exciting New Product Alert!* 🛍️

Hi! I'm excited to share my latest ${productData.category.toLowerCase()} collection with you!

*${productData.productName}*
${productData.description}

✅ Premium Quality
✅ Best Prices
✅ Quick Delivery
✅ Easy Returns

*Special Price: ₹${Math.round(parseInt(productData.costPrice) * 2.2)}* (Limited Time)

*Available on ${productData.platform}*

Interested? Reply "YES" and I'll send you the direct link! 

Happy Shopping! 🛒✨`,

        offerTagline: "Flat 25% Off - Today Only! Premium Quality Guaranteed! 🔥"
      };
      
      setMarketingContent(content);
      setIsGenerating(false);
      toast({
        title: "Marketing Content Generated! 🎉",
        description: "Your promotional content is ready to boost sales.",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied! 📋",
      description: `${type} copied to clipboard.`,
    });
  };

  if (!productData) return null;

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/listing-guide")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="bg-gradient-accent p-2 rounded-lg">
              <Megaphone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">AI Gen Ads & Promo Content</h1>
              <p className="text-sm text-muted-foreground">Create engaging marketing content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Product Info */}
        <Card className="mb-6 shadow-elegant border-0 bg-gradient-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              Product Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>Product:</strong> {productData.productName}</p>
              <p><strong>Category:</strong> {productData.category}</p>
            </div>
            <div>
              <p><strong>Platform:</strong> {productData.platform}</p>
              <p><strong>Description:</strong> {productData.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Target Audience Input */}
        <Card className="mb-6 shadow-warm border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Target Audience (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="audience">Who is your ideal customer?</Label>
              <Input
                id="audience"
                placeholder="e.g., working women, college students, fitness enthusiasts"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Leave blank for general audience targeting
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={generateContent}
            disabled={isGenerating}
            className="bg-gradient-accent text-white hover:opacity-90 px-8 py-3 text-lg"
          >
            {isGenerating ? (
              <>
                <Megaphone className="mr-2 h-5 w-5 animate-spin" />
                Generating Promo Content...
              </>
            ) : (
              <>
                <Megaphone className="mr-2 h-5 w-5" />
                Generate Promo Texts
              </>
            )}
          </Button>
        </div>

        {/* Generated Content */}
        {marketingContent && (
          <div className="space-y-6">
            {/* Instagram Caption */}
            <Card className="shadow-warm border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    Instagram Caption
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(marketingContent.instagramCaption, "Instagram Caption")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono">{marketingContent.instagramCaption}</pre>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Message */}
            <Card className="shadow-warm border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    WhatsApp Message
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(marketingContent.whatsappMessage, "WhatsApp Message")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border-l-4 border-green-500">
                  <pre className="whitespace-pre-wrap text-sm">{marketingContent.whatsappMessage}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Offer Tagline */}
            <Card className="shadow-elegant border-0 bg-gradient-primary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Short Offer Tagline
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-primary hover:text-primary"
                    onClick={() => copyToClipboard(marketingContent.offerTagline, "Offer Tagline")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white text-center">{marketingContent.offerTagline}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Marketing Tips */}
        <Card className="mt-8 shadow-elegant border-0 bg-gradient-success">
          <CardHeader>
            <CardTitle className="text-white">📢 Marketing Success Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <ul className="space-y-2 text-sm">
              <li>• Post Instagram content during peak hours (7-9 PM)</li>
              <li>• Send WhatsApp messages to close friends and family first</li>
              <li>• Use offer taglines in stories and status updates</li>
              <li>• Engage with comments and replies quickly</li>
              <li>• Share customer testimonials and reviews</li>
              <li>• Create urgency with limited-time offers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}