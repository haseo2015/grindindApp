---
name: create-mui-component
description: Convenzioni e procedura per creare un nuovo componente React+TS+MUI in grindindApp (web/admin/mobile)
---

# Creare un componente

Usa questa procedura ogni volta che crei un nuovo componente in `app/web`, `app/admin` o `app/mobile`.

## Struttura file

Ogni componente vive nella propria cartella, con file di stile separato:

```
ComponentName/
  ComponentName.tsx
  style.ts
  index.ts        (re-export: export * from './ComponentName')
```

## Regole di codice

- Componente funzionale tipizzato come `FC<Props>` — non `React.FC`. Importa `React` in alto:
  ```tsx
  import React from 'react'
  import type { FC } from 'react'

  interface ComponentNameProps {
    // props tipizzate, riusa i tipi da @grindingapp/types quando possibile
  }

  export const ComponentName: FC<ComponentNameProps> = (props) => {
    // ...
  }
  ```
- Stile con **styled-components** (o `styled` di MUI se serve integrazione col tema), sempre in `style.ts`:
  ```ts
  // style.ts
  import styled from 'styled-components'

  export const Wrapper = styled.div`
    /* ... */
  `
  ```
- **Niente stringhe hardcodate**: ogni testo/label/valore ripetuto va in una costante (vedi skill i18n/costanti — file `constants.ts` o dizionario di traduzione, mai stringhe inline nel JSX).
- **Tema MUI**: non definire colori/spaziature ad-hoc nel componente. Usa il tema custom centralizzato (file tema separato, es. `theme/index.ts`) via `useTheme()` o gli style props di MUI (`sx`, `theme.palette...`).
- **i18n**: tutto il testo visibile passa dal sistema di traduzione del progetto (nessuna stringa in lingua fissa nel componente).
- Logica riusabile (calcoli, formattazioni, validazioni) va estratta in `@grindingapp/utils`, non duplicata nel componente, ed è testata a parte.

## Test

- Test unitario del componente (render, props, interazioni) accanto al componente o nella suite di test del progetto
- Test end-to-end per i flussi che il componente abilita
- Coverage minimo richiesto: **95%**

## Checklist prima di considerare il componente completo

- [ ] `FC<Props>` con `React` importato in alto
- [ ] Stile in `style.ts` separato
- [ ] Cartella dedicata `ComponentName/`
- [ ] Nessuna stringa hardcodata (costanti + i18n)
- [ ] Usa il tema MUI custom, non valori ad-hoc
- [ ] Utils riusabili estratte e testate
- [ ] Test unitari + e2e, coverage ≥ 95%
