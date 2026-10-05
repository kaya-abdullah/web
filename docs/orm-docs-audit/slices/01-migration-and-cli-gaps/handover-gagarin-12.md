# Handover: prisma/orm#30475 review fixes, and prisma/web#8349 waiting on its release

Written 2026-10-05 by gagarin-12 before a rate limit. For an agent starting in a fresh session and fresh worktrees. It replaces the 2026-10-01 version of this file.

## Transcript

Session gagarin-12: id `local_c4fd71fe-13d2-483c-a336-3d6a732b9357`, app link `claude://claude.ai/epitaxy/local_c4fd71fe-13d2-483c-a336-3d6a732b9357`. Read it with the `ccd_session_mgmt` tools `list_events` or `search_session_transcripts`. The last stretch (2026-10-05) is the work on prisma/orm#30475.

## Two pieces of work

### A. prisma/orm#30475, the CLI fix (active, mid-round)

Will told gagarin-12 on 2026-10-05 to take over [prisma/orm#30475](https://github.com/prisma/orm/pull/30475): fix conflicts, run `/drive-code-review` without the walkthrough, and address what it finds. The pull request branch is `fix/cli-contract-reference-forms` in prisma/orm. The bot remote in prisma/orm is named `bot` and points at `git@github-wmadden-electric:prisma/prisma.git` (GitHub redirects to prisma/orm). This session's worktree was `/Users/wmadden/Projects/prisma/orm/.claude/worktrees/gagarin-30475` on local branch `gagarin/fix-cli-contract-reference-forms`; make your own worktree, do not reuse it.

State of the branch, newest first:

| Commit | What | Status |
| --- | --- | --- |
| `96ae5c57a9` on branch `gagarin/30475-review-fixes-wip` (bot remote) | Items 5 to 14 of the fix brief, committed by gagarin-12 when the implementer was stopped. It also force-adds `wip/review/` (spec, both reviews, the fix brief) and `wip/qa/` (probe script and log). | **Untested.** The implementer had finished editing and was about to run migration-tools tests, rebuild the CLI, and run the CLI tests. Expect small breakages. |
| `3a1736a8fc`, `e7043a1cac`, `2c0f06fd9d` on `fix/cli-contract-reference-forms` (pushed, the pull request tip) | Items 1 to 3 of the fix brief: the extension-space regression (F01), `--to`/`--from` scoped to the app space in `migration status` (F02), per-space runner skip (F04). | Committed by the implementer after its own test runs; not re-verified by gagarin-12. Watch CI. |
| `b2eb5aad3f` | gagarin-12's fix for the four defects columbo-92 reported: `db migrate --to @db` and `--to @empty` on an unmarked database, the `migrate --show` command name, two help lines. | Verified: CLI typecheck, lint, touched tests, and a real PostgreSQL 15 run (`wip/qa/probes.log` on the WIP branch). |
| `a08c5532ac` | Merge of `origin/main`; one import conflict in `cli/src/orm/db/update.ts`, resolved by keeping main's imports plus the branch's one new import. | Verified. |

What to do, in order:

1. Make a prisma/orm worktree on `bot/gagarin/30475-review-fixes-wip`. Read `wip/review/fix-brief.md` (the task list and the decisions already made: S04 accepted as-is, F03 declined, the `ContractRef` type change deferred), then `wip/review/code-review.md` and `wip/review/system-design-review.md`.
2. Finish items 5 to 14: `pnpm --filter @internal/migration-tools build` and `test`, `pnpm --filter @internal/cli build`, `typecheck`, `lint`, and `pnpm vitest run` on the touched test files inside `packages/1-framework/3-tooling/cli`. `pnpm check:error-reference` at the root. Never run the full integration suites. Fix what breaks, keep commits small, then move the finished commits onto `fix/cli-contract-reference-forms` (merge or cherry-pick; never rebase or force-push the pull request branch) and push via `bot`. Drop the force-added `wip/` files from what you push to the pull request branch.
3. Rerun the real-database probes with the rebuilt CLI: the recipe is `wip/qa/lib.sh` (PostgreSQL 15 from Homebrew, port 54332, `LC_ALL=en_US.UTF-8` for `pg_ctl`, `initdb -U postgres --auth=trust`), the scratch project was `wip/qa/scratch` linked to the workspace build (links are in the transcript; rebuild them: `node_modules/@prisma/orm-postgres` to `packages/9-public/@prisma/orm-postgres`, `@prisma/cli-engine` and `dotenv` to the pnpm store). The probe list and expected results are in `wip/qa/probes.log`.
4. Run `/drive-code-review` again on the new tip (omit the walkthrough, Opus for every subagent) and fix what it finds.
5. Update the pull request description: add a section for the gagarin-12 commits (the four defect fixes, the review-driven changes, the S04 and F03 decisions), and a Deferred list: `ContractRef` type change so `@db` has no hash; the placeholder hash still reaching `db sign @db`, `migration ref set @db`, `migration plan --from @db`; the unreachable-path hint that suggests `migration plan --to empty`, which `migration plan` rejects. Reply to columbo-92's two comments ([one](https://github.com/prisma/orm/pull/30475#issuecomment-5904954696), [two](https://github.com/prisma/orm/pull/30475#issuecomment-5905041843)) saying each item is fixed in `b2eb5aad3f`, and that `@empty` is kept in the `db migrate --to` help because it now behaves like any hash with no route.
6. Get it reviewed and merged (prisma/orm uses a merge queue: `gh pr merge --auto`).

Auto-fix: this session had prisma/orm#30475 bound with Auto-fix on. Bind it in your session too.

### B. prisma/web#8349, the docs change (waiting)

[prisma/web#8349](https://github.com/prisma/web/pull/8349) is a green, conflict-free draft on `main`. It documents `@contract` and `@db` for `migration status --to/--from` and `db migrate --to`. It must stay a draft until a published `prisma` release contains prisma/orm#30475. Three conditions, all must hold: (1) prisma/orm#30475 merged; (2) a prisma/orm release tag contains its merge commit (`gh api "repos/prisma/orm/compare/<tag>...<mergeCommit>"`, `ahead_by` 0); (3) the npm `prisma` package (built from prisma/prisma-cli, own version numbers) pins an `@prisma/orm-toolchain` at or above that release (`npm view prisma dependencies --json`). On 2026-10-05 `prisma` 8.0.0-rc.19 pins toolchain rc.13 and prisma/orm is at v8.0.0-rc.14.

Then run the re-check list in the pull request's description against `prisma@latest` with PostgreSQL 15. If every result matches, `gh pr ready 8349 --repo prisma/web`. If a result differs, change the pages and push: the branch name `claude/docs-contract-refs-30475` is held by another worktree, so check it out under another local name and `git push bot HEAD:claude/docs-contract-refs-30475`. Two things changed by work A that the docs must reflect: `db migrate --to @empty` now succeeds on an empty database (the description says to add `@empty` to the `db migrate --to` row in that case), and `db migrate --to @db` on an unmarked database reports "Already up to date".

Bind prisma/web#8349 with Auto-fix in your session. Schedule a two-hourly `CronCreate` check for the three conditions; cron jobs are session-only.

## Done before this handover

- prisma/web#8348 merged 2026-09-30. prisma/orm#30527 merged 2026-09-30 through the merge queue.
- prisma/web#8349 rebased onto `main` by merge (`91dc1b7a5`), no conflicts, diff unchanged.

## Limits

- Do not push to the branch of prisma/web#8243 (`docs/orm8-docs-audit-design`). Read from it only.
- Do not start items E13 to E20 or D23 to D29 in `docs/orm-docs-audit/changes.md` unless Will asks.
- Use `curl` against the GitHub API with `$GH_TOKEN` when `gh` hangs; it did so several times on this machine.

## Where this file is

`git show bot/claude/orm8-docs-audit-handover-dccc09:docs/orm-docs-audit/slices/01-migration-and-cli-gaps/handover-gagarin-12.md` in prisma/web. columbo-92's original handover and the slice's spec, plan, and evidence: `git show origin/docs/orm8-docs-audit-design:docs/orm-docs-audit/slices/01-migration-and-cli-gaps/handover.md`.
