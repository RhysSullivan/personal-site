never fill in personality / human text

example of this is subheads, bodies, etc

it is important to preserve the soul of this

## Publishing and parallel agent work

- Production is the GitHub `main` branch. Use a fresh rift based on fetched
  `origin/main`; merge only with Rhys's explicit approval. Vercel deploys main.
- Never use `vercel --prod`, promote a preview, or move the production alias
  from an unmerged branch. A successful manual deployment does not persist a
  change in future deployments. Preview deployments are fine.
- Each photo task must commit both the image and its content entry, push them,
  and hand off a linked PR. Include the source capture and chosen processing.
  Do not report a photo as published until its commit is on main and its page,
  gallery card, and full-resolution asset work at rhys.dev.
- The coordinating agent owns integration across threads: compare the fetched
  main branch with the live gallery before any production change. Do not assume
  another agent's deployed work has merged. Preserve unrelated site features.
- `bun run build` checks production revision metadata, all live gallery routes,
  and generated photo pages/assets. Do not bypass a failed publishing check.
  Network failures stop publishing; retry after resolving the cause.
- The Vercel project Build Command must remain
  `node scripts/check-production-source.mjs && bun run build`. This also stops
  old rifts without the guard. These checks prevent accidental regressions;
  they are not an authorization boundary against someone changing the scripts.
