---
name: pre-push-checks
description: Git hook pre-push che lancia typecheck e test prima di ogni push, e come mantenerlo aggiornato quando si aggiungono test ad altri workspace
---

# Pre-push: typecheck + test prima del push

Ogni `git push` da questo repo esegue automaticamente typecheck e test di `app/mobile` prima di lasciare partire il push. Se falliscono, il push viene bloccato.

## Come funziona

- L'hook vive in `app/.githooks/pre-push` (versionato nel repo, non in `.git/hooks` che non è tracciato da git).
- `git config core.hooksPath` punta a `app/.githooks` — impostato dallo script `prepare` in `app/package.json`:
  ```json
  "prepare": "git config core.hooksPath \"$(git rev-parse --show-toplevel)/app/.githooks\""
  ```
  `pnpm install` (dentro `app/`) esegue automaticamente `prepare`, quindi ogni collaboratore che clona il repo e fa `pnpm install` ottiene l'hook attivo senza passi manuali.
- **Non usiamo `husky`**: il package si aspetta che `.git` sia nella cwd (`fs.existsSync('.git')`), il che non è vero qui perché la root del workspace pnpm è `app/`, un livello sotto la root git del repo. Per questo l'hook è un plain shell script + `git config core.hooksPath` diretto (via `git rev-parse --show-toplevel`, che funziona indipendentemente dalla cwd).

## Perché la root git e la root pnpm sono diverse

Il repo git è la cartella che contiene `app/`, `docs/`, `graphics/`; il workspace pnpm (con `pnpm-workspace.yaml`, `mobile/`, `web/`, `admin/`) è dentro `app/`. Qualsiasi tool di git-hooks che assuma "package.json e `.git` nella stessa cartella" (es. husky) va configurato esplicitamente o evitato — vedi sopra.

## Estendere il hook

Al momento solo `app/mobile` ha una suite di test (`pnpm test` = jest) e uno script `typecheck` (`tsc --noEmit`). Quando `web`/`admin` avranno i propri test, aggiungi i rispettivi comandi in `app/.githooks/pre-push`:

```sh
cd "$root/web"
pnpm typecheck && pnpm test   # quando esisteranno questi script
```

Non aggiungere check silenziosi che si limitano a loggare un warning: se un progetto ha test, il pre-push deve fallire (`set -e` è già in cima allo script) quando quei test falliscono.

## Verificare che l'hook sia attivo

```sh
git config --get core.hooksPath   # deve stampare .../app/.githooks
git push --dry-run origin main    # esegue l'hook senza push reale
```

## Checklist quando si aggiunge un nuovo comando di verifica (lint, e2e, ecc.)

- [ ] Il comando è aggiunto come script npm nel `package.json` del workspace interessato (non inline nel hook)
- [ ] L'hook (`app/.githooks/pre-push`) richiama lo script, non il comando raw
- [ ] Testato con `git push --dry-run` che il hook fallisce se il comando fallisce
- [ ] Nessuna modifica a `.git/hooks` direttamente (non è versionato, si perderebbe al prossimo clone)
