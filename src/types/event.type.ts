export type EventType = 'user.created' | 'user.updated'

type EmailAddressType = {
  id: string
  email_address: string
}

type EventDataType = {
  id: string
  first_name: string
  last_name: string
  email_addresses: EmailAddressType[]
  primary_email_address_id: string
  attributes: Record<string, string | number>
}

export type Event = {
  data: EventDataType
  object: 'event'
  type: EventType
}
