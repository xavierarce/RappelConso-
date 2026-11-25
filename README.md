# RappelConso+

> **PWA Next.js · Vercel · IBM watsonx**  
> Surveille les produits que vous avez achetés et vous prévient avant qu'il ne soit trop tard.

**Bobathon · 25 nov. 2026**

---

## Concept

Une Progressive Web App qui surveille les produits que vous avez déjà achetés — à partir d'une photo de votre ticket de caisse — et vous alerte quand l'un d'eux est rappelé.

**Différenciateur clé :** scan du ticket, zéro saisie manuelle.  
**Agents watsonx Orchestrate :** Ticket-to-Data (OCR), Sentinelle (matching), Conseiller (questions/réponses).

---

## Documentation

Toute la doc est dans [`docs/`](./docs/):

- **[`docs/ROADMAP.md`](./docs/ROADMAP.md)** — les 44 étapes de construction par phase
- **[`docs/APP_SPECS.md`](./docs/APP_SPECS.md)** — écrans, UX, routes API, questions de démo
- **[`docs/DATA_FORMATS.md`](./docs/DATA_FORMATS.md)** — les 3 formats JSON partagés
- **[`docs/RISKS.md`](./docs/RISKS.md)** — 10 risques identifiés avec parades

---

## Stack

| Couche | Choix | Notes |
|--------|-------|-------|
| Framework | Next.js 16 (App Router) | TypeScript + Tailwind |
| Déploiement | Vercel | Auto-deploy on push to `main` |
| PWA | next-pwa | Service Worker, manifest, offline shell |
| Stockage | localStorage | `rappelconso_placard` sur le device |
| API données | RappelConso V2 | Proxied via `/api/recalls` |
| OCR / Agents | IBM watsonx Orchestrate | Appelés via routes API Next.js |

---

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Variables d'environnement

Copier `.env.local.example` → `.env.local` et remplir :

```
RAPPELCONSO_API_URL=
WATSONX_API_KEY=
TICKET_AGENT_URL=
SENTINELLE_AGENT_URL=
CONSEILLER_AGENT_URL=
MATCH_THRESHOLD=60
```

Les clés ne sont **jamais** dans le navigateur — tous les appels passent par les routes API Next.js.

---

## Build

```bash
npm run build
npm start
```

---

## Déploiement Vercel

1. Push sur GitHub
2. Importer le projet dans Vercel
3. Ajouter les variables d'environnement dans le dashboard Vercel
4. Deploy automatique sur chaque push de `main`

---

## Les 3 parcours utilisateur (= la démo)

1. **Après les courses** : je photographie mon ticket → Ticket-to-Data extrait les produits → validation → ajout à Mon Placard.
2. **L'alerte** : à l'ouverture de l'app, Sentinelle compare Mon Placard aux rappels récents → affichage de l'alerte si match ≥ seuil → ouverture de la Fiche rappel.
3. **« Je m'inquiète »** : depuis la fiche, je clique « Demander à l'assistant » → l'agent Conseiller répond uniquement à partir de la fiche officielle.

**Bonus démo :**  
- Bouton caché "Simuler un rappel" dans Mon Placard  
- Ticket pré-extrait en fallback si l'OCR ne répond pas

---

## Structure du projet

```
rappelconso-app/
├── docs/                  # Documentation complète
├── public/
│   ├── icons/             # Icônes PWA 192x192, 512x512
│   ├── data/              # recalls.json (secours offline, à livrer par Rôle 2)
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── page.tsx             # Accueil (fil des rappels)
│   │   ├── scan/                # Scan ticket (photo + liste extraite)
│   │   ├── placard/             # Mon Placard (localStorage + alertes)
│   │   ├── fiche/[id]/          # Fiche rappel détaillée
│   │   ├── assistant/           # Chat avec Conseiller
│   │   └── api/
│   │       ├── recalls/         # Proxy RappelConso V2
│   │       ├── ticket/          # Ticket-to-Data agent
│   │       ├── match/           # Sentinelle agent
│   │       └── chat/            # Conseiller agent
│   ├── components/
│   │   ├── BottomNav.tsx        # Navigation mobile 4 onglets
│   │   └── RappelCard.tsx       # Card de rappel
│   ├── lib/
│   │   ├── placard.ts           # localStorage CRUD
│   │   └── mockData.ts          # Données de démo
│   └── types/
│       └── index.ts             # Rappel, ProduitPlacard, ResultatSentinelle
└── next.config.ts               # Config PWA + webpack (next-pwa)
```

---

## Licence

Projet Bobathon ESGI · 25 nov. 2026
