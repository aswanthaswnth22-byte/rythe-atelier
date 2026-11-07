# RYTHE ATELIER — BEYOND RETAIL 2050
## Technical audit and implementation plan

**Status:** Audit and proposed architecture prepared. Awaiting owner review.
**Implementation gate:** No application code has been changed for the 2050 experience.

---

## 1. Executive recommendation

Build the experience as a **hybrid immersive showroom with a conventional, accessible commerce layer**, not as a 3D-only store.

The 3D world should provide place, discovery and product storytelling. Product information, selection, cart, customer details and checkout should remain usable through semantic HTML interfaces that work even when WebGL is unavailable.

Recommended foundation:
- Next.js App Router + React + TypeScript.
- Three.js through React Three Fiber for the 3D showroom; add Drei only where it materially reduces complexity.
- Tailwind CSS for the design system and responsive interface.
- GSAP for cinematic transitions; use CSS transitions for simpler interface motion.
- Supabase for application data/authentication if Shopify is not selected as commerce source of truth.
- Shopify Storefront API as the preferred commerce backend if RYTHE will use Shopify for catalogue, inventory and checkout.
- Blender-authored GLB assets, compressed and streamed progressively.

**Important architecture decision:** Do not build custom inventory, payment processing and order administration on Supabase if Shopify is the commerce source of truth. Choose one canonical commerce system. Supabase can still support concierge preferences or non-commerce content if needed.

A credible first release should focus on one polished, navigable showroom with three destinations, three product experiences and a reliable bag. Full conversational AI, elaborate character animation and advanced garment simulation should be later increments, not prerequisites for the first usable prototype.

---

## 2. Existing repository audit

Repository inspected: `aswanthaswnth22-byte/rythe-atelier`  
Default branch: `main`  
Visibility: public  
Observed root structure:

```text
README.md
index.html
styles.css
app.js
cap.png / cap.svg
field.png / field.svg
octopus1.png / octopus1.svg
octopus2.png / octopus2.svg
signal.png / signal.svg
trace.png / trace.svg
void.png / void.svg
images/
```

### Existing application characteristics

The README describes a browser-openable front-end. The HTML provides a single-page shell with navigation, a main application mount, footer, search overlay, mobile menu and cart drawer.

The JavaScript is a hand-written hash-routed storefront. Its product catalogue is a local array; the cart is stored in localStorage. The checkout route is explicitly a demo flow and clears the local cart without a payment or order backend. Newsletter submission is front-end only. Product art paths use an `assets/` prefix, while the root listing shows image/vector files and an `images/` directory; this path convention must be verified before reusing assets.

### Reusable foundations
- Existing brand colours include Deep Plum `#35243A` and Bone `#F5F0EA`.
- Product concepts and catalogue metadata offer a starting point for product records and editorial content.
- Existing product imagery/vector artwork may be reusable after visual and file-integrity review.
- Existing information architecture includes shop, collections, product, lookbook, journal, about, search and cart concepts.
- Existing cart concepts can inform user flows, but localStorage-only cart and demo checkout must not be represented as production commerce.

### Current technical gaps
- No evidence of an installed Next.js / React / TypeScript toolchain in the inspected root listing.
- No component system or typed domain model is visible in the inspected entry points.
- No 3D scene, panorama source images, GLB character/model assets or environment manifests were identified in the repository listing.
- No verified backend, product API, inventory source, checkout provider or authentication configuration was identified.
- No automated test or CI configuration was identified in the root listing.

This is a repository-level audit based on the files and directory entries inspected, not a claim that no unlisted external assets or services exist.

---

## 3. Proposed experience architecture

### Experience layers
1. **Brand / entrance layer** — cinematic identity, ambient sound opt-in, reduced-motion alternative and explicit entry action.
2. **World layer** — 360-degree environment renderer, camera state, environment loading and transition controller.
3. **Navigation layer** — three explicit destinations, hotspots, keyboard/touch navigation and accessible destination menu.
4. **Concierge layer** — AVA interface, stateful character presentation and deterministic guided help first; AI integration only after provider and privacy approach are approved.
5. **Product layer** — product scene anchors connected to canonical product IDs, garment imagery/model, details and accessible selection controls.
6. **Commerce layer** — product availability, selected variant, cart, checkout handoff, order status and error handling from the selected commerce provider.
7. **Content / data layer** — typed environment, hotspot, product and collection records.

### Suggested application structure

```text
src/
  app/
    layout.tsx
    page.tsx
    showroom/page.tsx
    products/[handle]/page.tsx
    api/                         # server routes only when required
  components/
    entrance/
    showroom/
      CanvasExperience.tsx
      EnvironmentLoader.tsx
      Hotspot.tsx
      SceneTransition.tsx
    concierge/
      AvaPanel.tsx
      AvaAvatar.tsx
    product/
      ProductDisplay.tsx
      ProductInspector.tsx
      VariantSelector.tsx
    commerce/
      BagDrawer.tsx
      CartLine.tsx
      CheckoutAction.tsx
    ui/
  lib/
    commerce/
    supabase/                     # only if Supabase is selected
    analytics/
    accessibility/
  data/
    environments.ts
    products.ts
  types/
    commerce.ts
    showroom.ts
  public/
    environments/
    models/
    textures/
    product/
    audio/
```

This is a proposed structure, not a claim about existing files.

---

## 4. 360-degree environment strategy

### Decision: panorama-first for the prototype

Use high-quality equirectangular 360-degree environment images as the first showroom renderer. This provides a strong architectural illusion and reliable panorama interaction without requiring a fully modelled real-time architectural scene at the outset.

- Render each environment as an inward-facing sphere or equivalent panorama surface.
- Use pointer drag and touch drag for yaw/pitch control.
- Clamp vertical camera movement to avoid disorienting rotation.
- Use raycasted hotspots anchored in panorama coordinates.
- Interpolate camera orientation and cross-fade or briefly transition between locations.
- Load only the active panorama and preload the likely next destination.
- Offer a non-WebGL fallback with still imagery and direct destination links.

A complete real-time 3D architectural showroom can be considered later if the desired interactions cannot be represented adequately by panoramic environments.

### Three prototype destinations
1. **THE THRESHOLD** — entrance / orientation space.
2. **THE GALLERY** — central collection space with three product display anchors.
3. **THE ARCHIVE** — material, story and collection exploration space.

These are proposed room names and can be renamed during creative approval.

### Environment assets required

For each destination: one high-resolution equirectangular panorama, final color grade, hotspot coordinate sheet, fallback still image and mobile-optimised derivative. Confirm panorama capture/generation method, rights and target dimensions before production.

---

## 5. Product presentation strategy

For the first prototype, do not require photorealistic, rigged 3D garments for all products. Use a staged fidelity ladder:
- **Prototype:** high-resolution front/back imagery and a rotatable product presentation panel.
- **Next:** curated 3D garment models for hero pieces, exported as GLB and optimised.
- **Later:** fabric/physics simulation only if it directly improves buying confidence and has a viable asset pipeline.

Every product display must resolve to a canonical commerce product and variant. Size, colour, stock and price must come from the commerce source, never hard-coded display-only values in the live experience.

Three products are needed for the acceptance prototype. Product IDs, approved photography, front/back views, colour variants, measurements, price and stock must be supplied or loaded from the selected commerce backend.

---

## 6. Virtual concierge — AVA

### Phased scope
**Prototype:** stylised non-photorealistic avatar or high-quality 2D/3D portrait with idle animation, panel open/close, predefined prompts, context-aware navigation hints and product links.

**Later:** streamed conversational AI responses, speech input/output and more expressive avatar animation.

### Technical and privacy requirements
- Keep provider API keys on the server.
- Do not send payment details, passwords or unnecessary personal information to the model.
- Define conversation storage, retention and deletion controls before launch.
- Provide visible microphone permission and mute controls.
- Provide a text-only alternative.
- Add clear boundaries for product advice and order/account support.

External requirement: select an AI provider, voice provider (if voice is enabled), model, budget, safety settings and privacy/data-retention policy. No provider credentials were found during this audit.

---

## 7. Commerce and backend decision

### Preferred path: Shopify as commerce source of truth

Use Shopify products, variants, inventory and hosted checkout through the Storefront API. This avoids rebuilding payment and inventory infrastructure and keeps sensitive payment entry within the commerce provider's checkout.

Use server-side routes/actions for private tokens and checkout creation. Storefront access tokens should be treated according to their provider-defined scope; Admin API credentials must never enter the browser bundle.

Potential Supabase use: concierge preferences, non-critical profile data or editorial/experience state, only if needed. Avoid duplicating product inventory or order state.

### Alternative: custom commerce backend

Only choose a custom Supabase/Postgres backend if the owner explicitly wants to own catalogue, variant inventory, customer accounts, order state, admin operations, payment integration, tax/shipping rules, webhooks, refunds and operational security. This is a materially larger build and requires a deliberate payment provider and compliance review.

### Payment integrity
- No fake payment success.
- No local 'place order' action presented as a completed purchase.
- Confirm order only after verified server-side provider confirmation/webhook.
- Handle cancelled, failed, pending and successful checkout states separately.

### External decisions / credentials required
- Shopify store and Storefront API configuration, or explicit approval for a custom commerce backend.
- Supabase project and required keys if Supabase is used.
- Payment provider supported by the chosen commerce system and available to the business.
- Email sender / transactional email provider.
- Shipping, tax, refund and privacy policy decisions.
- Production domain and analytics consent requirements.

---

## 8. Performance, accessibility and resilience

### Performance
- Lazy-load the 3D renderer after entrance or user intent.
- Load compressed GLB assets and KTX2/Basis textures where supported by the renderer.
- Use appropriate mesh compression and texture budgets; profile on actual devices.
- Use responsive panorama derivatives and modern image formats.
- Avoid rendering inactive rooms and hidden product models.
- Dispose GPU resources when switching scenes.
- Track initial load, scene-ready time, frame rate, memory use and interaction latency.

### Accessibility
- Semantic HTML for all shopping controls.
- Full keyboard path through entrance, destinations, products, bag and checkout.
- Visible focus treatment and meaningful accessible names.
- Do not encode essential information solely in 3D hotspots.
- Respect `prefers-reduced-motion`.
- Sound disabled by default; provide persistent mute/volume controls.
- Sufficient contrast and touch targets.
- Text-based showroom map/destination list as an alternative to spatial navigation.

### Fallback behaviour

If WebGL is unavailable, the visitor must still be able to enter a simplified editorial showroom, view the three products, choose variants and use the bag. If a panorama or GLB fails, show a branded fallback and retry/navigation option rather than a blank canvas.

---

## 9. Phased development roadmap

Each phase has a review gate. The next phase begins only after the previous phase passes its checks.

### Phase 0 — discovery and approvals (current)
- Audit existing storefront and asset paths.
- Confirm creative direction and prototype scope.
- Choose commerce source of truth.
- Obtain environment, garment and avatar asset plan.
- Confirm devices/browser support baseline.
- Approve architecture and roadmap.

**Exit:** owner approves this document and resolves listed decisions.

### Phase 1 — foundations and design system
- Set up Next.js, TypeScript and build/lint/test commands.
- Establish tokens, typography, responsive shell and accessibility primitives.
- Define typed environment/product/hotspot contracts.
- Build graceful WebGL fallback.

**Verification:** app builds; no console/runtime errors; desktop/mobile layout checks; keyboard/reduced-motion checks.

### Phase 2 — cinematic entrance
- Build identity animation and entry interaction.
- Implement door/threshold transition.
- Add opt-in audio and persistent mute control.
- Add reduced-motion and no-audio paths.

**Verification:** first-load, repeat visit, slow connection, touch, keyboard and reduced-motion tests.

### Phase 3 — showroom navigation
- Build panorama renderer and camera controls.
- Add three locations and hotspot routing.
- Add destination list and smooth scene changes.
- Add lazy loading and fallback imagery.

**Verification:** pointer, touch, keyboard, scene load/failure, orientation changes and mobile performance tests.

### Phase 4 — three product displays
- Place three interactive product anchors in the gallery.
- Add product inspector, front/back views and detail content.
- Add variant selection and cart handoff using canonical product IDs.
- Add keyboard-accessible parallel controls.

**Verification:** all hotspot-to-product mappings, variant persistence, missing image and invalid stock scenarios.

### Phase 5 — bag and checkout integration
- Implement live product/variant retrieval.
- Integrate cart and secure hosted checkout for selected provider.
- Handle errors, cancellations and confirmed order state.
- Implement server-side webhooks and idempotency where required.

**Verification:** sandbox checkout lifecycle, webhook signature validation, duplicate event handling and no false success states.

### Phase 6 — AVA concierge
- Add stylised character and idle/speaking states.
- Add guided prompts and showroom navigation.
- Integrate AI/voice only after provider, budget and privacy approval.

**Verification:** interruption, permission denial, text alternative, API failure and data-retention tests.

### Phase 7 — hardening and release
- Performance profiling on representative desktop and mid-range Android devices.
- Browser compatibility, accessibility and security checks.
- Analytics and consent configuration.
- Production secrets, monitoring, backup and incident plan.
- Final content, policy, asset and order-flow review.

**Exit:** acceptance checklist complete; no critical errors; production operations owner identified.

---

## 10. First-prototype acceptance test matrix

| Requirement | Evidence required |
|---|---|
| Cinematic entrance | Entry action, transition, mute and reduced-motion paths work |
| Working 360-degree environment | Smooth drag/swipe camera control with vertical constraints |
| Three locations | All three locations reachable through hotspots and accessible destination menu |
| Virtual concierge | AVA panel opens, responds to guided prompts and links to relevant destination/product |
| Three product displays | Three anchors visibly map to three product records |
| Product inspection | Front/back or equivalent inspection plus details and variants |
| Working shopping bag | Add/remove/change quantity and accurate selected variants |
| Desktop controls | Mouse and keyboard navigation work |
| Mobile controls | Touch navigation and commerce controls work at mobile viewport sizes |
| Fallback | Product discovery and bag remain usable without WebGL |

---

## 11. Risks and mitigations

| Risk | Mitigation |
|---|---|
| 3D distracts from buying | Keep price, variant and add-to-bag controls clear and accessible outside the canvas |
| Heavy panorama/model assets | Progressive loading, compression, adaptive resolution and device profiling |
| Missing approved 3D assets | Panorama-first architecture and product photography fallback |
| Commerce complexity grows | Choose Shopify or custom backend as the single source of truth |
| Concierge scope becomes open-ended | Start with curated prompts and scoped navigation help |
| Mobile GPU limitations | Reduce texture/model budgets and provide non-WebGL fallback |
| Payment/order integrity | Hosted checkout, server-side verification and webhook validation |
| AI privacy or cost uncertainty | Defer generative/voice integration until provider and policy are approved |

---

## 12. Owner decisions required before implementation

1. **Repository strategy:** continue inside the current `rythe-atelier` repository (recommended for reuse) or create a separate repository manually. The available GitHub connection does not expose a repository-creation action.
2. **Commerce source of truth:** Shopify (recommended for faster, safer commerce integration) or custom Supabase-backed commerce.
3. **Visual environment source:** commissioned/generated equirectangular panoramas for the first release, or Blender-built real-time architectural scenes from the start.
4. **Product assets:** supply three approved prototype products with price, variants, imagery and front/back views; decide which, if any, receive 3D garment models.
5. **AVA scope:** guided non-AI prototype first (recommended) or conversational AI/voice in the first release.
6. **Sound:** commissioned/original ambient sound assets, or silent by default until assets are available.

### Recommended defaults
- Keep development inside `rythe-atelier`.
- Use Shopify as commerce source of truth if a Shopify store already exists.
- Use panorama-first rendering for the first prototype.
- Use three products with image-based front/back inspection first.
- Ship AVA as a guided concierge first; add AI voice after privacy and provider decisions.
- Keep ambient audio opt-in and off by default.

---

## 13. Approval gate

**No implementation has started.**

Review this plan and confirm approval, including any changes to the six owner decisions above. Once approved, implementation should begin with Phase 1 only, followed by a tested review before Phase 2.