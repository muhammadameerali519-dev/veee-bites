# AGENTS.md

This file holds instructions and context for any AI agents interacting with the Italy Pizza / Vee Bite web application workspace. It details key specifications, menu item designs, pricing guidelines, image styling principles, and backend operational constraints.

---

## Workspace Context
- **Restaurant Name:** Vee Bite (also referred to as Italy Pizza in local branding highlights).
- **Founded:** 2023 by Muhammad Haris.
- **Location:** Near Rizwan Book Depot, Main Market, Model Town, Gujranwala.
- **Timings:** 1:00 PM to 2:00 AM daily.
- **Google Maps Location:** [https://share.google/kbqjRTFpVB3JswDWG](https://share.google/kbqjRTFpVB3JswDWG)
- **Delivery & Orders WhatsApp Contact:** +92 309 183 0660
- **Delivery Policy:** Flat Rs. 70/- delivery fee inside Model Town, Gujranwala. Other areas are dynamically calculated/charged on call relative to location and KM distance.

---

## Core Brand & UI Guidelines
- **Theme:** Dark theme with premium black/charcoal backgrounds, high-contrast typography, and gold/yellow highlights (`#FFC107`).
- **Aesthetic Pairings:** Modern display fonts paired with clean monospace labels for system details. Rounded cards, subtle border shines, smooth motion transitions, and gorgeous micro-animations.
- **Action Buttons Required:**
  - "Order Now" (Initiates cart checkout and redirects to WhatsApp)
  - "Call Now" (Initiates click-to-call phone dialer)
  - "WhatsApp Us" (Floating floating icon or prominent sticky element)
- **Interactive Features:** Menu category filter system, real-time responsive order cart, automated custom AI Chatbot with local menu knowledge, and dynamic delivery cost selector.

---

## Detailed Food Image & Ingredient Guidelines

### IMPORTANT: Never Repeat Food Images
Every single pizza, burger, wrap, and deal must have its own corresponding exact, realistic image. Do NOT repeat pizza images, guess food appearances, use illustrations, cartoon styles, or generic stock vectors.

### 1. Burgers (Authentic Pakistani Street Style)
- **Chicken Shami Burger (Rs. 280/-):** Soft sesame long bun, chicken shami patty wrapped or layered, shredded cabbage, chutney, ketchup, mayonnaise. Present in traditional street-style paper wrapping/board.
- **Chicken Cheese Shami Burger (Rs. 350/-):** Spiced chicken shami patty, a thick melted cheddar cheese slice, sesame bun, cabbage, premium local sauces. Visible gooey melted cheese is a must.
- **Double Anda Burger (Rs. 220/-):** Two fresh fried eggs fully wrapped or folded elegantly around a slow-grilled meat-and-lentil shami patty, cabbage, mint chutney, house mayo.
- **Chicken Burger (Rs. 320/-):** Realistic crispy golden-fried chicken patty, fresh green lettuce, creamy mayonnaise, soft premium sesame bun.
- **Zinger Burger (Rs. 350/-):** One ultra-crispy giant portion of golden hand-breaded chicken breast fillet, iceberg lettuce, zesty burger dressing.
- **Mighty Zinger Burger (Rs. 600/-):** Double stacked oversized crispy Zinger fillets, double cheddar cheese slices, custom sauces, shredded lettuce, large toasted bun. Must look significantly larger and richer.
- **Patty Burger / Chapli Burger (Rs. 250/-):** Rustic seekh/chapli kabab style patty with uneven crispy edges, dry pomegranate seeds, coriander flecks, fresh tomato, red onion wheels, and green mint raita sauce.

### 2. Pizzas & Special Vee Bites Pies
- **Chicken Tikka Pizza:** Bubbling mozzarella cheese, charred red-orange chicken tikka cubes, red onions, bell pepper slices, green chilies.
- **Chicken Fajita Pizza:** Strips of smoked chicken fajita meat, red/green bell peppers, sweet onions, black olives over premium mozzarella.
- **Chicken Malai Boti Pizza:** Creamy base sauce, succulent chargrilled Malai Boti breast chunks, coriander sprigs, onion rings, rich cheese.
- **Kababish Pizza:** Slices of rustic grilled Seekh Kabab, sweet onion wheels, green chilies, bell peppers, dollops of spicy green mint chutney.

### 3. Wraps, Rolls & Fries
- **Paratha Roll:** Multi-layered flaky golden griddle paratha, barbecue chicken tikka chunks, crisp onion rings, coriander, and thick dabs of mint herb chutney.
- **Zinger Paratha Roll:** Toasted crispy paratha wrap containing shredded golden crispy chicken zinger tenders, spicy garlic-mayo, and onion rings.
- **Masala Fries (Rs. 160/-):** Generous heap of crinkle-cut golden potatoes covered in chatpatta red chilli masala spices, dill, side of garlic mayo.

---

## Developer/Agent Operational Directives
1. **Linter & Compiler:** Maintain absolute TypeScript conformity (`tsc --noEmit`). Ensure there are no unused imports, syntax exceptions, or mismatched tags.
2. **Path Integrity:** Use absolute relative-build assets (e.g., `/assets/images/pakistani_shami_burger_1781786416456.jpg`) for references.
3. **API Integrity:** Keep any internal configurations or prompts fully aligned back to this custom metadata block.
