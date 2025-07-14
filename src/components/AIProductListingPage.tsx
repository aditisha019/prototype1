import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Target, Sparkles, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductData {
  category: string;
  productName: string;
  costPrice: string;
  description: string;
  platform: string;
}

interface GeneratedContent {
  title: string;
  bulletPoints: string[];
  seoDescription: string;
}

export function AIProductListingPage() {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
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
      const content: GeneratedContent = {
        title: `Premium ${productData.productName} - Best Quality ${productData.category} | ${productData.platform}`,
        bulletPoints: [
          `High-quality ${productData.category.toLowerCase()} perfect for daily use`,
          `Durable and long-lasting design with premium materials`,
          `Available in multiple colors and sizes to suit your needs`,
          `Affordable pricing with excellent value for money`,
          `Fast delivery and easy returns on ${productData.platform}`
        ],
        seoDescription: `Buy the best ${productData.productName} online at unbeatable prices! This premium ${productData.category.toLowerCase()} offers exceptional quality, durability, and style. Perfect for modern lifestyle needs. Shop now on ${productData.platform} with fast delivery, easy returns, and secure payment options. Don't miss out on this amazing deal!`
      };
      
      setGeneratedContent(content);
      setIsGenerating(false);
      toast({
        title: "Content Generated! ✨",
        description: "Your AI-powered listing content is ready to use.",
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
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">AI Product Listing</h1>
              <p className="text-sm text-muted-foreground">Generate perfect listing content</p>
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
              <Sparkles className="h-5 w-5 text-primary" />
              Your Product Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>Product Name:</strong> {productData.productName}</p>
              <p><strong>Category:</strong> {productData.category}</p>
              <p><strong>Platform:</strong> {productData.platform}</p>
            </div>
            <div>
              <p><strong>Description:</strong> {productData.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={generateContent}
            disabled={isGenerating}
            className="bg-gradient-primary text-white hover:opacity-90 px-8 py-3 text-lg"
          >
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Target className="mr-2 h-5 w-5" />
                Generate Listing Content
              </>
            )}
          </Button>
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <div className="space-y-6">
            {/* Listing Title */}
            <Card className="shadow-warm border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Listing Title
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.title, "Title")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{generatedContent.title}</p>
              </CardContent>
            </Card>

            {/* Bullet Points */}
            <Card className="shadow-warm border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Key Features (Bullet Points)
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.bulletPoints.join('\n• '), "Bullet Points")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {generatedContent.bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* SEO Description */}
            <Card className="shadow-warm border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  SEO-Optimized Description
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.seoDescription, "Description")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{generatedContent.seoDescription}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tips */}
        <Card className="mt-8 shadow-elegant border-0 bg-gradient-success">
          <CardHeader>
            <CardTitle>💡 Pro Tips for Great Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Use all generated bullet points to highlight key features</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Include relevant keywords from the SEO description</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Add high-quality images to complement your listing</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}