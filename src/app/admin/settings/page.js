import { ProtectedPage } from '@/components/admin/protected-page'
import { SettingsEditor } from '@/components/admin/settings-editor'
export default function Page(){return <ProtectedPage title="Site settings" subtitle="Manage website identity and contact channels"><SettingsEditor/></ProtectedPage>}
