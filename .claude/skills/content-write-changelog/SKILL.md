---
name: content-write-changelog
description: Use when the operator asks to write, generate, or publish a changelog entry for prisma.io/changelog, says "this week's changelog" or "this month's changelog", asks what shipped since the last entry, or asks to open the changelog pull request.
metadata:
  author: Prisma
  version: "2026.10.2"
---

# Write the changelog entry

Turn everything that shipped since the last entry into one dated MDX file at `apps/site/content/changelog/{YYYY-MM-DD}.mdx`, plus a triage note that lists every candidate you left out and why. Then open a pull request for humans to review. This skill never merges.

The reader is a working developer with no time. In a ten-second scan the entry must answer three questions: what can I do now, what stopped hurting, and do I have to act.

## Pre-conditions

Stop and tell the operator if one of these is missing.

1. **A checkout of this repo**, synced with the default branch. Work on a new branch or worktree, never on a branch that carries someone's unfinished work.
2. **The `gh` CLI, signed in** with access to the Prisma organization. Much of the platform is built in private repositories. Without access to them the entry covers the public repositories only, and you must say so in the pull request.
3. **The positioning doc**, read before you write a product claim. The authoritative copy is `docs/prisma/positioning.md` in the `prisma/ignite` repository, the same source `content-write-blog` uses. There is no copy in this repo. If you cannot read it, ask the operator for the current product names and maturity labels.

## Rules that always apply

- **Outcome first, product named in the same sentence.** Every unit a skimmer can land on (title, opening paragraph, section opener, bullet, guide annotation) leads with what the reader can now do and names the product. Write "You can now enroll a coding agent in Prisma with a credential of its own", not "Agent enrollment is now available".
- **Publish what the user can see, wherever the code lives.** A Console workflow, a CLI command, a REST API route, or a docs page is publishable even when its code is private. Describe the effect and link a public docs page, or link nothing. Never link a private pull request and never name a private repository.
- **Only what is released.** A merged pull request is not a shipped feature. Check each product's release before you write about it, as described in `references/gathering.md`.
- **Every claim has a public source.** A release note, a docs page, a blog post, or a public pull request. Quote dates, limits, and prices from the source and never from memory.
- **Full product names on every mention**, as the positioning doc spells them. Check the name and the maturity of each product against the docs when you write, because both change between entries.
- **Most impactful first, at every level.** The title is the biggest change. The headline sections, the bullets in a section, the actions a reader must take, and the fixes are each ordered by how many readers they reach and how much they change.
- **Never pad.** A window with a few fixes gets a short entry with no headline sections. A window with nothing user-facing gets no entry, and you report that instead.
- **No em dashes, no emoji, no vague adjectives.** State the behavior the reader will observe.

## Workflow

1. **Set the window.** The window starts at the newest entry in `apps/site/content/changelog/` and ends today. Read that entry in full: its structure is the precedent, and the pull requests it links mark where the window starts.
   Done when you can name the start date, the end date, and the last pull request already covered.
2. **Gather.** Collect the merged pull requests, the releases, the new docs pages, and the new blog posts for the window, following `references/gathering.md`.
   Done when every source in that file has been read or reported as unreachable.
3. **Gate.** Give each candidate one verdict from `references/filtering.md`: publish, rewrite, flag, or exclude. When unsure, flag.
   Done when every candidate has a verdict and every flag and exclusion has a one-line reason.
4. **Confirm.** For each candidate you keep, find the public source, check that it is released, and note the docs page that documents it.
   Done when no kept item rests on a pull request title alone.
5. **Write.** Draft the entry in the order `references/structure.md` gives, in the voice `references/voice.md` describes.
   Done when the frontmatter is valid, `slug` equals `date`, and the date is the day the entry lands.
6. **Check.** Run `node .claude/skills/content-write-changelog/scripts/check-entry.mjs apps/site/content/changelog/{YYYY-MM-DD}.mdx --links`, then `.claude/skills/docs-reader-review/scripts/check-ai-signs.sh` on the same file. The closing `---` before the Enterprise line is the one hit the second script is expected to report.
   Done when both scripts report nothing else and you have gone through the checklist below.
7. **Open the pull request.** Create the branch `changelog/{YYYY-MM-DD}`, commit the entry and its images as `docs(site): add changelog entry {YYYY-MM-DD}`, push, and open the pull request with the body in `references/structure.md`. If an entry for that date already exists, ask the operator whether to replace it or pick another date.
   Done when the pull request is open and its body carries the triage note.
8. **Report and stop.** Give the operator the pull request link, the items that need a human decision, and anything you could not verify. Do not merge and do not enable auto-merge.

## Checklist before you open the pull request

- [ ] The title leads with a user action or outcome and names the product. It has no `Prisma:` prefix, no version number, and no chain of features joined by semicolons.
- [ ] The opening paragraph states the biggest change in its first sentence, and names every date the reader must act on.
- [ ] There are at most three headline sections, each one changes what a reader can do, and each heading states an outcome or an action.
- [ ] The most impactful item comes first in the entry, in every section, and in every list.
- [ ] "What you need to do" exists whenever a reader has to act, with one bullet per audience.
- [ ] Every breaking change says what to change. Every deprecation names the old surface, the replacement, and the date.
- [ ] Every documented surface links its docs page, and every link and anchor was checked against production.
- [ ] Every technical identifier is in backticks.
- [ ] No private pull request links, no private repository names, no internal names, no issue-tracker IDs, no customer names, and no description of how a security problem worked.
- [ ] No CI, dependency, refactor, test, SEO, or analytics items.
- [ ] Every image has alt text that describes what the screenshot shows.
- [ ] Every blog and guide link carries one sentence taken from what the page says, not from its title.
- [ ] The triage note lists every flagged and excluded candidate, including the ones with no public pull request.

## Reference

- `references/gathering.md`: where the changes come from, and how to tell merged from released.
- `references/filtering.md`: the verdicts, and the rules for private repositories, unreleased work, and security fixes.
- `references/voice.md`: how to turn a pull request into a sentence a reader can use.
- `references/structure.md`: frontmatter, section order, components, images, and the pull request body.
- `scripts/check-entry.mjs`: checks the frontmatter, the MDX, the images, and the links.
- The two newest entries in `apps/site/content/changelog/` are the samples. Match their shape before you match this document.
