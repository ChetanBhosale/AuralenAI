import { Connection, Client } from '@temporalio/client'
import env from '@repo/secrets'

let client: Client | null = null

export async function getTemporalClient(): Promise<Client> {
  if (client) return client

  const connection = await Connection.connect({
    address: env.TEMPORAL_ADDRESS,
  })

  client = new Client({
    connection,
    namespace: env.TEMPORAL_NAMESPACE,
  })

  return client
}

export { Client }
