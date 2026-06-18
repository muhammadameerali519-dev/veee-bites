import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API chat route using the server-side Gemini API
  app.post("/api/chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.includes("placeholder")) {
        return res.json({
          text: "Assalam-o-Alaikum! I am **Vee Bite Assistant**. 🌟 I am currently in demo mode. To activate my full capabilities via Gemini, please set up a valid `GEMINI_API_KEY` in **Settings > Secrets** in AI Studio! \n\nIn the meantime, I can tell you that our top recommendations are the **Mighty Zinger Burger** (Rs. 600), **Chicken Vee Bite Special Pizza** (Rs. 600/1000/1550), and **Super Value Deal 2** (Rs. 2000). What would you like to order today?"
        });
      }

      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages history format" });
      }

      // Initialize GoogleGenAI SDK on demand helper to prevent cold startup crash
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `You are "Vee Bite Assistant", the premium AI culinary host for VEE BITE Restaurant. 
Our Tagline is "Eat Good, Feel Good". Always remember VEE BITE is styled as a luxury, premium high-comfort dining and fast-food spot from Pakistan.

About VEE BITE:
- Founded: 2023 by Muhammad Haris through dedication, hard work, and struggle. The dream was to serve premium-quality fast food with authentic Pakistani taste.
- Location: Near Rizwan Book Depot, Main Market, Model Town, Gujranwala (Google Maps Location Link: https://share.google/kbqjRTFpVB3JswDWG).
- Timings: 1:00 PM to 2:00 AM daily.
- Delivery & Orders contact / WhatsApp: +92 309 183 0660 (Delivery has a Rs. 70 flat charge in Model Town, and other areas are calculated relative to the location/KM distance)
- Website Created By: Fast Target Co. (Contact: 0314 8418849)

Your behavior rules:
1. Support both English and Urdu (including Roman Urdu like "Aap kia khana pasand karein gey?"). Be extremely polite, hospitality-focused, warm, and inviting.
2. Recommend deals and items:
   - If family or group: Recommend Super Value Deal 4 (2 Large Pizza + 1.5L drink for Rs. 2700) or Deal 2 (1 Large Pizza + 2 Zinger + 1L drink for Rs. 2000) or Special Deal 4.
   - If friends: Special Deal 1 (5 Zingers + Fries + 1.5L drink for Rs. 2000) or Combo Delight (2 Zinger + 4 Nuggets + 2 Drinks for Rs. 950) or Special Deal 5 (3 Shawarma for Rs. 850).
   - If single student: Student Deal (1 Patty Burger + 1 Fries for Rs. 300) or Chapli Deal (Rs. 500).
3. Explain ingredients in detail when asked (e.g., Shami burger contains traditional shami kebab beef patty, cabbage, spices, authentic street sweet-sour chutney. Mighty Zinger has two crispy fillets, double cheese slices, lettuce and dripping sauce!).
4. Direct users to order on the website by adding items to their cart, or help them compile a WhatsApp order! When they decide what they want to order, say: "Fantastic choice! I've summarized your order below. You can click 'Order on WhatsApp' on the floating button/cart to send this directly to our kitchen, or I can generate a pre-formatted message for you."
5. Never hallucinate fake prices or items. Use the official VEE BITE menu only.

Menus List for reference (all prices in PKR / Rs.):
[Regular Pizza (S: 500, M: 850, L: 1400)]: Chicken Tikka, Chicken Fajita, Chicken Hot & Spicy, Chicken Creamy Melt, Chicken Cheese Lover, Chicken Vegi Lover, Chicken Supreme.
[Special Vee Bites Pizza (S: 600, M: 1000, L: 1550)]: Chicken Creamy, Chicken Malai Boti, Chicken Kababish Pizza, Chicken Vee Bite Special.
[Burgers]: Patty Burger (250), Regular Zinger Burger (300), Chicken Chapli Burger (350), Zinger Burger (350), Zinger Burger With Cheese (400), Mighty Zinger Burger (600), Crispy Cheese Patty Burger (320), Crispy Tender Burger (450), Double Tender Burger (650), Chicken Cheese Lava Burger (750), Chicken Burger (320), Double Anda Burger (220), Shami Burger (180).
[Chicken]: Nuggets (10 pcs) (490), Chicken Strips (5 pcs) (550).
[Wraps & Rolls]: Tortilla Wrap (650/450), Chicken Paratha Roll (320), Zinger Paratha Roll (350), Chicken Shawarma (300), Cheese Add On (70), Zinger Shawarma (320), Open Shawarma (500).
[Fries]: Medium Fries (160), Family Fries (250), Loaded Fries (550), Pizza Fries (650), Fries with Sauce S (150)/L (300), White Sauce Filling (50).
[Cheese Sticks]: Small (700), Medium (1000).
[Extras]: Extra Meat & Cheese (S: 110, L: 230), Extra Toppings (80).
[Deals]: 
- Deal 1: 2 Small Pizza 1 Liter Drink (Rs. 1100)
- Deal 2: 1 Large Pizza 2 Zinger Burgers 1 Liter Drink (Rs. 2000)
- Deal 3: 2 Medium Pizza 1 Liter Drink (Rs. 1700)
- Deal 4: 2 Large Pizza 1.5 Liter Drink (Rs. 2700)
- Student Deal: 1 Patty Burger 1 Fries (Rs. 300)
- Zinger Deal: 2 Zinger Burgers (Rs. 650)
- Chapli Deal: 1 Chapli Burger 1 Regular Fries 1 Regular Drink (Rs. 500)
- Combo Delight: 2 Zinger 4 Nuggets 2 Regular Drinks (Rs. 950)
[Special Deals]:
- Deal 1: 5 Zinger Fries 1.5 Liter Drink (Rs. 2000)
- Deal 2: 1 Cheese Zinger Drink Fries (Rs. 500)
- Deal 3: 1 Crispy Tender Fries Regular Drink (Rs. 550)
- Deal 4: 2 Cheese Patty Burgers 2 Patty Burgers 1 Liter Drink (Rs. 1180)
- Deal 5: 3 Chicken Shawarma (Rs. 850)
- Deal 6: 2 Shami Burgers 2 Regular Drinks Fries (Rs. 550)
- Deal 7: 2 Chicken Shawarma Fries 2 Regular Drinks (Rs. 750)
- Deal 8: 3 Paratha Rolls (Chicken: Rs. 900, Zinger: Rs. 1000)

Always give replies that are charming and hospitable. Ask them what cravings they have today! Make sure you keep your response concise so that the user does not get overwhelmed.`;

      // Map our standard ChatMessage structure to Gemini content structure
      const formattedContents = messages.map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      res.status(500).json({ error: "Something went wrong. Please check back later." });
    }
  });

  // Scraping proxy endpoint to dynamically load Dellish Pizza's Mighty Crispy Burger cover image
  app.get("/api/mighty-burger-image", async (req, res) => {
    try {
      // Fetch the actual product page directly to extract the correct WooCommerce uploaded cover asset path
      const response = await fetch("https://www.dellishpizza.com/product/mighty-crispy-burger/", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product page: ${response.status}`);
      }
      
      const html = await response.text();
      
      // 1. Check og:image meta (standard WordPress SEO metadata containing the high-res original cover path)
      const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                      html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
      
      if (ogMatch && ogMatch[1]) {
        return res.redirect(ogMatch[1]);
      }
      
      // 2. Check traditional WooCommerce post thumbnail tags in HTML body
      const wpPostImageMatch = html.match(/class=["'][^"']*wp-post-image[^"']*["'][^>]*src=["']([^"']+)["']/i) ||
                               html.match(/src=["']([^"']+)["'][^>]*class=["'][^"']*wp-post-image[^"']*["']/i);
      
      if (wpPostImageMatch && wpPostImageMatch[1]) {
        return res.redirect(wpPostImageMatch[1]);
      }
      
      // 3. Known direct path backup representing common WordPress uploads
      return res.redirect("https://www.dellishpizza.com/wp-content/uploads/2021/04/mighty-crispy-burger.jpg");
    } catch (e) {
      console.error("Error fetching Dellish Pizza product page image:", e);
      // Clean high-quality aesthetic placeholder fallback if any network timeout or blockage occurs
      return res.redirect("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80");
    }
  });

  // Explicit robust route to serve local food images directly
  app.get("/assets/images/:filename", (req, res) => {
    const filename = req.params.filename;
    const possiblePaths = [
      path.join(process.cwd(), "public", "assets", "images", filename),
      path.join(process.cwd(), "dist", "assets", "images", filename),
      path.join(process.cwd(), "src", "assets", "images", filename)
    ];

    for (const imgPath of possiblePaths) {
      if (fs.existsSync(imgPath)) {
        return res.sendFile(imgPath);
      }
    }
    return res.status(404).send("Image not found");
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    app.use(express.static(path.join(process.cwd(), "public")));
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
