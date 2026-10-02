# Voice: short, concrete, and useful to someone skimming

The entry is read by a developer who is deciding whether an update affects them. Write so they can decide without reading twice.

## Outcome first

The first sentence of every item answers one question: what can I do now that I could not do before? After that, in this order, come why it matters, how it works, and the technical detail. Stop as soon as the reader can act.

- **Write from the reader's side.** Describe what they experience, not how it was built. Second person works well when it is concrete: "You can now delete a project that still has active deployments."
- **One idea per sentence.** When a sentence contains "and", check whether it holds two changes. If it does, split it. Two changes never share a bullet.
- **Mechanics come after the benefit.** Config files, setup pull requests, and API internals do not appear before the reader knows what they get.
- **A snippet follows its explanation.** Code never sits between the outcome and the sentence that explains it.
- **Skip the history.** "Was gated, then tested, then released" becomes what is true today. Add one "before" sentence only when the contrast helps: "The choice was dropped before, and the project deployed in US East."
- **Question every sentence.** If a user would not care, delete it.
- **Prefer two short sentences to one long one.** "It used to map to `userProfile`. It now maps to `UserProfile`." reads faster than one sentence joined with "and".
- **Open a bullet with a verb when the reader can do something new.** "Change what is live", "Find out what went wrong", and "Skip duplicates on bulk inserts" tell a skimmer more than a noun phrase does.

## Name the product

The product name appears wherever a reader might land: the title, the opening paragraph, section openers, and the first bullet of a list. A reader who jumps to the middle of the entry should know which product a line is about.

Use the names in the positioning doc, in full, every time. Check two things against the docs before you write, because they change between entries:

- **The name.** Follow what the docs call the product today. For example, the docs say "Prisma ORM" and add a version number only when two versions are being contrasted, as in "Prisma ORM 8 reads the Prisma 7 schema you already have".
- **The maturity.** Early Access, release candidate, and generally available mean different things to a reader. State a product's maturity once per entry, in the docs' wording, and do not repeat it in headings.

## Titles

The title tells someone scanning the changelog index whether to open the entry.

- Lead with what the reader can do, and name the product: "Let your coding agent set up Prisma and ask before it touches production".
- Say what the reader gets, not what the feature is made of. "Enroll your coding agent in Prisma with its own credential" names the mechanism. The version above names the two things the reader cares about.
- A launch is the exception, where the event is the news: "Prisma Compute is now generally available". The index page gives the featured treatment to titles that say "generally available", "now available", or "now in beta" or "preview", so use those phrases only for a real launch.
- One claim per title. When an entry covers several products, lead with the biggest change and let the opening paragraph carry the rest.
- No `Prisma:` prefix, no version number, and no verbs like "lands", "arrives", or "ships".

## Words to cut

- **Openers that delay the point:** "We're excited to", "Today we're announcing", "As always".
- **Filler:** "stay tuned", "under the hood", "and much more".
- **Intensifiers:** "very", "really", "truly", "simply".
- **Jargon:** "leverage", "robust", "best-in-class", "supercharge".
- **Claims of importance** with no change behind them: "This is huge", "A better experience".

These adjectives need proof in the same sentence, or they go: `seamless`, `effortless`, `powerful`, `fast`, `simple`, `easier`, `cleaner`, `richer`, `clearer`. Replace them with what the reader will observe. Not "builds are easier to debug" but "a failed build sends an email and shows its logs in the Console".

The full list of patterns that make text read as machine-written is in `.claude/skills/docs-reader-review/references/ai-writing-signs.md`, and `check-ai-signs.sh` in the same skill finds the ones a regular expression can catch.

## Sentence rules

- No em dashes. Use a comma, a period, or parentheses.
- No emoji.
- No rhetorical questions and no "It's not X, it's Y".
- Active voice and present tense: "Views now support `@unique`."
- Use a number only when it appears in the source. Never estimate one.
- Put every exact identifier in backticks: packages, import paths, config files, API fields, routes, commands, and error codes. Product surfaces such as the Console and the REST API stay plain text.
- A link says what the reader gets there: "The [enrollment guide](url) covers the policy rules." Never "Read more".

## Emphasis

Bold the one phrase in a paragraph that a skimmer must not miss, and bold the lead of a bullet when the bullet opens with the outcome. Use italics for the short qualifier that changes a decision, such as *never returned* or *nothing to change*. If everything is bold, nothing is.

## From pull request to sentence

Strip the mechanism and keep the effect.

- "Use every key column in includes, nested writes and multi-table variants" becomes "`include()` across a composite foreign key returns the right rows. It matched on the first key column only, which returned related rows that belonged to other parents."
- "Schedule paid-to-paid downgrades for the end of the period" becomes "Downgrades between paid plans take effect at the end of the billing period. You keep your current plan until then."
- "Reduce included-result decoding overhead" has no effect a reader can observe without a number from the source, so it is excluded.
- A title that carries only an issue-tracker ID and an internal project name is excluded.

## Read it once more as the reader

Before you hand the entry over, read only the title, the opening paragraph, and the first sentence of each section. A reader who stops there should know what changed, which products it touches, and whether they have to do anything.
