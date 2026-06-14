import type { Metadata } from 'next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { settingsSections } from '@/data/admin/settings'

export const metadata: Metadata = {
  title: 'Settings'
}

const AdminSettingsPage = () => {
  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Settings</h1>
        <p className='text-muted-foreground text-sm'>
          Store preferences. Inputs are presentational only — no persistence yet.
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        {settingsSections.map((section, index) => (
          <div key={section.id} className='flex flex-col gap-4'>
            <Card size='sm'>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col gap-4'>
                  {section.fields.map(field => (
                    <div key={field.id} className='flex flex-col gap-1.5'>
                      <label htmlFor={field.id} className='text-sm font-medium'>
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.id}
                          name={field.id}
                          defaultValue={field.value}
                          placeholder={field.placeholder}
                          rows={4}
                          className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                        />
                      ) : (
                        <Input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          defaultValue={field.value}
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}

                  <div className='flex justify-end'>
                    <Button disabled>Save changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {index < settingsSections.length - 1 ? <Separator /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminSettingsPage
