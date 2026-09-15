# REKBERIN_AI_CONTEXT

> Repository-scoped context for AI and developer sessions. Keep this file aligned with the canonical project context in the workspace root.

## Project

- Product: Rekberin
- Legacy/PRD name: RekberGG
- Domain: escrow marketplace for eFootball account trading
- Phase: Phase 1 / MVP
- Repository: https://github.com/aufaanggara/jb
- Language: Indonesian
- Development window: 14 days
- Testing window: 7 days
- Team: 4 fullstack developers
- Rule: exactly one assignee per issue

## Source Priority

1. Latest decisions in the workspace root `Rekberin_AI_Context.md`
2. `Rekberin_Rencana_Issue.md`
3. Current repository implementation
4. Non-conflicting requirements in `prd/PRD_RekberGG_Final.md`
5. Historical PRD brainstorming notes

If repository code conflicts with this context, report the conflict before changing behavior.

## Current Decisions

- Use `Rekberin` as the current product name; `RekberGG` is legacy/PRD terminology.
- Buyer authentication is required before creating a transaction.
- Auth roles are `USER`, `ADMIN`, and `SUPER_ADMIN`; do not create separate buyer/seller auth roles automatically.
- Payment-proof upload is required.
- Dynamic QRIS is an experimental sandbox target only; do not claim production payment settlement.
- Chat uses polling for the MVP; do not add WebSocket scope without approval.
- Buyer is the authorized dispute initiator.
- A transaction becomes `COMPLETED` only after buyer confirmation.
- Admins are internal platform staff/partners using one platform fee policy, not independent fee competitors.
- Do not add mobile native, multi-game, affiliate, public API, or live account verification scope without approval.
- Do not place secrets, credentials, passwords, tokens, or personal financial data in the repository.

## Transaction States

```text
PENDING_PAYMENT -> PAYMENT_CONFIRMED -> IN_HANDOVER -> PENDING_BUYER_CONFIRM -> COMPLETED
```

Exceptional states:

- Active transaction state -> `CANCELLED` by an authorized admin or super admin.
- `PAYMENT_CONFIRMED`, `IN_HANDOVER`, or `PENDING_BUYER_CONFIRM` -> `DISPUTED` by the buyer.

Important rules:

- Store important status changes as transaction activity/timeline data.
- Chat is available only to transaction participants and is inactive after `COMPLETED` or `CANCELLED`.
- Protect transaction, admin, listing-edit, upload, and chat routes with authentication and authorization.

## Team Ownership

| Member | Ownership |
|---|---|
| Ibrahim | DEV-01 to DEV-04: transaction, QRIS, handover, dispute |
| Bagas | DEV-05 to DEV-08: database, authentication/role, listing, marketplace integration |
| Afiq | DEV-09 to DEV-12: chat, review/rating, notifications/status, CI/CD |
| Aufa | DEV-13 to DEV-16 and TEST-01 to TEST-02: dashboards and testing |

Do not silently reassign issues or add a second assignee.

## DEV-12 Status and Work Completed

DEV-12 is owned by Afiq: prepare GitHub Actions so code changes are checked consistently.

Completed on branch `feat/dev-12-ci-cd`:

- Added `typecheck` script to `package.json`:
  - `tsc --noEmit`
- Added `.github/workflows/ci.yml`.
- CI triggers on pull requests and pushes to `main`.
- CI uses Node.js 20 and `npm ci` with the committed lockfile.
- CI runs `npm run typecheck` and `npm run build`.
- Local `npm run typecheck` passed.
- Local `npm run build` passed.
- CI branch was pushed to `origin/feat/dev-12-ci-cd`.
- Commit: `7b1d3bb chore: add CI workflow`.
- The Pull Request CI check is green; review and merge into `main` are still required unless already completed.

Environment variable documentation already exists in `.env.example`. Do not commit `.env` or `.env.local`.

## Next Work for Afiq

After DEV-12 is reviewed and merged:

### DEV-09 - Transaction Chat

Dependencies: DEV-01, DEV-05, DEV-06.

- Create APIs to send and fetch messages.
- Restrict access to buyer, seller, and assigned admin of the transaction.
- Connect the existing chat UI to persisted messages.
- Use polling with a reasonable interval.
- Disable sending after transaction completion or cancellation.

### DEV-10 - Review and Rating

Dependencies: DEV-03, DEV-05, DEV-06.

- Save rating and optional comment through an API.
- Allow reviews only for eligible completed transactions.
- Display review history and a simple average rating.

### DEV-11 - Notifications and Page States

Dependencies: DEV-07, DEV-08, DEV-09, DEV-10.

- Add success/failure toast feedback.
- Add loading, empty, and error states to major flows.
- Keep messages understandable and consistent with the existing UI.

## Working Rules

- Inspect the existing repository and preserve the current UI where practical; it is mostly built and still contains dummy data.
- Prefer existing framework and helper patterns.
- Keep changes scoped to the assigned issue.
- Validate with the narrowest relevant check after each edit.
- For issue descriptions, use the required structure: Deskripsi, Assignee, Pembagian Tugas, Tasks, Definition of Done.
- Do not claim sandbox payment work is production-ready.
