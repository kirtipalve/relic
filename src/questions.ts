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

export const willQuestions: Question[] = [
  {
    key: 'executorName',
    prompt: 'Who do you want to name as executor — the person responsible for carrying out your will? Give their full name and relationship to you.',
    type: 'text',
  },
  {
    key: 'executorBackup',
    prompt: 'Would you like to name a backup executor, in case your first choice is unable to serve?',
    type: 'text',
    optional: true,
  },
  {
    key: 'guardian',
    prompt: 'If you have minor children, who would you like to name as their guardian?',
    type: 'text',
    optional: true,
  },
  {
    key: 'guardianBackup',
    prompt: 'Would you like to name a backup guardian as well?',
    type: 'text',
    optional: true,
  },
  {
    key: 'beneficiaries',
    prompt: 'Who are your beneficiaries, and what share or specific items should each of them receive?',
    type: 'text',
    pace: 'slow',
  },
  {
    key: 'assets',
    prompt: 'List your major assets — real estate, bank or investment accounts, vehicles, business interests, digital assets, or other valuable property.',
    type: 'text',
  },
  {
    key: 'specificBequests',
    prompt: "Are there any specific items you'd like to leave to specific people? For example, \"my watch to my brother John.\"",
    type: 'text',
    optional: true,
  },
  {
    key: 'residuaryEstate',
    prompt: "Who should receive everything else not specifically mentioned above — this is called your residuary estate?",
    type: 'text',
  },
  {
    key: 'debts',
    prompt: 'Any debts or liabilities you want addressed in your will?',
    type: 'text',
    optional: true,
  },
  {
    key: 'funeralWishes',
    prompt: 'Do you have any funeral or burial wishes you want recorded?',
    type: 'text',
    optional: true,
    pace: 'slow',
  },
  {
    key: 'charitableDonations',
    prompt: 'Would you like to leave anything to charity?',
    type: 'text',
    optional: true,
  },
  {
    key: 'petCare',
    prompt: 'Do you have any pets you want provided for?',
    type: 'text',
    optional: true,
  },
]
