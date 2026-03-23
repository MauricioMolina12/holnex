# Holnex — CLAUDE.md

## Project Overview

**Holnex** is an Angular 18 e-commerce web application with SSR (Server-Side Rendering) via Express. It follows a feature-based modular architecture with NgRx for state management and Angular Signals for local state.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21.2.5 (module-based, not standalone by default) |
| State Management | NgRx 21.0.1 (Store, Effects, Entity, DevTools) |
| Styling | SCSS with CSS custom properties (light/dark theme) |
| SSR | Angular SSR + Express |
| Backend/Auth | AWS Amplify v6 |
| Icons | Icomoon custom font |
| Skeleton Loading | ngx-skeleton-loader |
| HTTP | Custom `HttpService` wrapper over Angular `HttpClient` |

---

## Running the Project

```bash
npm start                          # Dev server at localhost:4200
npm run start\ network             # Dev server accessible on local network
ng serve -o                        # Dev server and open browser
npm run build                      # Production build
node dist/holnex/server/server.mjs # Serve SSR build
```

---

## Architecture

### Module Structure

The app uses **lazy-loaded feature modules** and a shared component library. No standalone by default — new components should use `NgModule` declarations unless it's a leaf/utility component.

```
app/
├── core/           → Singleton services + global components (NavBar, Footer, GlobalLoader)
├── features/       → Lazy-loaded feature modules
├── shared/         → Reusable components, directives, pipes, styles, models
├── layout/         → App shell (LayoutComponent wraps all authenticated routes)
└── app.module.ts   → Root module with NgRx store root config
```

### Routing

```
'' (AppRoutingModule)
├── '' → LayoutModule (lazy) → wraps all main routes
│   ├── '' → HomeModule (lazy)
│   ├── 'product/:slug' → ProductDetailsComponent
│   ├── 'product' → ProductsModule (lazy)
│   ├── 'category/:slug' → CategoryDetailsComponent (standalone)
│   ├── 'search' → SearchResultsModule (lazy)
│   ├── 'shopcart' → ShopcartModule (lazy)
│   ├── 'profile' → ProfileModule (lazy)
│   └── 'dashboard' → DashboardModule (lazy)
└── 'user' → AuthModule (lazy)
```

Scroll position is restored to top on every navigation (`scrollPositionRestoration: 'top'`).

---

## Key Services

### `HttpService` (`src/app/core/services/http.service.ts`)
Central HTTP wrapper. All API calls go through this service.
- Uses `environment.serverUrl` as base URL, `environment.serverLambdaUrl` for lambda endpoints
- Attaches Bearer token via `getHeaders()`
- 4 retries by default (`baseRetry = 4`)
- Methods: `get()`, `post()`, `put()`, `delete()` — all return `Observable`

**Usage pattern:**
```typescript
this.httpService.get('/endpoint')
this.httpService.post('/endpoint', payload)
```

### `NetworkService` (`src/app/core/services/network.service.ts`)
- Signal-based online/offline detection
- Calls `appService.startApp()` on reconnect after 4s timeout

### `GlobalLoaderService` (`src/app/core/services/global-loader.service.ts`)
- Signal-based full-screen loader
- `show()` / `hide()` methods

### `ThemeService` (`src/app/core/services/theme.service.ts`)
- Signal-based dark/light theme toggle
- SSR-safe (checks `isPlatformBrowser`)
- Applies `.dark` class to `document.body`

---

## State Management (NgRx)

Feature stores are registered in their respective feature modules:

```typescript
// In feature module
StoreModule.forFeature('featureName', featureReducer),
EffectsModule.forFeature([FeatureEffects])
```

**Products store keys:** `'products'`, `'productDetail'`

Pattern: **Action → Effect (API call) → Reducer → Selector**

---

## Styles System

### Global Style Files (loaded via `angular.json`)

| File | Purpose |
|---|---|
| `variables.scss` | CSS custom properties — colors, spacing, shadows (light + dark theme) |
| `breakpoints.scss` | Responsive breakpoints |
| `buttons.scss` | Button base styles |
| `typography.scss` | Font families and heading scales |
| `utilities.scss` | Utility classes (flex, margin, padding, etc.) |
| `skeleton.scss` | Skeleton loader animations |
| `loader.scss` | Global loader styles |
| `positions.scss` | Position utility classes |
| `src/assets/icons/style.css` | Icomoon icon font |

### SCSS Mixins (defined in `styles.scss`)
- `@mixin input-container` — Standard input styling
- `@mixin button-styles($bg, $color, ...)` — Parameterized button
- `@mixin error` — Error message styling

### Theming
Use CSS variables from `variables.scss`. Never hardcode colors. Always use `var(--variable-name)`.

Dark theme is applied by adding `.dark` class to `<body>`.

---

## Icon System (Icomoon)

Icons are a custom font at `src/assets/icons/`.
- Reference icons via CSS classes: `class="icon-name"`
- See `src/assets/icons/style.css` for available classes
- Do not add Font Awesome icons — use Icomoon only

---

## Shared Components

Located in `src/app/shared/components/`. Key components:

| Component | Location | Notes |
|---|---|---|
| `ButtonComponent` | `ui/button` | Use for all buttons |
| `InputComponent` | `ui/input` | Use for all text inputs |
| `DropdownComponent` | `ui/dropdown` | Custom dropdown |
| `ModalComponent` | `modal/` | Modal dialog system |
| `BreadcrumbsComponent` | `breadcrumbs/` | Standalone, signal-based |
| `PaginationComponent` | `pagination/` | Page navigation |
| `QuantitySelectorComponent` | `quantity-selector/` | Product quantity |
| `SearchBarComponent` | `search-bar/` | App-level search |
| `ProductCardComponent` | `products/product-card` | Single product card |
| `ProductsGridComponent` | `products/products-grid` | Grid layout |
| `ProductsSliderComponent` | `products/products-slider` | Carousel |
| `HeroBannerComponent` | `hero-banner/` | Page banners |

---

## Directives

| Directive | Purpose |
|---|---|
| `CloseOutsideDirective` | Close dropdowns/menus on outside click |
| `ZoomImageDirective` | Image zoom on hover |
| `TooltipDirective` | Tooltip on hover (new, exported from LayoutModule) |

---

## Environment Configuration

**Development** (`src/environments/environment.ts`):
```typescript
{
  production: false,
  api: 'https://api.escuelajs.co/api/v1', // Temporary placeholder — replace with real API
  serverUrl: 'https://holnex.com',
  serverLambdaUrl: 'https://api.horizon.com/b/p',
  domain: 'https://develop.horizon.com',
  appDomain: 'http://127.0.0.1:4200'
}
```

> The `api.escuelajs.co` endpoint is a **temporary placeholder** for product data — not the real backend.

---

## Coding Conventions

### Components
- Use `NgModule`-based components (not standalone) unless it's a utility/leaf component
- SCSS file per component — never use inline styles
- Use `OnPush` change detection where possible for performance
- Prefer Angular Signals for local component state; use NgRx for shared/cross-feature state

### Services
- All HTTP calls via `HttpService`, never raw `HttpClient` directly
- Return `Observable` from service methods
- Use `catchError` + `throwError` for error handling

### Naming
- Components: `kebab-case` directories, `PascalCase` class names
- Files: `feature-name.component.ts`, `feature-name.service.ts`, etc.
- Store files: `feature.actions.ts`, `feature.reducer.ts`, `feature.effects.ts`, `feature.selectors.ts`

### Imports
- Add new shared components to the relevant feature module's `imports` array
- Export from `SharedModule` only if used in 3+ places

---

## Feature Modules Status

| Module | Status | Notes |
|---|---|---|
| Home | Active | |
| Products | Active | Has full NgRx store |
| Categories | Active | Standalone component for details |
| Shopcart | Active | Recently overhauled |
| Payments | Active | Static payment methods data |
| Auth | Active | Login, signup, forgot password |
| Profile | Active | Has own store |
| Sellers | Active | Card profile component |
| Search Results | Active | |
| Dashboard | In development | New feature being built |

---

## SSR Considerations

- Always check `isPlatformBrowser` before accessing `window`, `document`, or `localStorage`
- Use `TransferState` for API data that should not be re-fetched on client hydration
- `provideClientHydration()` is enabled in `app.module.ts`

---

## Build Budgets

| Type | Warning | Error |
|---|---|---|
| Initial bundle | 5 MB | 10 MB |
| Component styles | 30 KB | 60 KB |

---

## AWS Amplify

The project integrates AWS Amplify v6 (`aws-amplify`, `@aws-amplify/ui-angular`). Amplify configuration is in the `amplify/` directory. Auth flows for social providers (redirectSignIn/redirectSignOut) are configured per environment.
