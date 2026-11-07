# MASTER PROJECT BRIEF

# RYTHE ATELIER — BEYOND RETAIL 2050

You are the lead software architect, senior creative developer, 3D web engineer, UI/UX designer, interaction designer and e-commerce engineer.

Your mission is to build a production-quality immersive virtual fashion boutique for RYTHE ATELIER.

This must NOT look or behave like a conventional e-commerce website.

## 1. CREATIVE VISION

Create a hyper-futuristic luxury fashion boutique set in 2050.

The visitor should feel like they are entering a real architectural environment rather than browsing a website.

Visual direction:

- Hyper-futuristic luxury.
- Architectural brutalism.
- Sculptural retail architecture.
- Immersive 360-degree environments.
- Smoked glass, liquid chrome and reflective surfaces.
- Cinematic lighting.
- Minimal futuristic interfaces.
- Premium fashion editorial atmosphere.

Brand identity:

- Deep Plum: #35243A
- Bone: #F5F0EA
- Obsidian: #101014
- Graphite: #29292F
- Chrome: #B8BAC1
- Restrained Violet: #9B72D5

Typography: Neue Montreal / Helvetica Neue inspired.

## 2. CORE EXPERIENCE

Build these systems:

### A. CINEMATIC ENTRANCE

- Full-screen architectural entrance.
- Animated RYTHE identity.
- Interactive entry button.
- Door-opening transition.
- Atmospheric sound design with mute controls.

### B. IMMERSIVE SHOWROOM

- Interactive 360-degree navigation.
- Pan and swipe camera controls.
- Interactive navigation hotspots.
- Multiple connected showroom locations.
- Smooth transitions between environments.
- Mobile and desktop support.

### C. VIRTUAL CONCIERGE — AVA

- Consistent stylised 3D character.
- Animated idle and speaking states.
- Conversational AI integration.
- Optional voice interaction.
- Context-aware product recommendations.
- Ability to direct visitors around the store.

### D. INTERACTIVE PRODUCT DISPLAY

- Floating or sculptural product displays.
- 360-degree garment inspection.
- Front and back views.
- Product detail inspection.
- Size and colour selection.
- Price and fabric information.
- Add-to-cart interaction.

### E. E-COMMERCE

- Shopping cart.
- Product catalogue.
- Inventory integration.
- Customer information.
- Secure checkout.
- Order confirmation.
- Order management.

## 3. TECHNICAL ARCHITECTURE

Preferred stack:

- Next.js
- TypeScript
- React
- Three.js
- Tailwind CSS
- GSAP
- Blender-generated GLB assets
- Supabase
- Shopify Storefront API or an appropriately designed custom commerce backend.

Choose the simplest architecture that achieves the required experience.

Do not introduce unnecessary libraries.

## 4. RESPONSIVE EXPERIENCE

Desktop:

- Immersive full-screen showroom.
- Mouse-controlled panoramic navigation.
- Keyboard navigation.
- Premium transitions.

Mobile:

- Touch-controlled 360-degree viewing.
- Swipe and tap interactions.
- Accessible shopping controls.
- Optimised rendering.
- Lightweight assets.

Both experiences must feel intentionally designed, not like desktop layouts squeezed onto mobile.

## 5. DESIGN QUALITY

Avoid:

- Generic Shopify layouts.
- Gaming-style HUD interfaces.
- Excessive neon.
- Unnecessary gradients.
- Cluttered navigation.
- Generic stock photography.
- Cheap-looking animations.
- Unoptimised 3D assets.

Prioritise:

- Architectural composition.
- Strong visual hierarchy.
- Realistic material presentation.
- Subtle motion.
- Product clarity.
- Consistent brand identity.

## 6. DEVELOPMENT RULES

Before writing code:

1. Inspect the existing project and assets.
2. Identify existing reusable components.
3. Prepare a complete technical architecture.
4. Create a development roadmap.
5. Identify external dependencies and API requirements.
6. Present the implementation plan for approval.

Then implement in independent, testable phases.

Never attempt to build the entire system in one unverified code-generation pass.

After each phase:

- Run the application.
- Check browser errors.
- Test interactions.
- Check responsive behaviour.
- Optimise performance.
- Fix issues before proceeding.

Use reusable components and a clean project structure.

Never expose API keys or secrets in frontend code.

Do not simulate real payments or orders as if they were functional.

## 7. PERFORMANCE REQUIREMENTS

- Lazy-load environments.
- Optimise GLB models and textures.
- Use responsive image assets.
- Provide fallback experiences.
- Support reduced-motion preferences.
- Monitor rendering performance.
- Test on real mobile devices and desktop browsers.

## 8. ACCEPTANCE CRITERIA

The first functional prototype must include:

1. Cinematic entrance.
2. Working 360-degree environment.
3. Three interactive navigation locations.
4. Virtual concierge interface.
5. Three product displays.
6. Interactive product inspection.
7. Working shopping bag.
8. Desktop and mobile controls.

## 9. YOUR ROLE

Think like a world-class digital experience studio.

Do not prioritise writing code quickly over building a coherent experience.

Challenge technically weak decisions.

If a requested feature requires external assets, services or credentials, explain exactly what is needed.

Build the actual application, not merely a design mockup.

Begin by auditing the project and producing the technical implementation plan. Do not start implementing until the plan has been reviewed.
