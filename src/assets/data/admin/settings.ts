// Settings sections for the admin settings page. Static for the MVP.
// Will become a real form backed by a service when persistence is wired up.
export type SettingsFieldType = 'text' | 'email' | 'textarea'

export type SettingsField = {
  id: string
  label: string
  type: SettingsFieldType
  value: string
  placeholder?: string
}

export type SettingsSection = {
  id: string
  title: string
  description: string
  fields: SettingsField[]
}

export const settingsSections: SettingsSection[] = [
  {
    id: 'store',
    title: 'Store Information',
    description: 'Public-facing details about your store.',
    fields: [
      { id: 'store-name', label: 'Store name', type: 'text', value: 'Armak Clothing Co.' },
      {
        id: 'store-email',
        label: 'Contact email',
        type: 'email',
        value: 'hello@armak.co',
        placeholder: 'you@example.com'
      },
      {
        id: 'store-description',
        label: 'Description',
        type: 'textarea',
        value: 'Premium t-shirts crafted with quality fabrics and bold designs.'
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Choose what you want to be notified about.',
    fields: [
      { id: 'notif-orders', label: 'New orders', type: 'text', value: 'Enabled' },
      { id: 'notif-stock', label: 'Low stock alerts', type: 'text', value: 'Enabled' }
    ]
  }
]
