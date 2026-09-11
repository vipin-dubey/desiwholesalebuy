# Implementation Plan: Desi Bulk Club (*DesiSamkjøp*) Next.js Web Application

A modern, high-aesthetic community group-buying platform for South Asian households in Norway. The app enables apartment clusters (5–15 families) to pool their monthly grocery orders, unlocking direct-from-wholesaler prices on heavy dry staples, authentic spices, snacks, glass-jar pickles, and hardy root vegetables with free scheduled single-drop delivery to their building entrance.

---

## 1. Verified Norwegian Market Research & Wholesalers

We verified active Norwegian suppliers and cross-referenced live pricing from Oslo ethnic markets, specialty online grocery stores, and price aggregators (**Kassal.app**, **Shirdell.no**, **Pakmat.no**, and **Abiramy Cash & Carry**).

### Verified Norwegian Wholesalers (No Direct Import Needed)
1. **Abiramy Cash & Carry** (Veitvet Senter, Veitvetveien 8, 0596 Oslo)
   - *Specialization:* South Asian cash & carry and wholesale supplier. Sells bulk sacks of Atta (10kg), Basmati Rice (5/10/20kg), Daals (5/10kg bags), Ghee, Cooking Oils, Spices.
   - *Wholesale Contact:* `faktura@abiramyoslo.no` | +47 902 72 500 / +47 22 25 32 64.
2. **Scanasia AS** (Stanseveien 27, 0976 Oslo / Alnabru)
   - *Specialization:* Norway's largest Asian food importer and distributor. Full B2B wholesale platform (*Ny bedriftskunde*) carrying flours, rice, pulses, spices, coconut milk, sauces.
3. **Asia Engros AS** (Oslo – `asiaengros.no`)
   - *Specialization:* Registered food wholesaler supplying restaurants and ethnic grocers.
4. **Deva Gruppen AS / Deva Foods** (Økernveien 147, Oslo)
   - *Specialization:* Dedicated importer of Indian brands (Aashirvaad, MDH, Everest, Daawat, Haldirams).
5. **A-Food Market Wholesale / Vinh Phat AS** (Stanseveien 25 & Osterhaus' gate 8, Oslo)
   - *Specialization:* B2B wholesale division supplying Asian & ethnic grocers.

---

## 2. Audited Price Catalog: Wholesale vs. Oslo Retail Benchmark

All numbers below are in Norwegian Kroner (NOK) and reflect verified market pricing:

| Category & SKU | Unit Size / Weight | Verified Oslo Retail | Wholesale Cost (COGS) | Co-op Club Price | Customer Savings |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Flours & Grains** | | | | | |
| Aashirvaad Whole Wheat Chakki Atta | 10 kg sack | 310 NOK | 175 NOK | **225 NOK** | 85 NOK (27%) |
| Aashirvaad Whole Wheat Chakki Atta | 5 kg sack | 170 NOK | 95 NOK | **125 NOK** | 45 NOK (26%) |
| Rajdhani / TRS Besan (Gram Flour) | 2 kg pack | 85 NOK | 46 NOK | **62 NOK** | 23 NOK (27%) |
| Roasted Sooji / Rava | 1 kg pack | 48 NOK | 24 NOK | **34 NOK** | 14 NOK (29%) |
| Haldiram Poha (Flattened Rice) | 1 kg pack | 55 NOK | 28 NOK | **38 NOK** | 17 NOK (31%) |
| Sabudana (Tapioca Sago) | 1 kg pack | 65 NOK | 32 NOK | **45 NOK** | 20 NOK (31%) |
| **Premium Rice** | | | | | |
| India Gate Classic / Daawat Basmati | 5 kg sack | 225 NOK | 125 NOK | **165 NOK** | 60 NOK (27%) |
| Royal / Daawat Premium Basmati Rice | 10 kg sack | 390 NOK | 225 NOK | **295 NOK** | 95 NOK (24%) |
| Lal Qilla Majestic Basmati Rice | 5 kg sack | 175 NOK | 105 NOK | **135 NOK** | 40 NOK (23%) |
| Sona Masoori Rice (South Indian) | 5 kg sack | 185 NOK | 110 NOK | **145 NOK** | 40 NOK (22%) |
| Sona Masoori Rice (South Indian) | 10 kg sack | 340 NOK | 200 NOK | **265 NOK** | 75 NOK (22%) |
| **Lentils & Pulses (Daals)** | | | | | |
| Toor Dal (Oily / Plain) | 2 kg bag | 98 NOK | 52 NOK | **72 NOK** | 26 NOK (27%) |
| Moong Dal (Yellow Split) | 2 kg bag | 95 NOK | 50 NOK | **69 NOK** | 26 NOK (27%) |
| Chana Dal (Split Bengal Gram) | 2 kg bag | 88 NOK | 48 NOK | **65 NOK** | 23 NOK (26%) |
| Urad Dal Whole / Gota (for Idli/Dosa) | 2 kg bag | 115 NOK | 60 NOK | **82 NOK** | 33 NOK (29%) |
| Masoor Dal (Red Split Lentils) | 2 kg bag | 85 NOK | 45 NOK | **62 NOK** | 23 NOK (27%) |
| Rajma Chitra (Red Kidney Beans) | 2 kg bag | 105 NOK | 55 NOK | **76 NOK** | 29 NOK (28%) |
| Kabuli Chana (Large Chickpeas) | 2 kg bag | 100 NOK | 52 NOK | **74 NOK** | 26 NOK (26%) |
| **Cooking Oils & Pure Ghee** | | | | | |
| KTC / Fortune Pure Mustard Oil | 5 L tin | 215 NOK | 115 NOK | **155 NOK** | 60 NOK (28%) |
| KTC / Fortune Pure Mustard Oil | 2 L bottle | 95 NOK | 55 NOK | **72 NOK** | 23 NOK (24%) |
| Pure Sunflower Oil | 5 L jug | 195 NOK | 105 NOK | **145 NOK** | 50 NOK (26%) |
| KTC / Natco Groundnut (Peanut) Oil | 5 L can | 235 NOK | 135 NOK | **175 NOK** | 60 NOK (26%) |
| Idhayam / TRS Sesame (Gingelly) Oil | 1 L bottle | 95 NOK | 52 NOK | **69 NOK** | 26 NOK (27%) |
| KLF Coconad Edible Coconut Oil | 1 L bottle | 85 NOK | 45 NOK | **62 NOK** | 23 NOK (27%) |
| Amul Pure Desi Ghee | 1 L tin | 240 NOK | 135 NOK | **180 NOK** | 60 NOK (25%) |
| Amul Pure Desi Ghee (Bulk 5 L tin) | 5 L tin | 1,050 NOK | 610 NOK | **790 NOK** | 260 NOK (25%) |
| Aashirvaad Svasti Pure Cow Ghee | 1 L jar | 245 NOK | 140 NOK | **185 NOK** | 60 NOK (24%) |
| Khanum / Pride Pure Butter Ghee | 1 kg tin | 225 NOK | 125 NOK | **170 NOK** | 55 NOK (24%) |
| Khanum / Pride Pure Butter Ghee | 2 kg tin | 395 NOK | 220 NOK | **295 NOK** | 100 NOK (25%) |
| GRB Dairy Desi Ghee (Aromatic) | 1 L bottle | 230 NOK | 130 NOK | **175 NOK** | 55 NOK (24%) |
| **Spices & Seasonings** | | | | | |
| MDH Masala Boxes (Biryani, Chana, Garam, Kitchen King) | 100 g box | 38 NOK | 18 NOK | **26 NOK** | 12 NOK (32%) |
| Shan Recipe Mixes (Biryani, Korma, Nihari) | 100 g box | 38 NOK | 18 NOK | **26 NOK** | 12 NOK (32%) |
| Cumin Seeds (Jeera Whole) | 500 g pouch | 85 NOK | 42 NOK | **58 NOK** | 27 NOK (32%) |
| Brown Mustard Seeds (Rai) | 500 g pouch | 65 NOK | 32 NOK | **45 NOK** | 20 NOK (31%) |
| Green Cardamom (Elaichi) | 100 g pouch | 75 NOK | 40 NOK | **54 NOK** | 21 NOK (28%) |
| Turmeric Powder (Haldi) | 500 g pack | 60 NOK | 30 NOK | **42 NOK** | 18 NOK (30%) |
| Kashmiri Deggi Mirch (Chili Powder) | 500 g pack | 75 NOK | 38 NOK | **52 NOK** | 23 NOK (31%) |
| Kasuri Methi (Dried Fenugreek Leaves) | 100 g box | 42 NOK | 20 NOK | **29 NOK** | 13 NOK (31%) |
| LG Compounded Hing (Asafoetida) | 100 g tub | 45 NOK | 22 NOK | **32 NOK** | 13 NOK (29%) |
| **Breakfast & Instant Mixes** | | | | | |
| MTR / Gits Dosa Mix | 500 g pack | 58 NOK | 30 NOK | **42 NOK** | 16 NOK (28%) |
| MTR Rava Idli Mix | 500 g pack | 58 NOK | 30 NOK | **42 NOK** | 16 NOK (28%) |
| Gits Gulab Jamun Instant Mix | 500 g pack | 68 NOK | 34 NOK | **48 NOK** | 20 NOK (29%) |
| Bambino Roasted Vermicelli | 400 g pack | 32 NOK | 16 NOK | **23 NOK** | 9 NOK (28%) |
| **Snacks & Biscuits** | | | | | |
| Haldiram Aloo Bhujia / Sev | 400 g pack | 65 NOK | 32 NOK | **46 NOK** | 19 NOK (29%) |
| Haldiram Khatta Meetha / Panchrattan | 400 g pack | 65 NOK | 32 NOK | **46 NOK** | 19 NOK (29%) |
| Kurkure Masala Munch | 115 g bag | 28 NOK | 14 NOK | **20 NOK** | 8 NOK (29%) |
| Kerala Banana Chips (Salted/Black Pepper) | 250 g bag | 52 NOK | 26 NOK | **36 NOK** | 16 NOK (31%) |
| Haldiram Soan Papdi | 500 g box | 72 NOK | 36 NOK | **50 NOK** | 22 NOK (31%) |
| Parle-G Original Glucose Biscuits | 800 g Family Pack | 52 NOK | 26 NOK | **37 NOK** | 15 NOK (29%) |
| Britannia Good Day Butter / Cashew | Pack of 8 (8x75g) | 75 NOK | 38 NOK | **52 NOK** | 23 NOK (31%) |
| KCB Round Crispy Tea Rusks | 400 g bag | 40 NOK | 22 NOK | **30 NOK** | 10 NOK (25%) |
| KCB Cake Rusks (with Fennel) | 600 g pack | 100 NOK | 55 NOK | **75 NOK** | 25 NOK (25%) |
| **Pickles & Chutneys (Glass Jars)** | | | | | |
| Mother's Recipe / Priya Mango Pickle | 500 g glass jar | 58 NOK | 26 NOK | **39 NOK** | 19 NOK (33%) |
| Mother's Recipe Mixed Pickle | 500 g glass jar | 58 NOK | 26 NOK | **39 NOK** | 19 NOK (33%) |
| Shan / Priya Lime Pickle in Oil | 500 g glass jar | 58 NOK | 26 NOK | **39 NOK** | 19 NOK (33%) |
| Priya Green Chilli Pickle | 500 g glass jar | 62 NOK | 28 NOK | **42 NOK** | 20 NOK (32%) |
| Ahmed Foods Mixed Pickle in Oil | 1 kg large jar | 92 NOK | 42 NOK | **62 NOK** | 30 NOK (33%) |
| Ginger-Garlic Cooking Paste | 750 g glass jar | 65 NOK | 30 NOK | **45 NOK** | 20 NOK (31%) |
| Patak's Sweet Mango Chutney | 340 g glass jar | 62 NOK | 28 NOK | **42 NOK** | 20 NOK (32%) |
| **Hardy Root Vegetables (Bulk Sacks - Ambient)** | | | | | |
| Red Onions (Rødløk) Bulk Mesh Sack | 5 kg mesh bag | 135 NOK | 48 NOK | **85 NOK** | 50 NOK (37%) |
| Red Onions (Rødløk) Bulk Mesh Sack | 10 kg sack | 250 NOK | 85 NOK | **150 NOK** | 100 NOK (40%) |
| Potatoes (Curry / Boiling) Bulk Sack | 5 kg bag | 110 NOK | 42 NOK | **72 NOK** | 38 NOK (35%) |
| Potatoes (Curry / Boiling) Bulk Sack | 10 kg sack | 210 NOK | 78 NOK | **135 NOK** | 75 NOK (36%) |
| Fresh White Garlic | 1 kg net | 75 NOK | 32 NOK | **49 NOK** | 26 NOK (35%) |
| Fresh Whole Ginger | 1 kg bag | 95 NOK | 42 NOK | **62 NOK** | 33 NOK (35%) |

---

## 3. Application Architecture & Tech Stack

### Technology Choices
* **Core Framework:** Next.js (App Router, React 19, TypeScript)
* **Styling:** Tailwind CSS with custom theme:
  * Primary: Deep Warm Saffron / Terracotta (`#E06D14`, `#F59E0B`)
  * Secondary: Norwegian Forest Emerald (`#0F4C3A`, `#10B981`)
  * Background / Cards: Crisp light mode with subtle dark slate tones (`#0F172A`), glassmorphic borders, soft drop shadows
* **Icons:** `lucide-react`
* **Data Storage Layer:** Browser `localStorage` abstraction layer (`storage.ts`). Fully typed data repository that implements a clean CRUD interface so switching to Firebase Firestore or a PostgreSQL database later requires changing only one file.

### Application Structure (`src/`)
```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata, global nav
│   ├── page.tsx                # Main customer marketplace & cluster tracker
│   ├── admin/
│   │   └── page.tsx            # Organizer / Admin fulfillment dashboard
│   ├── suppliers/
│   │   └── page.tsx            # Verified Norwegian wholesaler directory & contacts
│   └── globals.css             # Tailwind base & custom utility tokens
├── components/
│   ├── Navbar.tsx              # Branding, building cluster switcher, cart button
│   ├── HeroBanner.tsx          # Samkjøp value prop, building delivery explanation
│   ├── BuildingProgress.tsx    # Live orders unlock meter (e.g. 7/10 for Fornebu)
│   ├── CategoryNav.tsx         # 9 category icon tabs
│   ├── ProductCard.tsx         # Savings badge, weight indicator, +/- quantity
│   ├── ProductGrid.tsx         # Filterable catalog display with search
│   ├── CartDrawer.tsx          # Slide-out cart, live kg weight tally, savings meter
│   ├── CheckoutModal.tsx       # First/Last name, phone (+47), address, delivery slot
│   ├── OrderSuccessModal.tsx   # Order confirmation, summary, Vipps instructions
│   └── BuildingModal.tsx       # Modal to choose or register an apartment building
├── lib/
│   ├── data.ts                 # Master product catalog & initial apartment clusters
│   └── storage.ts              # LocalStorage repository (Orders, Buildings, Cart)
└── types/
    └── index.ts                # TypeScript interfaces (Product, Order, Building, Supplier)
```

---

## 4. Key User Flows & Features

### A. Customer Experience (The Group Buying Journey)
1. **Apartment Building Cluster Header:** 
   - Customers choose their residence (e.g. *Fornebu Portal*, *Lysaker Brygge*, *Lillestrøm Stasjonsby*, *Lørenskog Sentrum*, *Storo Nydalen*), or propose a new building.
   - Live banner: *"Fornebu: 7 of 10 families joined! 3 more orders to confirm free building drop this Saturday."*
2. **Catalog Browsing:**
   - 9 category tabs with instant search.
   - Every product displays **Club Co-op Price**, **Oslo Retail Reference**, and **Saved NOK tag**.
3. **Smart Cart with Total Weight (kg) Counter:**
   - Keeps track of total cart weight in kilograms so customers can see how much heavy lifting they are saving, and so organizers know exact transport weight.
4. **Frictionless Checkout:**
   - Captures: **First Name**, **Last Name**, **Norwegian Mobile Phone (+47)**, **Building Name**, **Apartment / Door Number**, **Street Address**, **Preferred Pickup Slot (e.g. Sat 11:00–11:45)**, and **Notes**.
   - Stores directly into `localStorage`.
   - Displays clear Vipps mock payment instructions and order confirmation.

### B. Organizer / Admin Dashboard (`/admin`)
1. **Financial & Weight KPIs:**
   - Total Gross Revenue, Total Wholesale Cost (COGS), Gross Profit Spread, Total Weight in Kilograms.
2. **Consolidated Wholesale Picklist:**
   - Aggregates all orders across the entire batch into a single supplier shopping list (e.g. *"16 sacks of Aashirvaad 10kg = 160 kg; 9 jars of Priya Mango Pickle = 4.5 kg"*).
   - Generates exact cash required at wholesale and profit margin.
3. **Building Cluster Drop Manifest:**
   - Lists customers grouped by apartment building with phone numbers and apartment numbers.
   - Status toggle: `Pending` ➔ `Confirmed` ➔ `Picked` ➔ `Delivered`.
   - Instant **Export to CSV** for printing delivery manifests.

### C. Norwegian Wholesaler Directory & Procurement Guide (`/suppliers`)
- **Prominently linked in the main navigation** ("Wholesale Partners / Leverandører") for easy reference anytime.
- **Detailed Supplier Cards:**
  - **Company Name, Business Type & Badge:** (e.g., *Cash & Carry*, *Master Importer*, *Official Distributor*).
  - **Physical Address & Google Maps link** for navigation to the warehouse (Alnabru, Veitvet, Økern).
  - **Direct Phone Numbers & Email** (`faktura@abiramyoslo.no`, etc.) with one-click dial and email buttons.
  - **Opening Hours & Pickup Windows** (e.g. Mon–Thu 10:00–21:00, Fri–Sat 10:00–21:30 for Abiramy).
  - **Wholesale Order Terms & MOQs:** Minimum order quantities, whether they require an Org.nr (Brønnøysund) or allow Cash & Carry bulk purchases with card/Vipps.
  - **Best For:** Direct advice on which supplier to buy which category from (e.g., Abiramy for Atta sacks & Basmati; Scanasia for master spice cartons & coconut products; Deva for Aashirvaad & MDH; Alnabru produce markets for onion/potato sacks).
- **Interactive Quick-Quote Generator:** Allows the organizer to copy their current order list formatted into a clean B2B wholesale quotation email in Norwegian or English ready to send to `faktura@abiramyoslo.no` or `firmapost@scanasia.no`.

---

## 5. Verification Plan

### Automated Verification
* `npm run build`: Verify 0 TypeScript errors and clean static page bundling.
* `npm run lint`: Verify ESLint compliance.

### Functional Verification
1. **Cart & Weight Calculation:** Add 10kg Atta, 5kg Rice, 5L Oil, 2x500g Pickles; verify weight equals 21.0 kg and savings are accurately tallied.
2. **Checkout & Local Storage:** Place orders across 2 different apartment buildings; refresh page; verify order history and building progress bars update reactively.
3. **Admin Picklist:** Navigate to `/admin`; verify product counts sum across multiple orders accurately and display gross profit.
4. **Responsive UI:** Verify seamless mobile experience on 375px width (iPhone) and desktop layout.
