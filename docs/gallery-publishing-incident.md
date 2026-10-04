# Missing gallery photos, October 3, 2026

The telescope thread published photo snapshots directly with the Vercel CLI.
Caroline's Rose, Owl Cluster and Wizard were committed only in its local rift
(`a845b4a`, `065b671`, `2ad6b4e`). Double Cluster was pushed to
`publish/double-cluster-auto`, but had no merged PR. Iris and Moon had saved
processed captures but no gallery entries; those were an unfinished publishing
handoff rather than pages removed by the Notes deployment.

The October 3 production deployment `dpl_5i58rQZ8bQiuSx55JaR2WhKC8btz` came
from GitHub main at `c810b25`, adding Notes. It correctly deployed that tree,
which did not contain the newer photos. Vercel replaces the site as a whole;
it does not combine content from earlier deployments or parallel agent rifts.

A September 18 repair (`d0c7abe`) had already reconciled older photo branches.
It repaired the content but left the direct-production workflow available.
The telescope thread continued treating an HTTP 200 after a manual deployment
as completion. The later site work checked its own feature without comparing
the live gallery. This was an integration and completion-criteria failure,
not evidence that the Notes implementation deleted photo source files.

## Repair

Recover chosen photo assets and entries on current main, preserving Notes.
Require production revision metadata to match current GitHub main. Compare
every build's gallery with the live gallery and verify each generated page
and local photo asset. New live photos become protected automatically.
An unreadable live baseline fails closed instead of implying no photos exist.
Configure the guard in Vercel's project Build Command as well, so old rifts
without it fail before building. This cannot prevent privileged users from
changing project settings, promoting old builds, or bypassing builds with
prebuilt artifacts; the agent instructions explicitly prohibit those paths.

The coordinating agent must obtain merge approval, land the photo PR, and
verify the production gallery and images before declaring publication done.
Do not repair this incident with another unmerged production snapshot.
