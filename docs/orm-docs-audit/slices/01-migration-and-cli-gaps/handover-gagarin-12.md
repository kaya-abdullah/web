# Handover: prisma/web#8349 waits for prisma/orm#30475

Written 2026-10-01 by gagarin-12 before a rate limit. For an agent starting in a fresh session and a fresh worktree of prisma/web. It replaces the handover columbo-92 wrote on 2026-09-30.

## What is left

One pull request: [prisma/web#8349](https://github.com/prisma/web/pull/8349). It is a draft, its base is `main`, it has no conflicts, and all checks pass. It adds `@contract` and `@db` to the contract reference table in `apps/docs/content/docs/orm/migrations/the-migration-graph.mdx` and to the option rows on `cli/migration-status.mdx`, `cli/db-migrate.mdx`, and `cli/db-update.mdx`.

It must not merge until a published `prisma` release has the behavior it documents. That behavior comes from [prisma/orm#30475](https://github.com/prisma/orm/pull/30475), which is still open.

## What is done

- prisma/web#8348 merged on 2026-09-30 (squash).
- prisma/orm#30527 merged on 2026-09-30 through the prisma/orm merge queue. The daily sync workflow in prisma/web picks it up.
- prisma/web#8349: base changed to `main`. The squash of #8348 caused conflicts in its four files. Main's version of those files was identical to the old base, so the merge commit `91dc1b7a5` keeps the branch's side. The diff against main is 4 files, 9 insertions, 10 deletions, the same as before.

## The blocker: nobody is working on prisma/orm#30475

- Its last commit is from 2026-09-28. Head is `20615a96f0` on branch `fix/cli-contract-reference-forms`.
- No session in the app is bound to it and no local worktree holds its branch.
- columbo-92 reported four defects on it that are unanswered: [first comment](https://github.com/prisma/orm/pull/30475#issuecomment-5904954696) and [second comment](https://github.com/prisma/orm/pull/30475#issuecomment-5905041843).
- gagarin-12 offered to take it over. Will has not answered. Do not push to its branch unless Will says so. If he does, work in a worktree of prisma/orm, fix the four defects, run `/drive-code-review`, and never run the full integration suites locally.

## When the docs can go live

All three must be true:

1. prisma/orm#30475 is merged.
2. A prisma/orm release tag contains its merge commit. Check with `gh api "repos/prisma/orm/compare/<tag>...<mergeCommit>"`: the tag contains it when `ahead_by` is 0.
3. The npm `prisma` package pins an `@prisma/orm-toolchain` version at or above that release. Check with `npm view prisma dependencies --json`.

Point 3 matters because the `prisma` package is built from prisma/prisma-cli and has its own version numbers. On 2026-10-01, `prisma` 8.0.0-rc.19 pins `@prisma/orm-toolchain` 8.0.0-rc.13, while prisma/orm is at v8.0.0-rc.14. The rc.14 tag does not contain the two fix commits.

Then run the re-check list in the description of prisma/web#8349 against `prisma@latest`, in a scratch project under `wip/` in your worktree. The PostgreSQL 15 recipe is at the top of `docs/orm-docs-audit/slices/01-migration-and-cli-gaps/facts-rc19.md` on branch `docs/orm8-docs-audit-design` (`LC_ALL=en_US.UTF-8` is needed for `pg_ctl`; there is no Docker on this machine). The scripts `matrix-30475.sh` and `lib-30475.sh` beside it ran the same matrix on the pull request's branch.

- If every result matches, run `gh pr ready 8349 --repo prisma/web`.
- If a result differs, change the pages to what the release does, push, then mark it ready.

## First steps for the new session

1. Turn on Auto-fix for prisma/web#8349: `mcp__ccd_pr__bind_pr` with its URL, then `mcp__ccd_pr__set_monitor` with `auto_fix: true` and `address_comments: true`. When you turn it on, the app replays old comments as events. They need no action.
2. Auto-fix does not report merges or releases. Schedule a check every two hours with `CronCreate` that tests the three conditions above. Cron jobs are session-only and expire after seven days.
3. To change prisma/web#8349, the branch name `claude/docs-contract-refs-30475` is held by another worktree. Check it out under another local name and push to the same remote branch:

```bash
git fetch bot claude/docs-contract-refs-30475
git checkout -B <your-name>/docs-contract-refs-30475 bot/claude/docs-contract-refs-30475
git push bot HEAD:claude/docs-contract-refs-30475
```

Merge `origin/main` in when it conflicts. Never rebase or force-push.

## Limits

- Do not push to the branch of prisma/web#8243 (`docs/orm8-docs-audit-design`). Another session owns it. Read from it only.
- Do not start items E13 to E20 or D23 to D29 in `docs/orm-docs-audit/changes.md` unless Will asks.

## Context

- Transcript of this session (gagarin-12): session id `local_c4fd71fe-13d2-483c-a336-3d6a732b9357`, app link `claude://claude.ai/epitaxy/local_c4fd71fe-13d2-483c-a336-3d6a732b9357`. Read it with the `ccd_session_mgmt` tools `list_events` or `search_session_transcripts`.
- columbo-92's handover, with the slice's spec, plan, and evidence: `git show origin/docs/orm8-docs-audit-design:docs/orm-docs-audit/slices/01-migration-and-cli-gaps/handover.md`. Its session id was `local_075b8826-8782-4df4-afa7-9da2fc37c0d5`; that session no longer appears in the app's session list.
- This file: `git show bot/claude/orm8-docs-audit-handover-dccc09:docs/orm-docs-audit/slices/01-migration-and-cli-gaps/handover-gagarin-12.md`.
