# Future Authentication Plan

This document describes a future sign-in and sign-up feature for the interior painting series pages. It is a planning artifact; the existing app remains unchanged and the files in `src/features/auth/` are intentionally unconnected placeholders.

## Current app context

- The app uses React 19, Vite, and Tailwind CSS 4, with a custom `@theme` palette in `src/index.css`.
- `src/App.tsx` currently selects pages with local state. There is no URL router, authentication provider, or account service.
- Series pages are currently presentational routes selected by page IDs (`nature-spirit`, `science-art`, and `travel-gems`).
- The production Vite base path is `/painting-site-latest/` and the current deployment script publishes a static GitHub Pages site. A client-side router must account for that base path and GitHub Pages' direct-link fallback behavior.

## Recommended stack

**Use Supabase Auth for the identity service, a small React Context adapter for app-wide auth state, and React Router for URL-based route gating.** These are separate layers: Supabase authenticates users, Context makes the resulting state and actions convenient to use in React, and the router maps URLs and redirects unauthenticated visitors.

Why this fits this project:

- Supabase has an official React + Vite setup using `@supabase/supabase-js`; it supports email/password and passwordless sign-in and can later provide a Postgres-backed data layer if private series or bidder data need persistence. Its database authorization should use Row Level Security (RLS), not client-side checks alone. [Supabase React quickstart](https://supabase.com/docs/guides/auth/quickstarts/react), [Supabase Auth overview](https://supabase.com/docs/guides/auth)
- React Context is useful for exposing `user`, `status`, `signIn`, `signUp`, and `signOut` to components. Context is **not** an authentication system by itself and should wrap the Supabase SDK rather than reimplement password/session security.
- React Router supplies URL routes, nested route layouts, and redirect primitives. It is not currently installed, so add it only when converting the page-state navigation to real URL routes. [React Router declarative routing](https://reactrouter.com/start/declarative/routing)

### Alternatives considered

| Option | Good fit when | Trade-off for this app |
| --- | --- | --- |
| React Context only | Authentication is already supplied by a trusted backend and Context only shares its state | It cannot securely verify credentials, issue sessions, or protect data on its own. Do not store passwords or invent a token scheme in the browser. |
| Supabase Auth (recommended) | You want hosted auth with a straightforward React/Vite client and may want a relational data backend later | Requires creating/configuring a Supabase project, redirect URLs, email delivery settings, and database policies for any private data. The browser key is publishable; service-role secrets must stay server-side. |
| Auth0 | You want a managed identity platform with hosted login, social/enterprise identity features, and are comfortable configuring a separate tenant | Adds a provider-specific React SDK and tenant/domain configuration. The official React SDK supports React SPAs and Vite. [Auth0 React quickstart](https://auth0.com/docs/quickstart/spa/react) |
| Firebase Authentication | You already use Firebase or prefer its identity and Google Cloud ecosystem | It is a viable modular Web SDK option, but data rules/storage are Firebase-specific. [Firebase Auth for web](https://firebase.google.com/docs/auth/web/start) |

Before implementation, confirm provider pricing, data-processing/privacy requirements, available email delivery, and whether email/password, magic link, or social sign-in best fits the intended audience.

## Authentication behavior

1. Public pages (home, contact, and any explicitly public series) remain viewable without an account.
2. A visitor who opens a protected `/series/:id` URL is sent to `/login`, with the original path saved as a return destination.
3. A successful login returns the visitor to that series URL; invalid or expired sessions never briefly render protected content while auth state is loading.
4. Sign-up collects only required fields, validates input accessibly, creates the account, and follows the configured email-confirmation flow. Do not imply that an account is verified before the provider confirms it.
5. Sign-out clears the provider session and returns the visitor to a public route.
6. Unknown series IDs render a not-found state after route access is decided.

Decide which series are private before launch. Route protection controls UI navigation; any private series content fetched from an API or database must also be authorized by that backend. A static JavaScript bundle cannot keep secret content confidential once it has been downloaded.

## Route architecture

When ready to implement, install and configure React Router and replace the current page-state switch in `src/App.tsx` in a separate, reviewed change. Keep shared navigation/footer in a layout route. Example target structure:

```jsx
<BrowserRouter basename="/painting-site-latest">
  <Routes>
    <Route element={<SiteLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/series/:id" element={<SeriesRoute />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>
```

The `basename` must match Vite's deployment base. Configure the host to serve the SPA entry point for deep links (or preserve the repository's existing `404.html` fallback behavior) and verify direct visits to `/painting-site-latest/series/nature-spirit` after deployment. `BrowserRouter` route URLs and auth callback/redirect URLs need to agree with the deployed base path.

### ProtectedRoute contract

`ProtectedRoute.jsx` should be a route-layout wrapper, not a security boundary for backend data:

- Read `{ user, status }` from `useAuth()`; use a three-state status such as `loading`, `authenticated`, and `unauthenticated`.
- While status is `loading`, render a calm loading state (or accessible skeleton), never the child route.
- If authenticated, render React Router's `<Outlet />` (or `children` if used as a wrapper).
- If unauthenticated, render `<Navigate to="/login" replace state={{ from: location }} />` so a successful login can return to the original URL.
- Validate the return destination as an internal path before navigating, to avoid open redirects.
- If series access later varies by role or ownership, enforce that policy in the trusted data layer too.

## Auth state and service boundaries

Suggested eventual module layout:

```text
src/features/auth/
  AuthContext.jsx       # Provider, useAuth hook, session subscription
  LoginForm.jsx         # Accessible email/password or chosen sign-in UI
  SignUpForm.jsx        # Registration UI (add when implementation starts)
  ProtectedRoute.jsx    # Router guard
  supabaseClient.js     # Single configured client; no privileged secret
```

`AuthContext` should initialize the current session, subscribe to auth changes, expose explicit pending/error states, and unsubscribe on cleanup. Keep Supabase calls behind a small service/context API so forms do not depend on SDK details. Never place a Supabase service-role key or other privileged secret in a `VITE_*` variable; Vite embeds client variables into the public bundle. Use the publishable/anon key with correctly configured RLS policies. Do not treat a client route guard as authorization for database rows.

## Tailwind UI design schema

Use the existing theme tokens defined in `src/index.css` so the auth screens feel native to the art site:

| Purpose | Existing token / Tailwind utility | Guidance |
| --- | --- | --- |
| Page canvas | `bg-background` (`#FAFAFA`) | Soft neutral page background. |
| Form surface | `bg-surface` (`#FFFFFF`) | White card with subtle border and shadow. |
| Main text | `text-ink` (`#1C1B2E`) | Headings, labels, and primary copy. |
| Supporting text | `text-muted` (`#6B6880`) | Hints, secondary links, and helper copy. |
| Border | `border-border` (`#EDE8D8`) | Inputs, card outline, and dividers. |
| Primary action | `bg-citrus` (`#FFD15C`) or gradient toward `#FFBD2E` | Dark ink text; clear hover and keyboard-focus states. |
| Soft accent | `bg-citrus-soft` (`#FFF6D0`) | Secondary emphasis and icon backgrounds. |
| Error | `#B42318` text with pale red background | Pair color with an error icon/message and `aria-describedby`. |
| Success | `#166534` text with pale green background | Pair color with explicit confirmation copy. |

Tailwind CSS 4 exposes the `@theme` names in `src/index.css` as utilities. Keep font choices consistent with the existing `Fraunces` display headings and `DM Sans` interface/body font.

### Login screen

- Center a responsive card within a `min-h-screen` neutral canvas; use comfortable `p-6 sm:p-8`, a restrained `max-w-md`, rounded corners, and a light border/shadow.
- Show the studio wordmark and a concise “Welcome back” title. Use `font-display` for the title and `font-sans`/default DM Sans for labels and fields.
- Include labeled email and password inputs, an optional show-password control with an accessible name, a password recovery link, a full-width primary submit button, and a sign-up link.
- Inputs should have at least 44px practical touch height, visible `focus-visible` ring, `autocomplete="email"` / `"current-password"`, and inline validation/error text.
- Disable duplicate submission while pending and announce provider errors without exposing internal error details.

### Sign-up screen

- Reuse the same card, spacing, typography, input, and button styles for visual consistency.
- Include email, password, and confirm-password fields only if the chosen provider flow requires them; show password requirements before submission.
- Explain email verification and show a separate “check your inbox” success state after registration when confirmation is enabled.
- Link back to login and include concise privacy/terms links if required by the final product policy.

### Shared interaction and accessibility rules

- Use real `<label>` elements, semantic headings, form submit buttons, keyboard-accessible controls, and sufficient contrast.
- Place focus on the page heading or first invalid field after navigation/submission as appropriate; preserve visible focus indicators.
- Use `aria-invalid` and `aria-describedby` for field errors and `role="status"`/`aria-live` for async state messages.
- Respect reduced-motion preferences; keep animation decorative and nonessential.
- Test at narrow mobile widths and with keyboard-only navigation before release.

## Environment and deployment checklist

- Add `@supabase/supabase-js` and `react-router-dom` only when implementation begins; neither is currently in `package.json`.
- Configure local `.env.local` values such as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`; commit only a redacted `.env.example`.
- Configure Supabase Site URL and allowed redirect URLs for local Vite development and the production GitHub Pages origin/base path.
- Verify email confirmation/recovery links, reload persistence, sign-out, and direct deep links in both local preview and deployed hosting.
- Define RLS policies before exposing any user-specific/private records; verify anonymous and cross-user access is denied.
- Decide how account deletion, personal data retention, and support requests are handled.

## Implementation milestones

1. Confirm which series require login and choose the auth provider/sign-in method.
2. Add React Router and preserve the current app's public behavior while introducing URL routes.
3. Configure Supabase and implement auth context with loading, error, sign-in, sign-up, recovery, and sign-out states.
4. Build Login and Sign-up screens from the UI schema; wire the route wrapper and safe post-login return path.
5. Secure private series data at the backend and configure static-host deep-link/redirect behavior.
6. Verify accessibility, mobile layouts, auth lifecycle, deep links, and authorization policies before enabling the feature.
