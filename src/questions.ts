import type { Answers } from './store'

export type Question = {
  key: string
  prompt: string
  type: 'text' | 'select'
  options?: string[]
  optional?: boolean
  condition?: (answers: Answers) => boolean
  pace?: 'fast' | 'slow'
}

export const generalQuestions: Question[] = [
  { key: 'nameAndOrigin', prompt: 'What name would you like me to call you, and where did you grow up?', type: 'text', pace: 'fast' },
  {
    key: 'childhoodMemory',
    prompt: 'What is one happy memory from your childhood or younger years that still stays with you?',
    type: 'text',
    pace: 'slow',
  },
  {
    key: 'lifePath',
    prompt: 'What path did your life take after school, through work, travel, family, or something else important to you?',
    type: 'text',
    pace: 'slow',
  },
  {
    key: 'spousePartner',
    prompt: 'Have you had a spouse, partner, or companion who became an important part of your life?',
    type: 'text',
    pace: 'slow',
  },
  {
    key: 'familyChildren',
    prompt: 'Do you have children, stepchildren, grandchildren, or anyone else you consider family?',
    type: 'text',
    pace: 'slow',
  },
  {
    key: 'realEstate',
    prompt: 'As you started building your life, did you buy a home, land, rental property, or other real estate?',
    type: 'text',
    pace: 'fast',
  },
  {
    key: 'retirementSavings',
    prompt: 'Did you begin building retirement savings or income through a 401(k), 403(b), IRA, Roth IRA, pension, or similar plan?',
    type: 'text',
    pace: 'fast',
  },
  {
    key: 'investments',
    prompt: 'Did you start investing in stocks, bonds, mutual funds, ETFs, brokerage accounts, or other investments?',
    type: 'text',
    pace: 'fast',
  },
  {
    key: 'businessInterests',
    prompt: 'Did you ever own a business, part of a company, company stock, or another business interest?',
    type: 'text',
    pace: 'fast',
  },
  {
    key: 'bankAccounts',
    prompt: 'Did you build up checking, savings, CDs, or other money held with banks or credit unions?',
    type: 'text',
    pace: 'fast',
  },
  {
    key: 'lifeInsurance',
    prompt: 'Did you take out life insurance, purchase an annuity, or create another financial benefit meant to support someone you care about?',
    type: 'text',
    pace: 'fast',
  },
  {
    key: 'closestPeople',
    prompt: 'Who are the people you feel closest to today and would most want to look after?',
    type: 'text',
    pace: 'slow',
  },
  {
    key: 'othersToInclude',
    prompt: 'Are there other people, charities, communities, or organizations you would especially want to leave something to?',
    type: 'text',
    pace: 'fast',
  },
  {
    key: 'treasuredBelongings',
    prompt: 'Are there vehicles, jewelry, artwork, collections, heirlooms, or other belongings that you would especially want someone to receive?',
    type: 'text',
    pace: 'fast',
  },
  {
    key: 'catchAll',
    prompt: "Looking at everything you've built, is there anything else you own, invested in, or treasure that you would want passed down, and who would you want to receive it?",
    type: 'text',
    pace: 'slow',
  },
]

const NEGATIVE_ANSWERS = new Set(['no', 'n/a', 'na', 'none', 'nope', 'not really', 'no.', '-', '(skipped)'])

function hasRealAnswer(value: string | undefined): value is string {
  if (!value) return false
  const normalized = value.trim().toLowerCase()
  return normalized.length > 0 && !NEGATIVE_ANSWERS.has(normalized)
}

function excerpt(value: string, max = 90): string {
  const clean = value.trim()
  return clean.length > max ? `${clean.slice(0, max)}…` : clean
}

// Topics from page 1 that, if answered, get a targeted follow-up here asking
// who should receive that specific thing — instead of a generic asset dump.
const ALLOCATION_TOPICS: { key: string; label: string; pace: 'fast' | 'slow' }[] = [
  { key: 'spousePartner', label: 'your spouse or partner', pace: 'slow' },
  { key: 'familyChildren', label: 'your children or family', pace: 'slow' },
  { key: 'realEstate', label: 'the real estate you mentioned', pace: 'fast' },
  { key: 'retirementSavings', label: 'your retirement savings', pace: 'fast' },
  { key: 'investments', label: 'your investments', pace: 'fast' },
  { key: 'businessInterests', label: 'your business interest', pace: 'fast' },
  { key: 'bankAccounts', label: 'your bank accounts', pace: 'fast' },
  { key: 'lifeInsurance', label: 'your life insurance or annuity', pace: 'fast' },
  { key: 'treasuredBelongings', label: 'the belongings you mentioned', pace: 'fast' },
  { key: 'othersToInclude', label: 'the other people or charities you mentioned', pace: 'fast' },
  { key: 'catchAll', label: 'the other things you mentioned', pace: 'slow' },
]

// Page 2's questions are built from this specific will template's blank fields,
// plus a targeted follow-up for each thing the person actually told us about in page 1
// (skips topics they answered "no" or left blank to).
export function buildWillQuestions(generalAnswers: Answers): Question[] {
  const questions: Question[] = [
    { key: 'residenceCity', prompt: 'What city do you currently legally reside in?', type: 'text', pace: 'fast' },
    { key: 'residenceCounty', prompt: 'And which county is that in?', type: 'text', pace: 'fast' },
    {
      key: 'residenceState',
      prompt: 'And the state — this is also what determines which state\'s laws will govern your will.',
      type: 'text',
      pace: 'fast',
    },
    {
      key: 'executorDetails',
      prompt:
        'Who do you want to name as your Personal Representative (executor) — the person responsible for carrying out your will? Please share their full name and current address, including county and state.',
      type: 'text',
      pace: 'fast',
    },
    {
      key: 'executorBackupDetails',
      prompt: 'Would you like to name a backup executor, in case your first choice is unable to serve? If so, share their full name and address.',
      type: 'text',
      optional: true,
      pace: 'fast',
    },
    {
      key: 'guardian',
      prompt: 'If you have minor children, who would you like to name as their guardian? Please include their full name and address.',
      type: 'text',
      optional: true,
      pace: 'fast',
    },
    {
      key: 'guardianBackup',
      prompt: 'Would you like to name a backup guardian as well?',
      type: 'text',
      optional: true,
      pace: 'fast',
    },
  ]

  for (const topic of ALLOCATION_TOPICS) {
    const answer = generalAnswers[topic.key]
    if (!hasRealAnswer(answer)) continue
    questions.push({
      key: `alloc_${topic.key}`,
      prompt: `Earlier you mentioned ${topic.label}: "${excerpt(answer)}". Who should receive this, and is there anything specific you'd like noted?`,
      type: 'text',
      optional: true,
      pace: topic.pace,
    })
  }

  questions.push(
    {
      key: 'beneficiaryDetails',
      prompt:
        'For each person you named above, could you give me their full name, current address, relationship to you, and the last 4 digits of their Social Security Number? For example: "Jane Doe – spouse – 123 Main St, Springfield IL – SSN last 4: 1234."',
      type: 'text',
      optional: true,
      pace: 'fast',
    },
    {
      key: 'residuaryEstate',
      prompt: 'Who should receive everything else not specifically mentioned above — this is called your residuary estate?',
      type: 'text',
      optional: true,
      pace: 'fast',
    },
  )

  return questions
}
