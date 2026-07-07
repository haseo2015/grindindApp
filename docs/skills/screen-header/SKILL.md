---
name: screen-header
description: Pattern di default per header (titolo centrato + freccia back) e bottom bar delle schermate mobile — entrambi sempre visibili, eccetto la home
---

# Header e bottom bar di default per le schermate

Ogni view interna dell'app mobile (`app/mobile`, cartella `src/views/`), **eccetto la homepage**, usa lo stesso header: freccia back a sinistra e titolo centrato. Il pattern è implementato dal componente `Screen` (`src/components/Screen`), che delega il rendering dell'header a `Header` (`src/components/Header`) — entrambi sono componenti riusabili in `components/`, non view.

## Come si usa

Non serve costruire l'header a mano: basta passare `title` a `Screen`.

```tsx
import { Screen } from '@/components/Screen'

export const Checkout: FC = () => {
  const { t } = useTranslation()

  return <Screen testID="checkout-screen" title={t('checkout.title')} />
}
```

- **View raggiunte con push/navigazione** (login, signup, verify-code, checkout, dettaglio ordine, dettaglio servizio, ecc.): freccia back mostrata di default, naviga con `router.back()` internamente a `Header`.
- **Root delle tab** (`ServicesCatalog`, `Profile` — le view montate direttamente dentro `(tabs)/*`): non hanno una schermata precedente nello stack, quindi passano `showBack={false}`:
  ```tsx
  <Screen testID="profile-screen" title={t('profile.title')} showBack={false} />
  ```
- **Home** (`src/views/Home`) è l'unica eccezione: non usa `Screen`/`Header`, ha un proprio layout (sfondo full-bleed + `GtaTitle`).

## Bottom bar: sempre visibile come l'header, stessa eccezione

`BottomNavigation` (`src/components/BottomNavigation`) segue la stessa regola dell'header: **sempre visibile su ogni view tranne la home**. Non è montata dentro il layout del gruppo `(tabs)` (che oggi è solo un `<Slot />`, senza layout proprio) — vive nel layout root (`src/app/_layout.tsx`), che la mostra o nasconde in base al pathname corrente:

```tsx
// src/app/_layout.tsx
const pathname = usePathname()
const showBottomNavigation = pathname !== '/'

<YStack flex={1}>
  <YStack flex={1}>
    <Stack screenOptions={{ headerShown: false }} />
  </YStack>
  {showBottomNavigation ? <BottomNavigation /> : null}
</YStack>
```

Questo la rende visibile anche sulle view fuori dal gruppo `(tabs)` (dettaglio servizio, checkout, tracking ordine, ecc.), non solo sulle root delle tab. Se aggiungi una nuova rotta e non vuoi la bottom bar, l'unico modo previsto è essere la homepage (`/`) — non esistono altre eccezioni per ora. Se in futuro serve un'eccezione aggiuntiva (es. schermate di auth a schermo intero), va estesa la condizione `showBottomNavigation` nel layout root, non nascosta a livello di singola view.

## Regole

- `Header` gestisce la navigazione internamente con `useRouter().back()` da `expo-router` — i componenti schermata restano semplici, passano solo `title`/`showBack`, senza importare `expo-router`.
- Il titolo è sempre centrato (`Title` in `Header/style.ts`, `flex: 1` + `text: 'center'`), con uno spacer della stessa larghezza del back-button sul lato opposto per mantenere il centraggio anche quando la freccia è nascosta.
- **Safe area obbligatoria su ogni view che tocca un bordo dello schermo** (header in alto, tab bar in basso, o qualsiasi contenuto full-bleed): mai un padding fisso "a occhio" (es. `pt: '$8'`) per compensare notch/dynamic island/home indicator — quei valori sono diversi per ogni device e si rompono al primo cambio di modello. Usare sempre `useSafeAreaInsets()` da `react-native-safe-area-context` e applicare l'inset reale al lato che tocca il bordo:
  ```tsx
  const insets = useSafeAreaInsets()
  <Bar pt={insets.top + 8}>   // header in alto
  <Bar pb={insets.bottom}>   // tab bar in basso (vedi BottomNavigation)
  ```
  Il componente che possiede il bordo (Header, BottomNavigation) è responsabile del proprio inset — non delegarlo al contenitore padre con un padding statico.
- Nei test delle view, mockare `expo-router` come già fatto per `BottomNavigation`/`Header`:
  ```ts
  jest.mock('expo-router', () => ({
    useRouter: () => ({ back: jest.fn() }),
  }))
  ```
  `useSafeAreaInsets` non va mockato: `renderWithProviders` (`src/test/render.tsx`) avvolge già tutto in `SafeAreaProvider` con insets a zero, sufficiente per i test.

## Checklist per una nuova view interna

- [ ] Vive in `src/views/`, non in `src/components/`
- [ ] Usa `<Screen title={t('...')}>` invece di renderizzare un `Title` manuale
- [ ] Se è una root di tab (nessuna schermata precedente), passa `showBack={false}`
- [ ] Il test della view mocka `expo-router` (`useRouter` → `{ back: jest.fn() }`)
- [ ] Nessuna dipendenza diretta da `expo-router` dentro la view (la navigazione back resta interna a `Header`)
- [ ] Nessun padding statico per compensare notch/dynamic island/home indicator: usa `useSafeAreaInsets()` su qualsiasi elemento che tocca il bordo dello schermo
- [ ] Non serve fare nulla per la bottom bar: è già gestita dal layout root e appare automaticamente su ogni view tranne la home
