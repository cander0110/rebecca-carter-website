---
name: visual-prompt
description: Run one numbered prompt from the site's visual direction sequence. Use when the user types /visual-prompt followed by a prompt ID like V1 or V5, or asks to run the next step of the visual direction work.
---

# Visual direction prompt runner

Run exactly one prompt from `docs/visual-direction.md`.

## Steps

1. Read `docs/visual-direction.md` in full, including the standing constraints
   and run order at the top.
2. Locate the section whose heading matches the requested ID: $ARGUMENTS
3. Confirm the prompts before it in the run order have been completed. Check git
   log for their commits. If a prerequisite is missing, stop and say which one.
4. Execute only that section's instructions.
5. Stop. Do not continue to the next prompt, even if it looks trivial or
   related.

## Rules

- If the section contains an approval gate, honor it. Output the proposal and
  stop. Do not proceed to implementation on your own judgment.
- If the section states a budget (bundle size, file size, performance score),
  measure it and report the real number. If the work would exceed the budget,
  stop and explain rather than shipping over it.
- If the section requires verification with JavaScript disabled, actually verify
  it before claiming completion.
- Leave the working tree ready to commit as a single change. Do not commit
  unless asked.
- When finished, report: what changed, which files, any budget measurements, and
  anything you could not verify. Be specific about the last one.
