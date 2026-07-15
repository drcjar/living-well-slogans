---
layout: base.njk
title: Provenance of the figures
verdict: "Every number on this site, sorted into two honest buckets: verified against source, or from recall and not yet re-checked."
---

# Provenance of the figures

This page is the point of the project. A site that criticises other people's evidence has to show its own. **Every figure that appears on a slogan page must appear below, in one of two buckets.** A build check (`scripts/check-evidence.js`) fails the site if a figure is on a slogan page but missing here.

The unverified bucket is meant to **shrink over time**. Moving a figure from *from recall* to *verified* — by opening the actual paper and confirming the number — is the single most useful contribution anyone can make to this repo.

A note on the arithmetic: a few figures (roulette house edge, slot return-to-player) are not study results at all but **published design parameters or definitions**. They are "verified" in the sense that they are specifications, not estimates, and the linter treats a stated house edge, return-to-player value, or fraction as its own citation.

## Verified against source

Checked against the cited source while preparing this pack.

- **Wardle et al. 2024, Lancet Public Health Commission on Gambling** — 46.2% of adults and 17.9% of adolescents gambled in the past year; 10.3% of adolescents gambled online; any-risk gambling in 5.5% of women and 11.9% of men; ~448.7 million adults affected; gambling disorder in 15.8% of online casino/slot players versus 8.9% of sports bettors; net losses near US$700 billion by 2028; legal in >80% of countries.
- **Zhao, Stockwell, Naimi et al. 2023, JAMA Netw Open** — 107 cohort studies, 4.8 million participants; no significant mortality reduction below 25 g/day; increased mortality at ≥25 g/day in women and ≥45 g/day in men; corrected May 2023 for confidence-interval errors.
- **Green et al. 2011, J Clin Oncol** (Nambour ten-year follow-up) — melanoma 11 vs 22 (HR 0.50, 95% CI 0.24–1.02); invasive melanoma 3 vs 11 (HR 0.27, 95% CI 0.08–0.97).
- **Green et al. 1999, Lancet** (Nambour) — 2×2 factorial design, 1,621 participants; daily sunscreen reduced squamous cell carcinoma, no significant effect on basal cell carcinoma.
- **Gambling design parameters (definitions / published specifications, not estimates)** — single-zero roulette house edge 2.7% (= 1/37); double-zero 5.26% (= 2/38); UK online slots return-to-player typically 92–96% (i.e. a specified 4–8% retention); National Lottery returns roughly half of stakes as prizes.

## From recall — unverified

Written from memory while drafting. **Check each against the source before it goes on a slide.**

- **Doll et al. 2004, BMJ** (British Doctors Study) — ~10 years of life lost; cessation at 60/50/40/30 gaining ~3/6/9/10 years; 34,439 doctors, 50 years' follow-up.
- **Pirie et al. 2013, Lancet** (Million Women Study) — stopping before 40 avoids >90% of excess mortality; before 30, >97%.
- **Jha et al. 2013, NEJM** — reproduces the ~10-year deficit in a US cohort.
- **Banks et al. 2015, BMC Med** — roughly two-thirds of lifelong smokers killed by smoking.
- **Denissenko et al. 1996, Science** — benzo[a]pyrene adducts at *TP53* codons 157, 248, 273.
- **Millwood et al. 2019, Lancet** (China Kadoorie Biobank) — ~500,000 participants; *ALDH2* / *ADH1B* instruments; monotonic linear stroke risk.
- **Collaborative Group on Hormonal Factors in Breast Cancer 2002, Br J Cancer** — breast cancer risk ~7% per 10 g/day of alcohol.
- **Hall et al. 2019, Cell Metab** — ultra-processed diet, ~500 kcal/day more eaten *ad libitum*; ~0.9 kg gained in two weeks; n=20, four weeks.
- **Hall et al. 2016, Obesity** ("Biggest Loser") — resting metabolic rate suppressed six years on; 13 of 14 regained.
- **PREDIMED (Estruch et al. 2018, NEJM)** — ~30% relative reduction in major cardiovascular events; retracted and republished after randomisation irregularities.
- **GBD 2017 Diet Collaborators 2019, Lancet** — ~11 million deaths/year attributable to dietary risks.
- **Aune et al. 2017, Int J Epidemiol** — fruit/vegetable benefit continuing to ~800 g/day.
- **Ekelund et al. 2019, BMJ** — accelerometer meta-analysis, ~36,000 adults; front-loaded dose-response.
- **Paluch et al. 2022, Lancet Public Health** — ~47,000 adults; mortality plateau at ~6,000–8,000 steps/day (over-60s) and ~8,000–10,000 steps/day (under-60s).
- **Klimentidis et al. 2018, Eur Heart J** — Mendelian randomisation supporting a protective effect of activity.
- **Dunster et al. 2018, Sci Adv** — Seattle school start delayed 55 minutes; actigraphy-measured sleep +34 minutes.
- **Karlsson & Håkansson 2018, J Behav Addict** — ~15-fold elevated suicide rate in gambling disorder (Swedish registers).
- **Muggleton et al. 2021, Nat Hum Behav** — 6.5 million UK bank customers; dose-responsive financial distress and mortality.
- **UK adult smoking prevalence** — fell from ~45% (mid-1970s) to ~11–12% now; SimSmoke-type modelling attributes most of the fall to structural measures.
- **1983 UK seatbelt law** — associated with roughly a 25% reduction in driver deaths.
- **UK 10–24 cause-of-death ranking** — get this from ONS directly; it has shifted and you will be asked.

## Deliberately not cited

- **Any figure for the share of UK gambling-industry revenue derived from harmed players.** The concept is well supported; the numbers in circulation vary widely and several trace to advocacy sources. Take it from Gambling Commission participation data or leave it out.
