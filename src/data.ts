import { MenuItem } from './types';

export const CATEGORIES = [
  'Regular Pizza',
  'Special Vee Bites Pizza',
  'Burgers',
  'Chicken',
  'Wraps & Rolls',
  'Fries',
  'Super Value Deals',
  'Special Deals',
  'Sides & Kids'
];

export const MENU_ITEMS: MenuItem[] = [
  // --- REGULAR PIZZA ---
  {
    id: 'pizza-tikka',
    name: 'Chicken Tikka Pizza',
    description: 'Tender chicken tikka chunks marinated in authentic local spices, onions, and lots of premium mozzarella cheese over our signature golden crust.',
    category: 'Regular Pizza',
    price: { S: 500, M: 850, L: 1400 },
    image: '/assets/images/pakistani_tikka_pizza_1781786440012.jpg',
    popular: true
  },
  {
    id: 'pizza-fajita',
    name: 'Chicken Fajita Pizza',
    description: 'Smoked chicken fajita slices, bell peppers, fresh onion rings, and black olives layered with premium Italian mozzarella cheese.',
    category: 'Regular Pizza',
    price: { S: 500, M: 850, L: 1400 },
    image: '/assets/images/pakistani_fajita_pizza_1781786631144.jpg'
  },
  {
    id: 'pizza-spicy',
    name: 'Chicken Hot & Spicy Pizza',
    description: 'Spicy chicken, sizzling capsicum, chopped green chillies, jalapeños, and hot chili oil for our customers who love real spice.',
    category: 'Regular Pizza',
    price: { S: 500, M: 850, L: 1400 },
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza-creamy-melt',
    name: 'Chicken Creamy Melt Pizza',
    description: 'Juicy spiced chicken, layered with melting mozzarella crust and baked in our premium creamy white sauce base.',
    category: 'Regular Pizza',
    price: { S: 500, M: 850, L: 1400 },
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'pizza-cheese-lover',
    name: 'Chicken Cheese Lover Pizza',
    description: 'Double portion of loaded mozzarella and yellow cheddar, seasoned with oregano, with savory grilled chicken chunks.',
    category: 'Regular Pizza',
    price: { S: 500, M: 850, L: 1400 },
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza-veggie-lover',
    name: 'Chicken Vegi Lover Pizza',
    description: 'Diced tomatoes, green peppers, sweet corn, mushrooms, and sliced onions paired with juicy spiced chicken meat.',
    category: 'Regular Pizza',
    price: { S: 500, M: 850, L: 1400 },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza-supreme',
    name: 'Chicken Supreme Pizza',
    description: 'The ultimate combo: chicken tikka, fajita chunks, olives, mushrooms, sweet corn, bell peppers, tomatoes, and extra rich cheese layers.',
    category: 'Regular Pizza',
    price: { S: 500, M: 850, L: 1400 },
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },
  
  // --- SPECIAL VEE BITES PIZZA ---
  {
    id: 'pizza-special-creamy',
    name: 'Chicken Creamy Pizza',
    description: 'Our top-selling special crust pizza layered with heavy cream sauce, chicken tenders, fresh cheese cubes, and parsley.',
    category: 'Special Vee Bites Pizza',
    price: { S: 600, M: 1000, L: 1550 },
    image: 'https://images.unsplash.com/photo-1594007654729-407ededc414a?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'pizza-malai-boti',
    name: 'Chicken Malai Boti Pizza',
    description: 'A luxurious integration of traditional Pakistani Malai Boti cubes, creamy drizzle, coriander, onions, and mild cheese.',
    category: 'Special Vee Bites Pizza',
    price: { S: 600, M: 1000, L: 1550 },
    image: '/assets/images/pakistani_malai_boti_pizza_1781786611477.jpg'
  },
  {
    id: 'pizza-kababish',
    name: 'Chicken Kababish Pizza',
    description: 'Smokey Pakistani Seekh Kabab chunks with thick spices, red onion slivers, green chilies, and dollops of mint chutney sauce layers.',
    category: 'Special Vee Bites Pizza',
    price: { S: 600, M: 1000, L: 1550 },
    image: '/assets/images/pakistani_kababish_pizza_1781786683250.jpg'
  },
  {
    id: 'pizza-veebite-special',
    name: 'Chicken Vee Bite Special Pizza',
    description: 'Our crown jewel. Secret recipe with stuffed crust cheese rim, loaded smoke-bbq chicken, specialty sausages, and house special golden glaze.',
    category: 'Special Vee Bites Pizza',
    price: { S: 600, M: 1000, L: 1550 },
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  // --- BURGERS ---
  {
    id: 'burger-shami',
    name: 'Chicken Shami Burger',
    description: 'An authentic Pakistani street-style Chicken Shami Burger featuring a soft toasted sesame long bun, spiced chicken shami patty, shredded cabbage, mint chutney, ketchup, and creamy mayonnaise.',
    category: 'Burgers',
    price: 280,
    image: '/assets/images/pakistani_shami_burger_1781786416456.jpg'
  },
  {
    id: 'burger-cheese-shami',
    name: 'Chicken Cheese Shami Burger',
    description: 'Authentic Pakistani Chicken Shami Burger with a tender chicken shami patty, a thick melted slice of cheddar cheese, soft sesame bun, cabbage, and premium savory local sauces.',
    category: 'Burgers',
    price: 350,
    image: '/assets/images/pakistani_shami_burger_1781786416456.jpg'
  },
  {
    id: 'burger-eggs-anda',
    name: 'Double Anda Burger',
    description: 'A genuine Pakistani street staple: two fluffy fried eggs wrapped elegantly around a meat-and-lentil shami patty, combined with crisp cabbage, mint chutney, and garlic mayo in a toasted bun.',
    category: 'Burgers',
    price: 220,
    image: '/assets/images/pakistani_shami_burger_1781786416456.jpg'
  },
  {
    id: 'burger-patty',
    name: 'Patty Burger / Chapli Burger',
    description: 'Authentic Pakistani Chapli-style burger using a pan-fried rustic beef or chicken Chapli Kabab patty with crispy edges, tomatoes, onions, and green mint raita sauce.',
    category: 'Burgers',
    price: 250,
    image: '/assets/images/pakistani_chapli_burger_1781786494159.jpg'
  },
  {
    id: 'burger-regular-zinger',
    name: 'Regular Zinger Burger',
    description: 'Crispy deep-fried zinger breast, shredded iceberg lettuce, and zippy sandwich cream in a toasted sesame bun.',
    category: 'Burgers',
    price: 300,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'burger-chapli',
    name: 'Chicken Chapli Burger',
    description: 'Spicy ground chicken chapli kebab infused with dry pomegranate seeds, coriander, grilled tomato slice, and authentic herbs.',
    category: 'Burgers',
    price: 350,
    image: '/assets/images/pakistani_chapli_burger_1781786494159.jpg'
  },
  {
    id: 'burger-zinger',
    name: 'Zinger Burger',
    description: 'Crispy giant golden chicken fillet fried to perfection, layered with creamy dill mayo and shredded fresh crisp iceberg lettuce.',
    category: 'Burgers',
    price: 350,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'burger-crispy-cheese-patty',
    name: 'Crispy Cheese Patty Burger',
    description: 'Our savory crispy patty burger with a generous thick slice of melted cheese over lettuce and tomato.',
    category: 'Burgers',
    price: 320,
    image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'burger-chicken-burger',
    name: 'Chicken Burger',
    description: 'Premium grilled chicken patty, fresh cucumbers, sliced tomatoes, caramelized onions, and house mayonnaise sauce on a buttered artisanal bun.',
    category: 'Burgers',
    price: 320,
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'burger-zinger-cheese',
    name: 'Zinger Burger With Cheese',
    description: 'Premium golden zinger fillet with a slice of melted Swiss/Cheddar cheese, creamy house sauce, and premium garden veggies.',
    category: 'Burgers',
    price: 400,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'burger-crispy-tender',
    name: 'Crispy Tender Burger',
    description: 'Three crispy seasoned chicken tenders lined up in a long bun, layered with jalapeño ranch dressing and lettuce.',
    category: 'Burgers',
    price: 450,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'burger-mighty-zinger',
    name: 'Mighty Zinger Burger',
    description: 'Two massive hand-breaded crispy zinger chicken breast fillets, double cheese slices, crispy onion rings, standard lettuce, dynamic dripping white sauce context.',
    category: 'Burgers',
    price: 600,
    image: '/assets/images/pakistani_mighty_zinger_1781786394547.jpg',
    popular: true
  },
  {
    id: 'burger-double-tender',
    name: 'Double Tender Burger',
    description: 'Double stacked golden crispy chicken breast tenders with loaded southwest special smoky dressing and fresh greens.',
    category: 'Burgers',
    price: 650,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'burger-cheese-lava',
    name: 'Chicken Cheese Lava Burger',
    description: 'Our luxurious centerpiece. Thick chicken patty sitting in a crater of bubbling molten cheddar cheese sauce which bursts open at every single bite.',
    category: 'Burgers',
    price: 750,
    image: '/assets/images/pakistani_cheese_lava_burger_1781786518382.jpg',
    popular: true
  },

  // --- CHICKEN ---
  {
    id: 'chicken-nuggets',
    name: 'Nuggets (10 pcs)',
    description: 'Ten premium crispy golden-brown chicken breast nuggets, crispy on the outside, and served with a side of garlic sauce.',
    category: 'Chicken',
    price: 490,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'chicken-strips',
    name: 'Chicken Strips (5 pcs)',
    description: 'Five thick hand-stretched premium chicken tender strips breaded with our secret spices and loaded with crisp.',
    category: 'Chicken',
    price: 550,
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80'
  },

  // --- WRAPS ---
  {
    id: 'wrap-shawarma-chicken',
    name: 'Chicken Shawarma',
    description: 'Authentic Pakistani street shawarma wrap, slow-shaved roasted chicken chunks, cucumber pickles, garlic mayo sauce rolled inside premium soft pita bread.',
    category: 'Wraps & Rolls',
    price: 300,
    image: '/assets/images/pakistani_chicken_shawarma_1781786551939.jpg',
    popular: true
  },
  {
    id: 'wrap-shawarma-zinger',
    name: 'Zinger Shawarma',
    description: 'Crisp hot zinger chicken fillets chopped on the griddle, mixed with special white sauce and local salad pickle inside soft bread.',
    category: 'Wraps & Rolls',
    price: 320,
    image: '/assets/images/pakistani_zinger_shawarma_1781786572261.jpg'
  },
  {
    id: 'wrap-paratha-roll',
    name: 'Chicken Paratha Roll',
    description: 'Crispy charcoal barbecued chicken boti wrapped with thick cream, mint sauce, and crisp circular purple salad inside a flaky pan-cooked golden paratha.',
    category: 'Wraps & Rolls',
    price: 320,
    image: '/assets/images/pakistani_paratha_roll_1781786462116.jpg'
  },
  {
    id: 'wrap-paratha-zinger',
    name: 'Zinger Paratha Roll',
    description: 'Toasted flaky rich paratha loaded with crispy golden zinger strips, fresh green chillies, onions, and spicy mayo splash.',
    category: 'Wraps & Rolls',
    price: 350,
    image: '/assets/images/pakistani_zinger_paratha_roll_1781786591814.jpg'
  },
  {
    id: 'wrap-tortilla',
    name: 'Tortilla Wrap',
    description: 'Your choice of spicy grilled or deep-fried zinger chicken rolled with cheddar, diced onions, tomatoes, and cream in a toasted jumbo flour tortilla.',
    category: 'Wraps & Rolls',
    price: { S: 450, M: 450, L: 650 }, // Standard (450) and Large (650)
    image: '/assets/images/pakistani_chicken_shawarma_1781786551939.jpg'
  },
  {
    id: 'wrap-shawarma-open',
    name: 'Open Shawarma Platter',
    description: 'Deconstructed spiced chicken shawarma chunks, served alongside soft toasted pita triangles, crisp onions, creamy hummus, and special pickles.',
    category: 'Wraps & Rolls',
    price: 500,
    image: '/assets/images/pakistani_chicken_shawarma_1781786551939.jpg'
  },

  // --- FRIES ---
  {
    id: 'fries-medium',
    name: 'Medium Fries',
    description: 'Fresh hand-chopped premium Pakistani potato sticks, fried until perfectly crisp golden and dusted with our secret chatpatta masala.',
    category: 'Fries',
    price: 160,
    image: '/assets/images/pakistani_masala_fries_1781786663953.jpg'
  },
  {
    id: 'fries-family',
    name: 'Family Fries',
    description: 'A massive shareable platter of golden crispy fries flavored with traditional spices and dual salt seasoning.',
    category: 'Fries',
    price: 250,
    image: '/assets/images/pakistani_masala_fries_1781786663953.jpg'
  },
  {
    id: 'fries-wit-sauce-s',
    name: 'Fries With Sauce (S)',
    description: 'Signature crisp french fries drenched in local chipotle garlic-chili fusion mayo sauce.',
    category: 'Fries',
    price: 150,
    image: '/assets/images/pakistani_masala_fries_1781786663953.jpg'
  },
  {
    id: 'fries-wit-sauce-l',
    name: 'Fries With Sauce (L)',
    description: 'Our deluxe large fries bucket drenched in house special white mayo cheese secret spices.',
    category: 'Fries',
    price: 300,
    image: '/assets/images/pakistani_masala_fries_1781786663953.jpg'
  },
  {
    id: 'fries-loaded',
    name: 'Loaded Fries',
    description: 'Golden fries overloaded with shredded cheese, sliced jalapenos, chopped crispy chicken pieces, and house white-sauce glaze.',
    category: 'Fries',
    price: 550,
    image: '/assets/images/pakistani_masala_fries_1781786663953.jpg',
    popular: true
  },
  {
    id: 'fries-pizza',
    name: 'Pizza Fries',
    description: 'A mouthwatering fusion. French fries topped like a pizza with seasoned chicken tikka chunks, capsicum cubes, supreme pizza sauce, and heavy melted mozzarella.',
    category: 'Fries',
    price: 650,
    image: '/assets/images/pakistani_masala_fries_1781786663953.jpg',
    popular: true
  },

  // --- DEALS ---
  {
    id: 'deal-1',
    name: 'Super Value Deal 1',
    description: 'Get 2 Small Savory Pizzas of any category flavor and 1 Ice-Cold 1 Liter Soft Drink.',
    category: 'Super Value Deals',
    price: 1100,
    image: '/assets/images/pakistani_tikka_pizza_1781786440012.jpg'
  },
  {
    id: 'deal-3',
    name: 'Super Value Deal 3',
    description: 'Fantastic dinner package: 2 freshly-baked Medium Pizzas of any style and a 1 Liter Cold Soft Drink.',
    category: 'Super Value Deals',
    price: 1700,
    image: '/assets/images/pakistani_malai_boti_pizza_1781786611477.jpg'
  },
  {
    id: 'deal-2',
    name: 'Super Value Deal 2',
    description: 'Get 1 Premium Large Pizza, 2 Crispy Zinger Burgers, and an Ice-Cold 1 Liter Soft Drink to share with your family.',
    category: 'Super Value Deals',
    price: 2000,
    image: '/assets/images/pakistani_mighty_zinger_1781786394547.jpg',
    popular: true
  },
  {
    id: 'deal-4',
    name: 'Super Value Deal 4',
    description: 'Our largest bundle: 2 premium freshly baked Large Pizzas of any flavor along with a chilled 1.5 Liter Drink.',
    category: 'Super Value Deals',
    price: 2700,
    image: '/assets/images/pakistani_kababish_pizza_1781786683250.jpg'
  },
  {
    id: 'deal-student',
    name: 'Student Deal Special',
    description: 'One crispy golden Patty Burger paired with direct fresh Masala French Fries. Pocket-friendly taste!',
    category: 'Super Value Deals',
    price: 300,
    image: '/assets/images/pakistani_chapli_burger_1781786494159.jpg'
  },
  {
    id: 'deal-zinger',
    name: 'Double Zinger Deal',
    description: 'Two of our signature giant crispy golden Zinger Burgers. Double the punch!',
    category: 'Super Value Deals',
    price: 650,
    image: '/assets/images/pakistani_mighty_zinger_1781786394547.jpg'
  },
  {
    id: 'deal-chapli',
    name: 'Chapli Kebab Deal',
    description: 'One traditional ground Chapli Burger with crispy regular French Fries and a chilled regular Soft Drink.',
    category: 'Super Value Deals',
    price: 500,
    image: '/assets/images/pakistani_chapli_burger_1781786494159.jpg'
  },
  {
    id: 'deal-combo-delight',
    name: 'Combo Delight Family Pack',
    description: 'Two premium golden Crispy Zingers, four crunchy chicken Nuggets, and two cool Soft Drinks.',
    category: 'Super Value Deals',
    price: 950,
    image: '/assets/images/pakistani_mighty_zinger_1781786394547.jpg',
    popular: true
  },

  // --- SPECIAL DEALS ---
  {
    id: 'spec-deal-1',
    name: 'Special Deal 1: The 5-Zinger Feast',
    description: 'A monster pack of 5 Crispy Zinger Burgers, large crisped Golden Fries bucket, and a cold 1.5 Liter Soft Drink.',
    category: 'Special Deals',
    price: 2000,
    image: '/assets/images/pakistani_mighty_zinger_1781786394547.jpg'
  },
  {
    id: 'spec-deal-2',
    name: 'Special Deal 2: Single Swiss Zinger',
    description: '1 Zinger Burger in loaded cheese, seasoned Golden Fries, and a refreshing chilled Soft Drink.',
    category: 'Special Deals',
    price: 500,
    image: '/assets/images/pakistani_mighty_zinger_1781786394547.jpg'
  },
  {
    id: 'spec-deal-3',
    name: 'Special Deal 3: Crispy Tender Solo',
    description: '1 classic Crispy Tender Burger with loaded ranch, potato golden Fries, and a chilled regular Soft Drink.',
    category: 'Special Deals',
    price: 550,
    image: '/assets/images/pakistani_mighty_zinger_1781786394547.jpg'
  },
  {
    id: 'spec-deal-4',
    name: 'Special Deal 4: Patty Party Stack',
    description: 'Assemble 2 melting Cheese Patty Burgers, 2 traditional grilled Patty Burgers, and a frosty 1 Liter Soft Drink.',
    category: 'Special Deals',
    price: 1180,
    image: '/assets/images/pakistani_chapli_burger_1781786494159.jpg'
  },
  {
    id: 'spec-deal-5',
    name: 'Special Deal 5: Shawarma Trio',
    description: 'Three freshly toasted authentic Shawarmas loaded with grilled meat, garlic hummus dressing, and cucumbers.',
    category: 'Special Deals',
    price: 850,
    image: '/assets/images/pakistani_chicken_shawarma_1781786551939.jpg'
  },
  {
    id: 'spec-deal-6',
    name: 'Special Deal 6: Shami Heritage Pack',
    description: '2 local heritage Anda Shami Burgers, large crinkle-cut Fries box, and 2 regular chilled Soft Drinks.',
    category: 'Special Deals',
    price: 550,
    image: '/assets/images/pakistani_shami_burger_1781786416456.jpg'
  },
  {
    id: 'spec-deal-7',
    name: 'Special Deal 7: Shawarma Dual',
    description: '2 delicious fresh Chicken Shawarmas, seasoned french fries, and 2 regular cold soft drinks.',
    category: 'Special Deals',
    price: 750,
    image: '/assets/images/pakistani_chicken_shawarma_1781786551939.jpg'
  },
  {
    id: 'spec-deal-8-chicken',
    name: 'Special Deal 8: Paratha Roll Chicken Trio',
    description: 'Three delicious warm, flaky golden Paratha rolls filled with tender roasted chicken breast tikka chunks.',
    category: 'Special Deals',
    price: 900,
    image: '/assets/images/pakistani_paratha_roll_1781786462116.jpg'
  },
  {
    id: 'spec-deal-8-zinger',
    name: 'Special Deal 8: Paratha Roll Zinger Trio',
    description: 'Three warm, flaky paratha rolls layered inside with freshly fried crispy zinger chicken chunks.',
    category: 'Special Deals',
    price: 1000,
    image: '/assets/images/pakistani_zinger_paratha_roll_1781786591814.jpg'
  },

  // --- SIDES ---
  {
    id: 'sides-cheese-sticks-s',
    name: 'Mozzarella Cheese Sticks (Small)',
    description: 'Hot baked crispy breaded premium mozzarella logs that pull apart with epic golden strands.',
    category: 'Sides & Kids',
    price: 700,
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4b76ce?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sides-cheese-sticks-m',
    name: 'Mozzarella Cheese Sticks (Medium)',
    description: 'Medium party box of crispy, herb-dusted mozzarella sticks with dipping red marinara sauce.',
    category: 'Sides & Kids',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4b76ce?auto=format&fit=crop&w=800&q=80'
  }
];
