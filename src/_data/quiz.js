/**
 * Before/after quiz data, in three age bands.
 *
 * Each band has TWO distinct question sets — `before` and `after` — covering the
 * same topics with different questions, so retaking measures learning rather than
 * memory. Answers are revealed after each set. Questions are only about the good,
 * evidence-backed messages; nothing about debunked or failed slogans.
 *
 * Each question: { url, prompt, options:[...], answer:<index>, why }
 * True/false is just a two-option multiple choice, so scoring is uniform.
 */

const TF = ["True", "False"];

export default {
  bands: [
    {
      key: "8-11",
      label: "Ages 8–11",
      before: [
        { url: "/slogans/smoking/", prompt: "The best way to avoid ever being harmed by smoking is to never start.", options: TF, answer: 0,
          why: "Almost everyone who smokes for life starts young. Never starting removes the whole problem — no willpower needed." },
        { url: "/slogans/alcohol/", prompt: "A small amount of alcohol is good for your body.", options: TF, answer: 1,
          why: "There is no amount of alcohol that is actually good for you. The old 'a glass of wine is healthy' idea turned out to be a mistake." },
        { url: "/slogans/gambling/", prompt: "Gambling games are built so that, over time, the company running them wins.", options: TF, answer: 0,
          why: "The company keeps a slice of every bet — a rule they decided in advance. Play long enough and the slice always wins." },
        { url: "/slogans/movement/", prompt: "You need a gym and a big daily target to get the health benefits of moving.", options: TF, answer: 1,
          why: "The biggest boost comes just from not being one of the people who barely moves at all. Anything that gets you off the sofa counts." },
        { url: "/slogans/sleep/", prompt: "Good sleep mostly helps with how you feel and think the next day.", options: TF, answer: 0,
          why: "The strongest reason to sleep well is short-term: your mood, attention and ability to handle a hard day. You feel it this week." },
        { url: "/slogans/sun/", prompt: "'Slip, slop, slap' means slip on a shirt, slop on sunscreen, slap on a hat.", options: TF, answer: 0,
          why: "Three little actions, one for each word — a genuinely good, well-tested piece of advice." },
      ],
      after: [
        { url: "/slogans/smoking/", prompt: "Most people who smoke for their whole life started when they were young.", options: TF, answer: 0,
          why: "That's exactly why it's worth knowing early — the choice not to start is the highest-value one, and it costs nothing." },
        { url: "/slogans/alcohol/", prompt: "For a young person, the most likely danger from alcohol is something that could happen the very same night.", options: TF, answer: 0,
          why: "Injury, accidents and things that can't be undone are the near danger — much closer than illness decades away." },
        { url: "/slogans/gambling/", prompt: "If you play a gambling game long enough, your luck evens out and you break even.", options: TF, answer: 1,
          why: "Luck evens out, but the company's fixed slice does not. The longer you play, the more that slice takes." },
        { url: "/slogans/movement/", prompt: "The biggest health boost from moving comes from going from almost none to a little.", options: TF, answer: 0,
          why: "That first step off the sofa is where nearly all the benefit is. After that, more is a bonus, not a rule." },
        { url: "/slogans/sleep/", prompt: "If a teenager can't fall asleep early, that's mostly their body clock, not laziness.", options: TF, answer: 0,
          why: "Through puberty the sleepy chemistry arrives later in the evening. It's biology, not a character flaw." },
        { url: "/slogans/sun/", prompt: "A tan from a sunbed is a safe way to protect your skin.", options: TF, answer: 1,
          why: "Sunbeds are a top-category carcinogen — the same danger group as tobacco. Sunscreen, a shirt and shade are the real protection." },
      ],
    },
    {
      key: "11-16",
      label: "Ages 11–16",
      before: [
        { url: "/slogans/smoking/", prompt: "Is a nicotine vape just as harmful as a cigarette?", options: [
            "Yes, they are exactly the same",
            "No — vapes don't burn, so far fewer harmful chemicals; but a never-smoker gains nothing by starting",
            "Vapes are completely safe" ], answer: 1,
          why: "Cigarettes harm you by burning. A vape delivers far fewer of those chemicals — but for someone who never smoked, it's an addiction with nothing traded for it." },
        { url: "/slogans/alcohol/", prompt: "For someone your age, the biggest danger from alcohol is:", options: [
            "Liver disease in thirty years",
            "An injury or accident tonight — a fall, a fight, drowning, passing out",
            "There is no danger" ], answer: 1,
          why: "Your risk is same-night and physical, not same-lifetime. That's much closer, and much more relevant, than illness decades away." },
        { url: "/slogans/gambling/", prompt: "Why does a gambling app make you lose money over time?", options: [
            "You're just unlucky",
            "The 'house edge' is a rule the company chose in advance and published",
            "The government decides who wins" ], answer: 1,
          why: "You're not unlucky — you're on the wrong side of a number the company chose, wrote down, and published in the terms." },
        { url: "/slogans/movement/", prompt: "Where is the biggest health gain from exercise?", options: [
            "Going from very fit to elite",
            "Moving out of the least-active group",
            "Hitting one specific daily target" ], answer: 1,
          why: "The curve is front-loaded: leaving the bottom band buys more than a fit person gains by training even harder." },
        { url: "/slogans/sleep/", prompt: "Teenagers' body clocks naturally run late — it's biology, not laziness.", options: TF, answer: 0,
          why: "Through puberty, the chemistry that makes you sleepy arrives later. A 15-year-old who can't sleep at 10pm is being 15, not difficult." },
        { url: "/slogans/sun/", prompt: "Which is true about melanoma (a type of skin cancer)?", options: [
            "It only affects elderly people",
            "It's one of the commonest cancers in people aged 15–34",
            "Nothing can reduce the risk" ], answer: 1,
          why: "This is a rare item where the risk is already relevant now — and sunscreen, a shirt and shade genuinely reduce it." },
      ],
      after: [
        { url: "/slogans/smoking/", prompt: "For someone who already smokes, stopping before they're older:", options: [
            "Does nothing — the damage is already done",
            "Still recovers most of the risk, especially if they stop early",
            "Only helps people who never smoked" ], answer: 1,
          why: "The risk isn't banked. Stopping before 40 avoids the large majority of the excess risk; before 30, almost all of it." },
        { url: "/slogans/alcohol/", prompt: "'No safe dose' of alcohol mainly means:", options: [
            "Any single drink is extremely dangerous",
            "Risk rises from the very first drink with no safe threshold — though one drink's risk is small",
            "It's a scare with no evidence" ], answer: 1,
          why: "It's about the shape of the line (it rises from zero), not the size of one drink. Say both halves to be honest." },
        { url: "/slogans/gambling/", prompt: "Harm from gambling tracks mostly:", options: [
            "The player's willpower",
            "The product's design — faster, non-stop games hurt more people",
            "Pure chance" ], answer: 1,
          why: "Like tar in a cigarette, the harm tracks the product. Fast, continuous games (online slots) cause more disorder than slower ones." },
        { url: "/slogans/movement/", prompt: "How much movement do you need for most of the benefit?", options: [
            "A great deal, every single day",
            "Less than most people think — most of it arrives early",
            "It doesn't really matter how much" ], answer: 1,
          why: "Most of the benefit is captured well before any big target. There's nothing you have to 'hit'." },
        { url: "/slogans/sleep/", prompt: "The strongest reason to protect your sleep is:", options: [
            "It stops you dying young",
            "It's the best-evidenced short-term lever on your mood and focus",
            "There isn't really a good reason" ], answer: 1,
          why: "Sell it on the next two weeks, not the next fifty years — the short-term evidence on mood and attention is the strong part." },
        { url: "/slogans/sun/", prompt: "Which actually protects your skin?", options: [
            "A 'base tan' from a sunbed first",
            "Sunscreen, a shirt, and shade",
            "Nothing makes a difference" ], answer: 1,
          why: "The simple actions are backed by an actual randomised trial. Sunbeds sell you the exact exposure the evidence warns against." },
      ],
    },
    {
      key: "16plus",
      label: "Ages 16+",
      before: [
        { url: "/slogans/smoking/", prompt: "Stopping smoking before age 40 avoids roughly:", options: [
            "About half the excess risk", "More than 90% of the excess risk", "None — the damage is already done" ], answer: 1,
          why: "The risk is largely reversible if you get out early. Before 40 avoids >90%; before 30, >97% (Pirie et al. 2013)." },
        { url: "/slogans/alcohol/", prompt: "'No safe dose' is best understood as:", options: [
            "Alcohol is extremely dangerous in any amount",
            "A claim about the shape of the curve (risk rises from zero), not the size of the risk",
            "A scare with no evidence behind it" ], answer: 1,
          why: "It's a monotonicity claim — the curve rises from zero, with no protective threshold — but the absolute risk of one drink is small." },
        { url: "/slogans/gambling/", prompt: "The strongest part of the case against gambling is:", options: [
            "The suicide statistics", "The published house edge — arithmetic, not statistics", "Survey data on how many people gamble" ], answer: 1,
          why: "The negative expected value is a design parameter the operator chose and printed. It needs no p-value and is unanswerable." },
        { url: "/slogans/movement/", prompt: "The dose-response between activity and mortality is best described as:", options: [
            "Linear all the way up — more is always proportionally better",
            "Steeply front-loaded — the biggest gain is leaving the least-active band",
            "Essentially flat" ], answer: 1,
          why: "Accelerometer data show the largest mortality reduction comes from getting off the floor, not optimising the top." },
        { url: "/slogans/sleep/", prompt: "The evidence for sleep is strongest for:", options: [
            "Preventing Alzheimer's disease", "Short-term mood, attention and emotional regulation", "Extending lifetime mortality" ], answer: 1,
          why: "Sell it on the two weeks, not the fifty years. The long-term mortality associations are badly confounded." },
        { url: "/slogans/sun/", prompt: "Why is 'slip, slop, slap' unusually well-supported?", options: [
            "Huge observational studies", "An actual randomised controlled trial (Nambour)", "Expert opinion and consensus" ], answer: 1,
          why: "Nambour randomised a whole population to daily sunscreen — rare for a lifestyle claim, and the effect persisted for years." },
      ],
      after: [
        { url: "/slogans/smoking/", prompt: "The finding that smokers die about ten years younger is:", options: [
            "A rough single estimate", "Reproduced across different countries, sexes and decades", "From one small study" ], answer: 1,
          why: "It's one of the most reproduced findings in science — British Doctors Study, Million Women Study, US cohorts — with the mechanism traced to the DNA." },
        { url: "/slogans/alcohol/", prompt: "The genetic (Mendelian randomisation) studies of alcohol show:", options: [
            "A protective J-curve at low doses", "A monotonic rise in risk, undoing the old J-curve", "No relationship at all" ], answer: 1,
          why: "Genotype is fixed at conception, so it can't be confounded by sick-quitters. The apparent 'protection' at low doses was confounding." },
        { url: "/slogans/gambling/", prompt: "Gambling harm is 'product-specific', meaning:", options: [
            "Only weak-willed people are affected",
            "Faster, more continuous products (online slots) cause more disorder than slower ones",
            "It's entirely random who is harmed" ], answer: 1,
          why: "Disorder rates are far higher for online slots than sports betting — harm tracks the design (speed, continuity), not the character." },
        { url: "/slogans/movement/", prompt: "The causal evidence for activity is strongest:", options: [
            "At the very top of the curve", "At the bottom — leaving the least-active group", "Nowhere; it's all confounded" ], answer: 1,
          why: "Mendelian-randomisation support is best exactly where the effect is largest: at the bottom of the distribution." },
        { url: "/slogans/sleep/", prompt: "The long-term 'sleep duration and mortality' evidence is:", options: [
            "Rock solid", "Badly confounded by reverse causation", "Based on a randomised trial" ], answer: 1,
          why: "Illness both shortens and lengthens sleep, so the U-shaped mortality curves are confounded. There will never be a lifetime randomised trial." },
        { url: "/slogans/sun/", prompt: "In the Nambour sunscreen trial, the benefit:", options: [
            "Vanished as soon as the trial ended", "Persisted about ten years after the intervention stopped", "Was never statistically detectable" ], answer: 1,
          why: "Ten years after the sunscreen stopped, the daily-use arm had roughly half the melanomas — a strikingly durable effect." },
      ],
    },
  ],
};
