# Contributing

This project has one unusual rule and it is the important one, so it comes first.

## Everything goes through a pull request — including from the maintainers

Nobody commits straight to `main`, not even Carl. This is not ceremony. It is
the mechanism by which a contributor can **disagree with a consultant in
writing**, and have that disagreement be part of the record rather than a
conversation that vanished. A project whose entire thesis is "the failed slogans
failed because their authors didn't check" has to be checkable itself.

So: branch, open a PR, let the evidence check run, and let someone else read it.

## The evidence bar

Before a change to a slogan page is merged:

- **Every number needs a citation in the same block.** The linter
  (`npm run check`) enforces this. See the README for exactly what counts.
- **Every figure must be in `content/provenance.md`**, in one of two buckets:
  *verified against source* or *from recall — unverified*. If you add a figure,
  add it to a bucket in the same PR.
- **Moving a figure from *from recall* to *verified*** — by opening the actual
  paper and confirming the number — is the most valuable kind of PR there is.
  The unverified bucket should visibly shrink over time.
- **Every slogan page states an honest weakness.** "None material" is allowed
  only where it is true (smoking) and must say why. If you cannot state a
  weakness, you have not finished reading the study.

## The `authored_by` badge is an argument, not decoration

Each slogan carries a coloured badge saying who wrote it — `public-health`,
`industry`, `marketing`, or `folk`. This is the whole point made structurally: a
reader should see at a glance that "drink responsibly" was written by the seller.
Set it honestly.

## Working with our 15-year-old co-author

This project has a co-author who is 15. A few things are set up deliberately.

**Their actual job is the one the adults can't do.** The single most valuable
contribution here is telling us when a page is patronising, when the framing is a
50-year-old's idea of what a teenager cares about, and when the "ten-year clock"
section is simply wrong about what actually scares them. They have **explicit
standing to reject content on those grounds**, and those rejections get recorded
in `content/talks/`.

**Attribution is their choice, and it is revisited.** Real name, first name only,
or a handle — their call. A GitHub history is permanent and public, and they are
making that decision at 15, so we ask rather than assume, and we ask again when
they turn 18. **Do not** put a school name, a photo, or anything that identifies
where they are, anywhere in this repo or on the site. If the project ever gets
attention, they get the attention too, and that has to be something they chose.
(A Zenodo release with a DOI, so there is a citable artefact with their name on
it, is worth more to them than a footnote — consider it.)

**Outreach has a safeguard.** The plan is that the co-author does the outreach to
others working in this space — messaging-evaluation researchers, tobacco-control
and gambling-harm groups — but Carl reads every reply, and no one under 18 is
sent alone into a room with an industry-adjacent body. The reasoning matters:
"I've got the best insight about how to do this" is exactly the prior the field's
existing failures were built on. Wardle, Newall, van Schalkwyk and the LSHTM
gambling-harm group have done the messaging-evaluation work; the tobacco-control
people have the only track record of a slogan actually moving a population.
Finding out what they already know costs a week and could save the project.

**The first talk waits for outside review.** It is not given until at least two
people outside this repo have said what is wrong with it. Log those responses in
`content/talks/` too — a project about intellectual honesty should show its own
peer review.

## Style

- Content is plain markdown. Keep it readable in a terminal.
- One claim per sentence where you can manage it. State the design, then the
  effect size, then the weakness.
- No hype. If it reads like campaign copy, it is wrong for this site.
