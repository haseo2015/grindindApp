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
- **Mai duplicare codice**: se una logica o uno stile si ripete in due o più punti, va estratto (componente condiviso, hook, util) e riusato — non copiato.
- **Tipi sempre in `types/`**: tutte le interfacce/type vanno in una cartella `types/` (a livello di app o di package condiviso `@grindingapp/types`), suddivisa per dominio/argomento (es. `types/order.ts`, `types/user.ts`, `types/service.ts`), non definite ad-hoc dentro i componenti (eccetto le Props del componente stesso, che restano locali).
- **Stato: preferire XState alle machine implicite di React**: evitare `useState`/`useEffect` dove la logica ha stati/transizioni riconoscibili (form multi-step, chiamate di rete, flussi come login/checkout/tracking ordine). Usare una state machine XState per modellare stati e transizioni esplicitamente. `useState` resta accettabile solo per stato UI banale e locale (es. valore di un input non controllato da una macchina); `useEffect` va evitato quando l'alternativa è un side-effect gestito dalla state machine (invocazioni, servizi XState).

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
- [ ] Nessun codice duplicato: logica/stile ripetuti sono estratti e riusati
- [ ] Tipi in `types/` (per dominio), non sparsi nei componenti
- [ ] Stati/transizioni complessi modellati con XState, non `useState`/`useEffect` a catena
- [ ] Test unitari + e2e, coverage ≥ 95%
