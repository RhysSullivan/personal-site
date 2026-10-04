import { pathToFileURL } from 'node:url';

export async function checkProductionSource(env = process.env, fetcher = fetch) {
  if (env.VERCEL_ENV !== 'production') return;
  const sha = env.VERCEL_GIT_COMMIT_SHA;
  if (env.VERCEL_GIT_COMMIT_REF !== 'main' || !/^[a-f0-9]{40}$/.test(sha ?? '')) {
    throw new Error('Production must deploy a committed main revision. Open a PR; do not publish a photo rift with vercel --prod.');
  }
  const response = await fetcher('https://api.github.com/repos/RhysSullivan/personal-site/git/ref/heads/main', {
    headers: { Accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(15_000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Cannot verify main (${response.status}); production deployment stopped.`);
  const main = await response.json();
  if (main.object?.sha !== sha) throw new Error('Production revision is not current main. Deploy the latest main after merging the PR.');
  console.log(`Production source verified: main@${sha}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await checkProductionSource();
}
