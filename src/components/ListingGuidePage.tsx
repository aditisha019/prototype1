import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Target, DollarSign, Megaphone, Sparkles } from "lucide-react";

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
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">{productData.platform} Selling Guide</h1>
              <p className="text-sm text-muted-foreground">AI-powered tools for success</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Great choice! Let's help you sell on {productData.platform} 🎯
          </h2>
          <p className="text-lg text-muted-foreground">
            We've prepared your personalized step-by-step guide for "{productData.productName}"
          </p>
        </div>

        {/* AI Tools */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* AI Product Listing */}
          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm hover:shadow-warm transition-all duration-300 cursor-pointer group"
                onClick={() => navigate("/ai-product-listing")}>
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-primary p-4 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">🎯 AI Product Listing</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Generate perfect listing titles, bullet points, and SEO-optimized descriptions automatically
              </p>
              <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
                Create Listing Content
              </Button>
            </CardContent>
          </Card>

          {/* AI Guided Selling Price */}
          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm hover:shadow-warm transition-all duration-300 cursor-pointer group"
                onClick={() => navigate("/ai-pricing")}>
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-success p-4 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">💰 AI Guided Selling Price</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Get intelligent price recommendations with profit margin insights
              </p>
              <Button className="w-full bg-gradient-success text-white hover:opacity-90">
                Calculate Best Price
              </Button>
            </CardContent>
          </Card>

          {/* AI Gen Ads & Promo Content */}
          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm hover:shadow-warm transition-all duration-300 cursor-pointer group"
                onClick={() => navigate("/ai-marketing")}>
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-primary p-4 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform">
                <Megaphone className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">📢 AI Gen Ads & Promo</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Create engaging Instagram captions, WhatsApp messages, and offer taglines
              </p>
              <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
                Generate Marketing Content
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Product Info Card */}
        <Card className="mt-8 shadow-warm border-0 bg-gradient-subtle">
          <CardHeader>
            <CardTitle>Your Product Details</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>Product:</strong> {productData.productName}</p>
              <p><strong>Category:</strong> {productData.category}</p>
            </div>
            <div>
              <p><strong>Platform:</strong> {productData.platform}</p>
              <p><strong>Cost Price:</strong> ₹{productData.costPrice}</p>
            </div>
          </CardContent>
        </Card>

        {/* Step by Step Guide */}
        <Card className="mt-8 shadow-warm border-0 bg-card">
          <CardHeader>
            <CardTitle>Step by Step Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1 */}
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <h3 className="font-bold text-lg mb-3">Step 1: Sign Up & Set Up Your Seller Account</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Choose the right account type (Individual vs. Business seller, if applicable).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Complete verification (ID, bank details, tax info).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Enable necessary features (Shipping, returns, payment methods).</span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-accent/10 rounded border-l-4 border-accent">
                <p className="text-sm"><span className="font-medium">🔹 Pro Tip:</span> Check seller fees & policies upfront to avoid surprises.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <h3 className="font-bold text-lg mb-3">Step 2: Add Your Product Listing</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">📌</span>
                  <span><strong>Product Title</strong> → Clear, keyword-rich (e.g., "Wireless Bluetooth Earbuds, 50hr Battery, IPX7 Waterproof").</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">📌</span>
                  <span><strong>High-Quality Images</strong> → Use 5-7 images (white background + lifestyle shots).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">📌</span>
                  <span><strong>Videos (if possible)</strong> → Boosts engagement (e.g., demo video).</span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-accent/10 rounded border-l-4 border-accent">
                <p className="text-sm"><span className="font-medium">🔹 Pro Tip:</span> Follow the platform's image size/format guidelines (e.g., Amazon: 1000x1000px).</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <h3 className="font-bold text-lg mb-3">Step 3: Optimize Product Description & Details</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">📝</span>
                  <span><strong>Bullet Points (Key Features)</strong> → Highlight benefits, not just specs.</span>
                </li>
                <div className="ml-6 italic text-sm text-muted-foreground my-2">
                  Example: "✅ 50-hour battery life – Enjoy 5x longer playtime than competitors."
                </div>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">📝</span>
                  <span><strong>Full Description</strong> → Tell a story (problem → solution). Include:</span>
                </li>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Materials, dimensions, warranty, FAQs.</li>
                  <li>SEO Keywords (e.g., "best wireless earbuds for gym").</li>
                </ul>
              </ul>
              <div className="mt-3 p-3 bg-accent/10 rounded border-l-4 border-accent">
                <p className="text-sm"><span className="font-medium">🔹 Pro Tip:</span> Use tools like Helium10 (for Amazon) or SEMrush for keyword research.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <h3 className="font-bold text-lg mb-3">Step 4: Set Competitive Pricing & Offers</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">💰</span>
                  <span><strong>Base Price:</strong> Research competitors (aim for mid-range if new).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">🎁</span>
                  <span><strong>Discounts:</strong> Launch with a limited-time offer (e.g., "15% off first 100 buyers").</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">🚚</span>
                  <span><strong>Shipping Strategy:</strong> Free shipping? Or calculated? (Check platform rules).</span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-accent/10 rounded border-l-4 border-accent">
                <p className="text-sm"><span className="font-medium">🔹 Pro Tip:</span> Use repricer tools (e.g., RepricerExpress) if competing on price.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <h3 className="font-bold text-lg mb-3">Step 5: Launch & Promote Your Listing</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">🚀</span>
                  <span><strong>Internal Traffic:</strong> Use the platform's ads (e.g., Amazon Sponsored Products).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">📢</span>
                  <span><strong>External Traffic:</strong> Share on social media, email lists, or influencers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⭐</span>
                  <span><strong>Get Reviews Fast:</strong> Offer samples or use "Request a Review" button (if available).</span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-accent/10 rounded border-l-4 border-accent">
                <p className="text-sm"><span className="font-medium">🔹 Pro Tip:</span> Run a Giveaway (e.g., "Buy 1, Get 1 Free") to boost initial sales.</p>
              </div>
            </div>

            {/* Bonus */}
            <div className="bg-accent/5 p-4 rounded-lg border border-accent">
              <h3 className="font-bold text-lg mb-3 text-accent">BONUS: Post-Launch Checklist</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Monitor analytics (conversion rate, traffic sources).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Reply to customer Q&A quickly.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Update listing based on reviews/feedback.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="mt-8 text-center p-6 bg-card/30 rounded-2xl backdrop-blur-sm border border-border/50">
          <h3 className="text-xl font-semibold mb-2">Ready to Launch Your Success Story! 🚀</h3>
          <p className="text-muted-foreground">
            Use our AI tools above to create professional listings, set winning prices, and craft compelling marketing content.
          </p>
        </div>
      </div>
    </div>
  );
}