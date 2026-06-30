import { ProtectedPage } from '@/components/admin/protected-page'
import { HomepageEditor } from '@/components/admin/homepage-editor'
export default function Page(){return <ProtectedPage title="Homepage" subtitle="Edit and publish the public homepage"><HomepageEditor/></ProtectedPage>}
