import { ProtectedPage } from '@/components/admin/protected-page'
import { JsonPageEditor } from '@/components/admin/json-page-editor'
export default function Page(){return <ProtectedPage title="Homepage" subtitle="Edit and publish the public homepage"><JsonPageEditor pageKey="home" title="Homepage content" description="Update the hero, metrics and brand section."/></ProtectedPage>}
