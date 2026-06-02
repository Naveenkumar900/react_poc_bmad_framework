# Photos Dashboard Planning Artifact

## Project Goal
Build a responsive React photos dashboard that uses the JSONPlaceholder photos API to display image cards, support search by title, and provide a detail view for selected items.

## Product Brief
### Who
- Users who need a lightweight image dashboard experience
- Early-stage demo users and testers who want to browse photos quickly

### What
- A responsive React web app
- Fetches JSONPlaceholder photo data from `https://jsonplaceholder.typicode.com/photos`
- Displays a searchable gallery of items with thumbnails
- Shows a detailed view for a selected item

### Why
- Demonstrates a reusable React dashboard pattern with API integration
- Provides search and detail exploration for photo content
- Supports rapid prototyping and UI validation without needing a real backend

## Core Requirements
- Display a list/grid of photo items using the JSONPlaceholder photos endpoint
- Search photos by title in real time
- Show a selected photo’s details including full image, title, album ID, and photo ID
- Keep the UI responsive across desktop and mobile viewports
- Handle loading states and API errors gracefully

## Architecture Summary
### Frontend
- React + Vite
- Single-page layout with two main panels:
  - photo list/search panel
  - selected photo detail panel
- Responsive CSS for desktop and mobile

### Data
- Data source: `https://jsonplaceholder.typicode.com/photos?_limit=120`
- Photo model fields used:
  - `id`
  - `albumId`
  - `title`
  - `thumbnailUrl`
  - `url`

## Epics and Stories
### Epic 1: Photo browsing experience
- Story 1.1: Scaffold React app with Vite
- Story 1.2: Fetch photo data from JSONPlaceholder
- Story 1.3: Display image cards with thumbnails and titles
- Story 1.4: Add visible loading state and error handling

### Epic 2: Search and filtering
- Story 2.1: Add search input UI
- Story 2.2: Implement title-based filtering in the photo list
- Story 2.3: Show result count and empty state for no matches

### Epic 3: Detail view and interaction
- Story 3.1: Implement item selection behavior
- Story 3.2: Display full-size photo detail panel
- Story 3.3: Surface item metadata (photo ID, album ID, source)

### Epic 4: Responsive design and polish
- Story 4.1: Build responsive layout for mobile and desktop
- Story 4.2: Polish card and detail panel styling
- Story 4.3: Ensure readable spacing, cards, and image scaling

## Recommended Output Files
- `frontend/package.json`
- `frontend/vite.config.ts`
- `frontend/index.html`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/styles.css`

## Next Steps
1. Run the React app locally with `npm run dev` in `frontend/`
2. Validate search, selection, and responsive behavior in the browser
3. If desired, add pagination or category filters as the next enhancement
