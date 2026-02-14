# WoW SavedVariables Analytics Dashboard

## Tech Stack
- React + TypeScript + Vite
- Material UI
- PHP 8 backend
- GitHub Codespaces
- Custom Lua → JSON parser

## Project Structure
```txt
backend/
  public/        # PHP endpoints (parse.php, ping.php)
  parser/        # SavedVariablesParser.php

frontend/
  src/
    api/         # uploadSavedVariables.ts
    components/  # UI components
    state/       # Zustand store
    types/       # NormalizedSavedVariables.ts
```

## Development
### Backend
```bash
php -S localhost:8000 -t backend/public
```

### Frontend
```bash
cd frontend
npm run dev
```

### Tests

#### Integrated Upload Test
```bash
npx ts-node scripts/testUpload.ts
```