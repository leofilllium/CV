# ClubHub: portfolio source review

Reviewed September 11, 2026. Scope: a focused read of the private `leofilllium/game-hub` repository and the public [clubhub.uz](https://clubhub.uz) landing page. No production account, booking, payment, or station operation was performed.

## What the project does

ClubHub brings gaming-club discovery, individual seat reservations, and club operations into one system. Its Next.js application serves players and staff; its NestJS API coordinates inventory, pricing, availability, bookings, and administration. Players can also enter through a Telegram Mini App. The public site shows the booking journey and an explicitly illustrative seat-map example.

## Evidence behind the case study

| Portfolio statement                                                     | Repository evidence reviewed                                                                                                                                   |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js / React frontend, NestJS backend, TypeScript                    | `frontend/package.json`, `backend/package.json`                                                                                                                |
| PostgreSQL / PostGIS, Drizzle, Redis, BullMQ, Socket.io                 | Package manifests and `backend/README.md`                                                                                                                      |
| Player app, Telegram entry, admin console, QR check-in                  | `frontend/README.md`, `backend/README.md`, `docs/desktop/implementation-status.md`                                                                             |
| Overlapping seat reservations prevented in PostgreSQL                   | `docs/architecture/0001-postgres-exclusion-constraint-owns-the-no-double-booking-rule.md`, `backend/src/modules/booking/application/create-booking.service.ts` |
| Versioned floor-plan editing, undo history, shared flat / 2.5D geometry | `docs/architecture/0016-versioned-floorplan-scenery-and-shared-geometry.md`, `frontend/src/features/admin/floorplan/components/FloorplanBuilder.tsx`           |
| Russian, Uzbek, and English UI                                          | `docs/frontend/localization.md`                                                                                                                                |

The most useful engineering story for a reviewer is consistency: the player’s selected seat, the staff floor plan, and the booking interval must agree under concurrent requests. The case study explains how database constraints, temporary holds, live updates, and versioned edits address that problem.

## Scope kept out of the public claims

Payme and Click adapters exist in the reviewed implementation, alongside an outbox design for payment settlement. Their presence does not establish merchant certification or verified live transactions. No payment throughput or processing claim was added.

A companion Windows station client is documented as a preview with physical acceptance and rollout gates still pending. The website case study describes the web and API work without presenting the desktop client as a completed production kiosk system.

No seeded club counts, test counts, revenue, adoption figures, or concurrency timing were promoted as independently verified results. The featured metric is the three implemented interface languages. Private code was read for analysis, not copied into this repository; authentication was held only in the review process.
