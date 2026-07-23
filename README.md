# mersal-car

A car-rental mobile app built with Expo (SDK 57), React Native, TypeScript, and Expo Router. The UI is currently driven by mock data (`src/data/mock.ts`); there is no backend wired in yet.

## Stack

| Layer | Tech |
|-------|------|
| App shell | Expo SDK 57, React 19, React Native 0.86 |
| Routing | Expo Router (file-based, `app/`) |
| Styling | NativeWind (Tailwind) + custom theme (`src/theme`) |
| Data fetching | TanStack Query (`@tanstack/react-query`) + axios (mock data today) |
| State | Zustand |
| Forms | react-hook-form + zod |
| i18n | Custom `LocaleProvider` (`src/localization`), Arabic + English |
| Fonts | Tajawal (`@expo-google-fonts/tajawal`) |

## Project structure

```
app/                 # Expo Router routes (entry: expo-router/entry)
  _layout.tsx        # Providers: SafeArea, QueryClient, Locale, fonts, Stack
  (tabs)/            # Home, bookings, notifications, profile
  (auth)/            # login, otp
  details/, booking/, listing, search, favorites, company, confirmation
src/
  screens/           # Screen implementations rendered by routes
  components/         # Shared UI (Button, Card, Header, Badge, ...)
  theme/             # colors, spacing, radius, shadows, typography
  localization/      # i18n provider + ar/ + en/ JSON
  data/mock.ts       # Mock cars/bookings
  lib/               # query-client, nativewind setup
  types/             # Domain types
assets/              # App icon, adaptive icons, splash, favicon
```

## Prerequisites

- Node >= 20
- Xcode (iOS) / Android SDK (only for local native builds)

## Develop

```bash
npm install
npm start          # Expo dev server
npm run ios        # build + run on iOS simulator (native)
npm run android    # build + run on Android
npm run web        # web
```

Because the app uses native modules, prefer a development build over Expo Go.

## Build a shareable Android APK (EAS cloud)

Requires an Expo account (`owner` in `app.json` is set to `khlood36`).

```bash
npm i -g eas-cli
npx expo login                 # log in as khlood36
eas build -p android --profile preview
```

The `preview` profile outputs an APK (`eas.json`). EAS returns a download link you can share; the recipient sideloads it (enable "Install unknown apps").

## Notes

- `APP_FROM_SCRATCH.md` describes a different project (a Supabase-based inspection app) and does not match this codebase.
- App identity lives in `app.json` (`name`, `slug`, `owner`, `ios.bundleIdentifier`, `android.package`, `extra.eas.projectId`).
