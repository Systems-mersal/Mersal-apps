# TajeerPlus Inspection Mobile — How It Works & Build From Scratch

This guide explains how this Expo React Native app is structured, how auth/data/deploy work, and how to recreate a similar app from zero.

---

## 1. What this app is

**TajeerPlus Inspection Mobile** is an Expo (React Native + TypeScript) app for vehicle rental inspection workflows:

- Sign in (Supabase Auth)
- Branch selection (multi-branch)
- Checkout / check-in inspections on contracts
- Exterior & interior damage capture (photos + car sketch markers)
- Vehicle validation checklist
- Inspection reports
- Customers & contracts (via Supabase + a Next.js web API)
- English / Arabic with RTL
- Optional Face ID / fingerprint unlock

**Stack**

| Layer | Tech |
|--------|------|
| App shell | Expo SDK 54, React 19, React Native 0.81 |
| Language | TypeScript |
| Navigation | React Navigation (stack + bottom tabs) |
| Auth + DB | Supabase (`@supabase/supabase-js`) |
| Extra API | Web backend (`EXPO_PUBLIC_WEB_API_BASE_URL`, default `https://demo.mersal.com.sa`) |
| i18n | i18next + react-i18next |
| Secure storage | AsyncStorage + expo-secure-store (biometrics) |
| Builds / store | EAS Build (`eas.json`) |

**Package manager:** use **npm** (`package-lock.json` + `engines.npm`). Prefer deleting `yarn.lock` if present so lockfiles do not diverge.

---

## 2. High-level architecture

```
┌─────────────────────────────────────────────────────────────┐
│  App.tsx                                                     │
│    BranchProvider → AppProvider → AppNavigator               │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
  Not authenticated                      Authenticated
  SignIn / Forgot / OTP / Reset          Tabs + stack screens
        │                                       │
        └─────────── supabase.auth ─────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
      Supabase DB     Web API (SSR)    Storage (photos)
   (direct client)   tajeerWebApi.ts   (damage images)
```

### Entry points

| File | Role |
|------|------|
| `index.ts` | Loads i18n, registers root with Expo |
| `App.tsx` | Providers + navigator + status bar |
| `app.json` | Expo app identity, icons, iOS/Android ids, EAS project |
| `eas.json` | EAS build profiles (dev / preview / production) |
| `metro.config.js` | SVG transformer for car sketches / icons |

### Folders that matter

```
src/
├── navigation/     # AppNavigator (auth gate), TabNavigator, types
├── screens/        # All UI screens
├── components/     # Shared UI (damage modals, car sketch, etc.)
├── context/        # AppContext (inspection state), BranchContext
├── services/       # supabaseService, tajeerWebApi, httpService, mobile* helpers
├── lib/supabase.ts # Supabase client + domain types
├── i18n/ + locales/# EN/AR translations + RTL
├── utils/          # biometricAuth, etc.
└── validation/     # yup schemas for forms

database/schema.sql # Reference DB schema
scripts/            # CLI helpers (cleanup, API smoke tests)
```

---

## 3. Environment & config

Copy `env.example` → `.env` (do not commit secrets).

| Variable | Purpose |
|----------|---------|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `EXPO_PUBLIC_WEB_API_BASE_URL` | Web API origin or `/api` base (default `https://demo.mersal.com.sa`) |

Expo only inlines env vars prefixed with `EXPO_PUBLIC_`.

**Note:** `src/lib/supabase.ts` currently falls back to hardcoded demo URL/key if env is missing. For a new production app, remove hardcoded fallbacks and require `.env`.

`app.json` identity (change these for a new brand):

- `expo.name`, `expo.slug`, `expo.version`
- `ios.bundleIdentifier`, `android.package`
- `extra.eas.projectId`, `owner` (EAS account)

---

## 4. Auth & session

1. User signs in on `SignInScreen` via Supabase Auth.
2. `AppNavigator` listens to `supabase.auth.onAuthStateChange`.
3. On session: sets `isAuthenticated`, stores `userId` / profile in AsyncStorage, updates `BranchContext.setUserId`.
4. Session persists with AsyncStorage adapter in `src/lib/supabase.ts`.
5. Sign-out: if biometrics enabled, local-only logout (keeps server tokens for Face ID); otherwise full `supabase.auth.signOut()`.

Password reset flow (unauthenticated stack):

`ForgotPasswordEmail` → `OtpVerification` → `ResetPassword`

Web API calls go through `httpService.ts`, which attaches:

- `Authorization: Bearer <access_token>`
- Supabase SSR-style cookies (`sb-<projectRef>-auth-token`) so Next.js routes accept the mobile session

On 401 / unauthorized, the client force-logs the user out.

---

## 5. Branch context

`BranchContext`:

- Loads branches the user can access via `tajeerWebApi.getBranches()`
- Persists selection per user: `selectedBranch:<userId>`
- Scopes contract lists and related queries by `branch_id`

Without a selected branch, checkout/check-in lists may be empty or incomplete.

---

## 6. Core domain & data layer

### Supabase (direct)

`src/services/supabaseService.ts` + types in `src/lib/supabase.ts`:

- Vehicles, inspections, damages, contracts, customers (some paths)
- Inspection fields of note: `returnStatus` (validation checklist JSON), `sketchInfo` (car markers), damage counts

### Web API (Next.js)

`src/services/tajeerWebApi.ts` — customers, vehicles search/filters, branches, lookups, contract add-ons, etc.

Prefer the web API when the backend already implements business rules; use Supabase client for inspection/damage writes already wired in the app.

### Main tables (conceptually)

- `vehicles`
- `inspections` (checkout / checkin, status In Progress | Completed)
- `damages` (+ photo URLs)
- `contracts` (status driven by `status_id` UUIDs)
- `customers`
- Contract statuses (lookup table)

See `database/schema.sql` and `SUPABASE_SETUP.md` for setup (SQL + optional `damage-photos` storage bucket).

---

## 7. Navigation map

### Tabs (`TabNavigator`)

| Tab | Screen | Purpose |
|-----|--------|---------|
| Home | `HomeScreen` | Dashboard |
| Inspections | `InspectionsScreen` | List / continue inspections |
| Add | `AddScreen` | Checkout vs check-in contract lists → start inspection |
| Reports | `ReportsScreen` | Completed reports |
| More | `MoreScreen` | Settings, language, security, sign out |

Customers / Contracts are also reachable from tab stack / More.

### Authenticated stack flows

**Normal inspection (close / activate style):**

```
AddScreen (pick contract)
  → setupFromContract / status update
  → AddExteriorDamage
  → (optional SelectCarDamage)
  → InspectionVehicleValidationCheckList
  → InspectionReport
  → CompleteInspection → MainApp
```

**Hold-contract inspection:**

```
AddScreen
  → HoldContractAddExteriorDamage
  → checklist
  → HoldContractInspectionReport
  → MainApp
```

Contract routing uses hard-coded status UUIDs (examples in code):

| Meaning (approx.) | UUID (in codebase) |
|-------------------|--------------------|
| Holding inspection | `8f3270ad-0e2c-45c4-bb4d-c46a157e2804` |
| Holding in progress | `999af929-f4ff-48cb-b209-dad8bc146ccc` |
| Holding completed | `887b62fc-71e7-45d1-85ca-a05ddbd0596d` |
| Closing inspection | `9c806ebf-d8c2-47df-bb4f-9f7d40bbb29a` |
| Closing in progress | `6d3152a0-5206-46c8-a6c0-e4aa05c12e79` |
| Ready for activation | `525e34c6-a9a1-46e0-a3f5-2eccb08a32e5` |
| Post-complete (example) | `517e74b0-83be-4b4a-9f71-ded658a751f0` |

When cloning for a new backend, replace these with your own status IDs (preferably constants in one file, not scatter).

### `AppContext` role

Holds the active vehicle/inspection/damages, checklist data, and helpers:

- `setupFromContract` / `setupFromInspection`
- `addDamage` / `updateDamage` / `completeInspection`
- Status transitions when starting/finishing inspections

---

## 8. i18n & RTL

- Locales under `src/locales/en/*` and `src/locales/ar/*`
- Init in `src/i18n/index.ts` (loaded from `index.ts` before App)
- Language stored in AsyncStorage; Arabic forces RTL via `I18nManager` and may `reloadAppAsync`
- UI strings: `useTranslation()` / `t('namespace.key')`

To add a language: add locale JSON, register in `loadLocales.ts`, extend `AppLocale` in `routing.ts`.

---

## 9. Local development

### Prerequisites

- Node `>=20.19.4` (see `package.json` engines / `.nvmrc`)
- npm `>=10`
- Xcode (iOS) / Android Studio (Android) for device builds
- Expo account for EAS (cloud builds)

### Install & run

```bash
git clone <repo-url>
cd TajeerPlus-Inspection-MobileV2
cp env.example .env   # fill values
npm install
npm start             # Expo dev server
```

Scripts:

| Command | Action |
|---------|--------|
| `npm start` | Expo start |
| `npm run ios` | `expo run:ios` (dev client / native) |
| `npm run android` | `expo run:android` |
| `npm run web` | Expo web |
| `npm run test:web-api` | Smoke-test web API |
| `npm run delete-inspections` | Dangerous DB cleanup script |

**Expo Go vs dev client:** This app uses native modules (`expo-local-authentication`, custom SVG transformer, etc.). Prefer a **development build** (`expo-dev-client` + EAS `development` profile) over plain Expo Go for full fidelity.

---

## 10. Expo / EAS deploy

Configured in `eas.json`:

| Profile | Use |
|---------|-----|
| `development` | Internal, `developmentClient: true`, Node 20.19.4 |
| `preview` | Internal distribution (QA / TestFlight-like / APK install) |
| `production` | Store builds, `autoIncrement: true` |

`appVersionSource: "remote"` — versioning can be managed via EAS.

### One-time setup (new Expo project)

```bash
npm install -g eas-cli
npx expo login
eas init                    # creates / links EAS projectId → app.json extra.eas
eas build:configure         # generates eas.json if missing
```

### Build

```bash
# Internal QA
eas build --platform android --profile preview
eas build --platform ios --profile preview

# Store
eas build --platform all --profile production
```

### Submit to stores

```bash
eas submit --platform ios --profile production
eas submit --platform android --profile production
```

Requires Apple Developer team (`appleTeamId` in `app.json`) and Google Play service account credentials configured in EAS.

### OTA updates (optional)

App depends on `expo-updates`. After configuring a channel/branch in EAS:

```bash
eas update --branch production --message "Bugfix"
```

Only JS/asset updates ship OTA; native module changes need a new binary build.

### CI mental model

1. Change code → PR
2. `eas build --profile preview` for testers
3. Promote → `production` build → `eas submit`
4. Hotfix JS → `eas update` when native shell unchanged

---

## 11. Build a similar app from scratch (checklist)

### A. Bootstrap Expo

```bash
npx create-expo-app@latest MyInspectionApp -t blank-typescript
cd MyInspectionApp
npx expo install expo-dev-client expo-secure-store expo-local-authentication \
  expo-image-picker expo-linear-gradient expo-status-bar expo-updates \
  expo-font @react-native-async-storage/async-storage
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs \
  react-native-screens react-native-safe-area-context react-native-gesture-handler \
  @supabase/supabase-js i18next react-i18next react-native-localize yup
```

Mirror useful pieces from this repo:

- `app.json` structure (bundle ids, plugins, splash/icon)
- `eas.json` profiles
- `metro.config.js` if you need SVG components
- `env.example` + `EXPO_PUBLIC_*` pattern

### B. Wire the app shell

1. `index.ts` → init i18n → `registerRootComponent(App)`
2. `App.tsx` → providers + navigator
3. Auth-gated stack (copy pattern from `AppNavigator.tsx`)
4. Bottom tabs for main areas

### C. Backend

1. Create Supabase project
2. Run / adapt `database/schema.sql`
3. Enable Auth (email/password or your method)
4. Create storage bucket for photos + policies
5. Point mobile env at project URL + anon key
6. If you have a web dashboard API, implement cookie/bearer auth like `httpService.ts`

### D. Implement domain flows in order

1. Sign-in + session restore  
2. Branch pick (if multi-tenant)  
3. List contracts by status / branch  
4. Start inspection → create/link inspection rows  
5. Exterior damage UI + photos  
6. Interior damage (optional)  
7. Validation checklist → save JSON on inspection  
8. Report screen → complete → update contract status  
9. Reports list / detail  
10. i18n + RTL last (or from day one if Arabic is required)

### E. Security before production

- No service-role keys in the app
- Tighten Supabase RLS (current docs note permissive policies)
- Env-only secrets; rotate any keys that were committed historically
- Biometric flow: understand “logout without revoking tokens”

### F. Ship

1. `eas build --profile preview` → internal test  
2. Fix crashes / permissions (camera, biometrics, photos)  
3. `eas build --profile production` → `eas submit`  
4. Document status UUID map and API base URL for your team  

---

## 12. Useful reference files in this repo

| Topic | File(s) |
|-------|---------|
| Providers | `App.tsx` |
| Auth + routes | `src/navigation/AppNavigator.tsx` |
| Tabs | `src/navigation/TabNavigator.tsx` |
| Inspection state | `src/context/AppContext.tsx` |
| Branches | `src/context/BranchContext.tsx` |
| Supabase client | `src/lib/supabase.ts` |
| DB CRUD | `src/services/supabaseService.ts` |
| Web API | `src/services/tajeerWebApi.ts`, `src/services/httpService.ts` |
| Start inspection UX | `src/screens/AddScreen.tsx` |
| Expo identity | `app.json` |
| EAS | `eas.json` |
| Env template | `env.example` |
| Supabase notes | `SUPABASE_SETUP.md` |
| Short README | `README.md` |

---

## 13. Mental model (one paragraph)

The mobile app is a **branch-scoped inspection client**: Supabase owns auth + inspection/damage records; a **web API** supplies branches, lookups, and some CRM/fleet data using the same Supabase session; navigation is a **status-machine over contracts** that opens damage → checklist → report screens; **EAS** produces installable binaries and optional OTA updates. Clone that pattern, replace branding/IDs/API URLs/status UUIDs, and you have a new inspection app without reinventing the shell.
