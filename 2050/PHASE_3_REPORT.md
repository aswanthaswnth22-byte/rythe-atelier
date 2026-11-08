# Phase 3 implementation report

**Project:** RYTHE ATELIER — BEYOND RETAIL 2050  
**Owner authorization:** 2026-11-08  
**Implementation branch:** `2050/phase-3-panorama-showroom`  
**Base:** `2050/phase-2-cinematic-entrance`  
**Scope:** Phase 3 — Showroom navigation only

## Implemented

- Three.js equirectangular panorama renderer using an inward-facing sphere.
- Pointer/touch drag controls for yaw and pitch, with vertical rotation clamped to reduce disorientation.
- Keyboard arrow-key camera controls and explicit look-left, look-right and reset controls.
- Three destinations: The Threshold, The Gallery and The Archive.
- Typed spherical hotspot fixtures projected into the current camera view.
- Hotspot navigation between destinations.
- Persistent destination list, so navigation never depends only on spatial hotspots.
- Responsive mobile/desktop showroom controls.
- WebGL failure state with a clear accessible alternative and working destination navigation.
- Unit tests for angular wrap-around and hotspot projection.
- Phase 2 entrance now transitions into the showroom after the visitor selects ENTER THE ATELIER.

## Important asset limitation

No approved 360-degree environment images were present in the repository when Phase 3 began. To make the renderer and navigation testable, each destination currently uses a locally generated abstract panorama placeholder. These are interaction-development placeholders, **not final architectural photography or approved production environment art**.

Production launch requires three approved equirectangular panoramas, fallback stills and mobile-optimised derivatives. The viewer supports loading panorama image paths once those assets are supplied.

## Deliberate boundaries

This phase does not include:
- Product hotspots or product display/inspection.
- Product catalogue integration, variants, bag or checkout.
- AVA, AI, voice or character animation.
- External panorama sourcing or commissioned production assets.

## Verification

The GitHub Actions workflow has been extended to run on the Phase 3 branch and runs lint, type-check, unit tests and production build. This implementation pass used GitHub file operations and did not execute a local Node.js install/build. Treat Phase 3 as **implemented, pending automated CI verification and owner review** until the workflow result is confirmed.

## Review checklist

- [ ] All three destinations open from the persistent destination list.
- [ ] Pointer and touch drag rotate the view.
- [ ] Vertical camera angle is clamped.
- [ ] Arrow keys and look/reset controls work.
- [ ] Hotspots are projected into view and navigate correctly.
- [ ] WebGL failure leaves destination navigation usable.
- [ ] Mobile and desktop layouts are usable.
- [ ] Lint, type-check, tests and production build pass.
- [ ] Production panorama assets are approved before public launch.

## Approval boundary

Phase 3 is the only new phase implemented on this branch. Do not begin Phase 4 product presentation or inspection until the owner reviews Phase 3 and explicitly approves it.
