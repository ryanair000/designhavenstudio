import { ProtectedPage } from '@/components/admin/protected-page'
import { ProjectsManager } from './manager'

export default function Page(){return <ProtectedPage title="Projects" subtitle="Manage portfolio projects and publishing"><ProjectsManager/></ProtectedPage>}
