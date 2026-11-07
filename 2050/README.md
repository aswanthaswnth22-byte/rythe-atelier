# RYTHE ATELIER — BEYOND RETAIL 2050

A separate Next.js foundation for the RYTHE ATELIER immersive boutique concept. The existing root-level storefront is preserved and remains independent.

## Status

**Phase 1 foundation implemented. Phase 2 cinematic entrance implemented and awaiting automated verification and owner review.**  
Phase 1 branch: `2050/phase-1-foundation`  
Phase 2 branch: `2050/phase-2-cinematic-entrance`.

The architecture and Phase 1 scope have been approved. Phase 2 has been explicitly authorized and implemented on its own branch. Phase 3 remains blocked until the owner reviews Phase 2 and explicitly approves panorama/showroom navigation.

This workspace lives in the `2050/` directory of the existing `rythe-atelier` repository; it is not a separate GitHub repository.

## Documents

- [Technical architecture and implementation plan](./IMPLEMENTATION_PLAN.md)
- [Original master project brief](./MASTER_PROJECT_BRIEF.md)
- [Phase 1 implementation report](./PHASE_1_REPORT.md)
- [Phase 2 implementation report](./PHASE_2_REPORT.md)

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer recommended

## Local development

```bash
cd 2050
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run format
npm run lint
npm run typecheck
npm test
npm run build
```

A GitHub Actions workflow is configured at `.github/workflows/2050-quality.yml` to run lint, type-check, tests and production build. Prettier is configured for local formatting.

## Phase 1 boundaries

This phase establishes the application shell, brand tokens, typed showroom/commerce contracts, and a WebGL capability check with an accessible fallback. It does not include the cinematic entrance, panorama renderer, camera controls, hotspots, product experience, AVA implementation, provider SDKs, payments, inventory, authentication, or orders.

Commerce remains deliberately provider-neutral until a separate decision is made. The typed records under `src/data` are planning fixtures, not production product or inventory data.

## Environment variables

Copy `.env.example` to `.env.local` only if local configuration is needed. Never commit credentials. Phase 1 requires no live service credentials.
