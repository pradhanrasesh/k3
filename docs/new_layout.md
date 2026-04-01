# Rasesh COAs PDF Redaction - Layout Documentation

## Overview

This document describes the layout structure and theme applied across all pages of the Rasesh COAs PDF Redaction application. The goal is to maintain visual consistency with the home page's blue gradient theme and ensure a unified header, sidebar, and PDF viewer experience.

## Header

The header (topbar) is present on all main application pages (Redaction, Batch Redaction, AI Training, Rule Define Studio, PDF Toolbox, Settings). It follows this structure:

```
+-----------------------------------------------------------------------------------------------------------------------+
|  logo   software name      Home    Redaction     AI Training    Rule Define Studio    PDF Toolbox     Settings |
|         tagline                                                                                                         |
+--------------
```

### HTML Structure
- Located in `frontend/html/base/header.html`
- Uses class `topbar` with three sections:
  1. **Left**: Logo button (circle with "R") and software name block (title + subtitle)
  2. **Center**: Navigation links (Home, Redaction, AI Training, Rule Define Studio, PDF Toolbox, Settings)
  3. **Right**: Beta badge

### CSS Styling
- Defined in `frontend/css/parts/header.css`
- Uses CSS custom properties (variables) for theming
- Navigation links have hover and active states with underline indicator
- Background uses `var(--surface)` with subtle border and shadow

## Sidebar (Redaction Page)

The redaction page features a left sidebar containing the upload panel and templates list.

```
+-----------------------------+
|         SIDEBAR             |
|  +----------------------+   |
|  |   1. Upload Panel    |   |
|  |  [Dropzone]          |   |
|  |  [Run Auto Redact]   |   |
|  +----------------------+   |
|                             |
|     Templates List          |
+-----------------------------+
```

### HTML Structure
- Located in `frontend/html/base/sidebar-full.html`
- Contains:
  - Logo and navigation (optional)
  - Upload section with dropzone and action buttons
  - Templates section with company selector and save rule button

### CSS Styling
- Defined in `frontend/css/parts/sidebar.css`
- Uses card-like styling with rounded corners, borders, and shadows
- Background uses `var(--bg-sidebar)`
- Upload panel compact mode for better space utilization

## PDF Viewer

The central area displays PDF pages in a vertical scroll viewer.

```
+--------------------------------------------------------------+
|                     PDF SCROLL VIEWER                        |
|  +--------------------------------------------------------+  |
|  |   PAGE 1 (fits width)                                  |  |
|  |                                                        |  |
|  +--------------------------------------------------------+  |
|  |   PAGE 2 (fits width)                                  |  |
|  |                                                        |  |
|  +--------------------------------------------------------+  |
|  |   PAGE 3 (fits width)                                  |  |
|  |                                                        |  |
|  +--------------------------------------------------------+  |
|                                                              |
+--------------------------------------------------------------+
```

### HTML Structure
- Located in `frontend/html/redaction.html` (and other pages with PDF viewing)
- Uses `viewer-panel` container with:
  - Header with zoom controls, page navigation, search
  - `pdf-scroll-container` for scrolling
  - `pdf-pages-column` stacking individual `page-container` elements

### CSS Styling
- Defined in `frontend/css/parts/viewer.css`
- Background uses `var(--bg-main)` (gradient)
- Each page container uses `var(--surface)` with soft shadow, rounded corners, and subtle border
- Pages are centered horizontally with vertical gap

## Theme Consistency

### Color Variables
All colors are defined in `frontend/css/parts/variables.css` and support light/dark/system themes.

- `--bg-main`: Gradient background (radial + linear)
- `--surface`: Card and panel backgrounds
- `--border-subtle`: Border colors
- `--accent`: Primary accent color (blue)
- `--text-primary`, `--text-secondary`, `--text-muted`: Text colors

### Shadows and Borders
- `--shadow-soft`: Used for cards, panels, page containers
- `--shadow-subtle`: Used for subtle elevations
- Border radius: 18px for cards, 12px for panels, 4px for inputs

### Home Page Influence
The home page (index.html) uses a distinctive blue gradient with animated cards. This theme has been extended to other pages by:
- Applying `--bg-main` to PDF scroll container
- Using card styling (`box-shadow: var(--shadow-soft)`, `border-radius: 18px`) for page containers and sidebar sections
- Implementing the same hover effects (shine animation) on buttons and interactive elements

## Pages Overview

### 1. Home Page (`index.html`)
- Standalone landing page with gradient background and feature cards
- No header; uses its own layout
- Cards link to other pages

### 2. Redaction Page (`html/redaction.html`)
- Header + sidebar + PDF viewer + tools panel
- Implements the full layout described above

### 3. Batch Redaction Page (`html/batch-redaction.html`)
- Uses standalone sidebar (`sidebar-static`) without header
- May be updated in future to include header

### 4. AI Training Page (`html/training.html`)
- Custom header (`training-topbar`) with navigation
- Studio-style layout with side panels
- Retains its own styling but uses same theme variables

### 5. Rule Define Studio Page (`html/rule-define.html`)
- Similar to AI Training page with custom header
- Focus on rule definition interface

### 6. PDF Toolbox Page (`html/pdf-tools.html`)
- Uses the standard header (via layout.js)
- Provides various PDF manipulation tools

### 7. Settings Page (`html/settings.html`)
- Uses header + sidebar navigation
- Configuration options

## Responsive Design

All layouts are responsive with breakpoints defined in `frontend/css/parts/responsive.css`. Sidebar collapses on smaller screens, navigation adapts.

## Future Improvements

- Unify headers across all pages (batch-redaction, training, rule-define) to use the same topbar component
- Ensure consistent spacing and typography
- Extend home page card styling to all interactive panels

## Files Modified

- `frontend/html/base/header.html` – Updated header with navigation
- `frontend/css/parts/header.css` – Added styles for new header layout
- `frontend/css/parts/viewer.css` – Updated PDF scroll container background and page container styling
- `frontend/css/parts/sidebar.css` – No changes, but referenced for sidebar styling

This documentation serves as a reference for developers and designers working on the project.


i want my redaction page will look something like this
+-----------------------------------------------------------------------------------------------------------------------+
TOP HEADER (52px)
|  logo   software name      Home    Redaction     AI Training    Rule Define Studio    PDF Toolbox     Settings  [   Beta   ]|
|         tagline                                                                                                         |
+--------------
┌──────── Sidebar ───────────┐  ┌──────────── Viewer ──────────┐  ┌───────── Tools ─────────┐
│  Upload Panel              │  │  Zoom - Page Nav - Search    │  │  [T] [□] [Barcode]      │
│ •                          │  │  ────────────────────────────│  │     Undo / Redo         │
│                            │  │  PDF Page(s)                 │  │  Auto / Apply / Clear   │
│                            │  │                              │  │                         │
│                            │  │  (full width, scrollable)    │  │     Color Picker        │
│                            │  │                              │  │     Plugins List        │
│ Templates                  │  │                              │  │                         │
└────────────────────────────┘  └──────────────────────────────┘  └─────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│                           FOOTER: Redectio · Local-only                      │
└──────────────────────────────────────────────────────────────────────────────┘


my tools and plugin pannel 
for tools
┌───────── Tools / Plugin ─────────┐
│  [T]                             │  
│  [□]                             │  
│  [Barcode]                       │
│ Undo / Redo                      │
│  Auto                            │  
│  Apply                           │  
│  Clear                           │
└──────────────────────────────────┘

for plugin
┌───────── Tools / Plugin ─────────┐
│  [icone]  CONVERT                │  
│  [icone]  OPTIMIZE               │  
│  [icone]  REDACTION              │
│  [icone]  COMPRESS               │
│  [icone]  SIGN                   │  
│  [icone]                         │  
│  [icone]  DEBUG                  │
└──────────────────────────────────┘

my side bar fro all pages other then redaction page
for regural size
┌──────── Sidebar ─────┐   
│ Upload Panel         │  
│ Templates            │  
└──────────────────────┘ 
for small size
┌──────── Sidebar ────────────────┐  
│ Upload Panel  (icon only)       │  
│ Templates   (icon only)         │  
└─────────────────────────────────┘ 




i want SETTINGS PAGE will look something like this
+-----------------------------------------------------------------------------------------------------------------------+
TOP HEADER (52px)
|  logo   software name      Home    Redaction     AI Training    Rule Define Studio    PDF Toolbox     Settings  [   Beta   ]|
|         tagline                                                                                                         |
+--------------
┌─────── Sidebar (remove ) ─────┐       ┌──────────────────────────── Settings Panel ────────────┐
│                               │       │  Home / Settings                                       │   
│  ─────────────────────────────│       │  [ Appearance ] [ Output ] [ Toolbar ] [ Shortcuts ]   │
│                               │       │  ───────────────── Appearance Tab ───────────────────  │
│                               │       │                       Theme                            │
│                               │       │                                                        │ 
│                               │       │           ○ Light     ○ Dark     ○ System              │
│                               │       │                     UI Density                         │
│                               │       │               ● Comfortable   ○ Compact                │
│                               │       │                Default Redaction Color                 │
│                               │       │               [ ■ black color picker ]                 │
│                               │       │                Sticky Search Bar     [✓]               │
│                               │       │                Auto Highlight Mode   [✓]               │
└───────────────────────────────┘       │                   [ Save Settings ]                    │
┌──────────────────────────────────────────────────────────────┐
│                     FOOTER: Redectio · Local-only            │
└──────────────────────────────────────────────────────────────┘





i want ai training pages will look something like this
+-----------------------------------------------------------------------------------------------------------------------+
TOP HEADER (52px)
|  logo   software name      Home    Redaction     AI Training    Rule Define Studio    PDF Toolbox     Settings  [   Beta   ]|
|         tagline                                                                                                         |
+--------------
┌─────── Sidebar  ──────────────┐       ┌───────────────────ai training pannel───────────────────┐
│                               │       │  original unredected                  redected         │   
│  Upload unredected            │       │  pdf                                    pdf            │
│                               │       │  ──────────(scroll both page togeather)──────────────  │
│                               │       │ │                                                      │
│  upload redected              │       │ │  oriinal           │        redected             │   │ 
│                               │       │ │  unredected        │        pdf                  │   │
│   [Start Training]            │       │ │  pdf               │        full page            │   │
│                               │       │ │  full page         │         maintain the        │   │
│                               │       │ │  maintain the      │         ratio of page       │   │
│                               │       │ │  ratio             │         next page           │   │
│                               │       │ │  next page         │         when scroll         │   │
│                               │       │ │  next page         │         when scroll         │   │
│                               │       │ │  next page         │         when scroll         │   │
│                               │       │ │  next page         │         when scroll         │   │
│                               │       │ │  when scroll       │                             │   │
└───────────────────────────────┘       │ │  [Export to Learned AI Folder] [Finalize & Close]│   │
┌──────────────────────────────────────────────────────────────┐
│                     FOOTER: Redectio · Local-only            │
└──────────────────────────────────────────────────────────────┘



i want Rule Define Studio pages will look something like this
+-----------------------------------------------------------------------------------------------------------------------+
TOP HEADER (52px)
|  logo   software name      Home    Redaction     AI Training    Rule Define Studio    PDF Toolbox     Settings  [   Beta   ]|
|         tagline                                                                                                         |
+--------------
┌─────── Sidebar  ──────────────┐       ┌──────────────────── Rule design ────────────────────┐
│  Upload unredected            │       │               Zoom - Page Nav - Search              │
│                               │       │  ─────────────────────────────────────────────────  │
│                               │       │ │                                               │   │
│      compny name              │       │ │             PDF Page(s)                       │   │ 
│      (name can be edited)     │       │ │                                               │   │
│   [Start Training]            │       │ │                                               │   │
│                               │       │ │                                               │   │
│                               │       │ │                                               │   │
└───────────────────────────────┘       
┌──────────────────────────────────────────────────────────────┐
│                     FOOTER: Redectio · Local-only            │
└──────────────────────────────────────────────────────────────┘



i want pdf tools pages will look something like this

+-----------------------------------------------------------------------------------------------------------------------+
TOP HEADER (52px)
|  logo   software name      Home    Redaction     AI Training    Rule Define Studio    PDF Toolbox     Settings  [   Beta   ]|
|         tagline                                                                                                         |
+--------------
      ┌────────────────── tool cards  ────────────────────────────┐
      │tools name icons and some small detail for that tool       │
      │  ──────────────────────────────────────────────           │
      │                                                           │
      │             all tools cards                               │ 
      │                                                           │
      │                                                           │
      ┌───────────────────────────────────────────────────────────┐
      │                  FOOTER: Redectio · Local-only            │
      └───────────────────────────────────────────────────────────┘

after selecting the tool the page will
+-----------------------------------------------------------------------------------------------------------------------+
TOP HEADER (52px)
|  logo   software name      Home    Redaction     AI Training    Rule Define Studio    PDF Toolbox     Settings  [   Beta   ]|
|         tagline                                                                                                         |
+--------------
┌─────── Sidebar  ────┐       ┌──────────────────── Tool name ──────────────────────┐
│  Upload             │       │               Zoom - Page Nav - tool function       │
│                     │       │  ─────────────────────────────────────────────────  │
│                     │       │ │                                               │   │
│                     │       │ │             PDF Page(s)                       │   │ 
│                     │       │ │                                               │   │
│                     │       │ │                                               │   │
│                     │       │ │                                               │   │
│                     │       │ │                                               │   │       
┌──────────────────────────────────────────────────────────────┐
│                     FOOTER: Redectio · Local-only            │
└──────────────────────────────────────────────────────────────┘




