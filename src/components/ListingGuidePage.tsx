import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Camera, Edit, TrendingUp, Share, Star } from "lucide-react";

interface ProductData {
  category: string;
  productName: string;
  costPrice: string;
  description: string;
  platform: string;
}

export function ListingGuidePage() {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("product_data");
    if (!data) {
      navigate("/sell-online");
      return;
    }
    setProductData(JSON.parse(data));
  }, [navigate]);

  if (!productData) return null;

  const suggestedPrice = Math.round(parseInt(productData.costPrice) * 2.5);

  const steps = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Take Amazing Photos",
      description: `For ${productData.category.toLowerCase()}, focus on:`,
      details: [
        "Use natural lighting or a ring light",
        "Show multiple angles (front, back, close-ups)",
        "Include size/scale references",
        "Keep backgrounds clean and simple",
        "Show the product in use if possible"
      ]
    },
    {
      icon: <Edit className="h-6 w-6" />,
      title: "Write Compelling Description",
      description: "Based on your product, here's what to highlight:",
      details: [
        `Product name: "${productData.productName}"`,
        `Key benefits and features`,
        `Materials/ingredients used`,
        `Size, color, and variant options`,
        `Care instructions or usage tips`
      ]
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Smart Pricing Strategy",
      description: `For ${productData.platform}:`,
      details: [
        `Cost price: ₹${productData.costPrice}`,
        `Suggested selling price: ₹${suggestedPrice}`,
        `Profit margin: ₹${suggestedPrice - parseInt(productData.costPrice)}`,
        `Research competitor prices`,
        `Consider platform fees and shipping`
      ]
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Optimize for Search",
      description: "Make your listing discoverable:",
      details: [
        `Use relevant keywords for ${productData.category}`,
        "Include brand name and model if applicable",
        "Add trending hashtags",
        "Choose the right category",
        "Fill all optional fields"
      ]
    },
    {
      icon: <Share className="h-6 w-6" />,
      title: "Launch & Promote",
      description: "Get your first sales:",
      details: [
        "Share with friends and family first",
        "Join relevant WhatsApp/Facebook groups",
        "Offer launch discounts",
        "Ask for honest reviews",
        "Post on social media"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/product-form")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Your Listing Guide</h1>
              <p className="text-sm text-muted-foreground">Step-by-step success plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Perfect! Here's Your Action Plan 🎯
          </h2>
          <p className="text-lg text-muted-foreground">
            Customized guide for "{productData.productName}" on {productData.platform}
          </p>
        </div>

        {/* Product Summary */}
        <Card className="mb-8 shadow-elegant border-0 bg-gradient-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Your Product Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>Product:</strong> {productData.productName}</p>
              <p><strong>Category:</strong> {productData.category}</p>
              <p><strong>Platform:</strong> {productData.platform}</p>
            </div>
            <div>
              <p><strong>Cost Price:</strong> ₹{productData.costPrice}</p>
              <p><strong>Suggested Price:</strong> ₹{suggestedPrice}</p>
              <p><strong>Potential Profit:</strong> ₹{suggestedPrice - parseInt(productData.costPrice)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <Card key={index} className="shadow-warm border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-gradient-primary p-2 rounded-lg text-white">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Step {index + 1}</span>
                    <h3 className="text-xl">{step.title}</h3>
                  </div>
                </CardTitle>
                <CardDescription className="text-base">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/home")}
            className="bg-gradient-primary hover:opacity-90 text-white font-medium px-8 py-3"
          >
            Start Another Product 🚀
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.print()}
            className="px-8 py-3"
          >
            Print This Guide 📄
          </Button>
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 text-center p-6 bg-card/30 rounded-2xl backdrop-blur-sm border border-border/50">
          <h3 className="text-xl font-semibold mb-2">You're Ready to Succeed! 🌟</h3>
          <p className="text-muted-foreground italic">
            "Success is not just about the destination, but taking the first step. You've taken yours - now let's make it happen!"
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            Remember: Every successful business started with someone believing in their product. We believe in you! 💪
          </p>
        </div>
      </div>
    </div>
  );
}