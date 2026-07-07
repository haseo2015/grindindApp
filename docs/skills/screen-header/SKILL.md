---
name: screen-header
description: Pattern di default per l'header delle schermate mobile (titolo centrato + freccia back a sinistra), valido per tutte le pagine interne escluso la home
---

# Header di default per le schermate

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
