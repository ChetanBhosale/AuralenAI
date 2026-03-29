// Activity name constants
export const ACTIVITIES = {
  SCRAPE_WEBSITE: 'scrapeWebsite',
  GENERATE_AGENT_IDENTITY: 'generateAgentIdentity',
  SAVE_ONBOARD_RESULT: 'saveOnboardResult',
} as const

// Activity input/output interfaces (implementations live in apps/worker)
export interface ScrapeWebsiteInput {
  url: string
}

export interface ScrapeWebsiteResult {
  content: string
  title?: string
}

export interface GenerateAgentIdentityInput {
  websiteContent: string
  organizationId: string
}

export interface GenerateAgentIdentityResult {
  name: string
  persona: string
  tone: string
}

export interface SaveOnboardResultInput {
  organizationId: string
  agentIdentity: GenerateAgentIdentityResult
}
