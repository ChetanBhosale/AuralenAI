export const WORKFLOWS = {
  ONBOARD: 'onboardWorkflow',
} as const

// Workflow input/output types
export interface OnboardWorkflowInput {
  userId: string
  organizationId: string
  websiteUrl: string
}

export interface OnboardWorkflowResult {
  success: boolean
  message?: string
}
