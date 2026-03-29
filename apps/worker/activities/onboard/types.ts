export interface ScrapeWebsiteInput {
    productId: number
    websiteUrl: string
}

export interface GenerateAgentMdInput {
    agentId: number
    productId: number
    productMd: string
    speech: string
    goal: string
    toneContext: string | null
}

export interface OnboardActivities {
    scrapeWebsite(input: ScrapeWebsiteInput): Promise<string>
    generateAgentMd(input: GenerateAgentMdInput): Promise<void>
}
