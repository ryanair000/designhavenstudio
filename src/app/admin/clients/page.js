import { ProtectedPage } from '@/components/admin/protected-page'
import { ResourceManager } from '@/components/admin/resource-manager'
const fields={name:{label:'Client name',required:true},logo_url:{label:'Logo image URL'},logo_alt:{label:'Logo alternative text'},website_url:{label:'Website URL'},permission_status:{label:'Permission status',type:'select',options:['draft','awaiting','approved']},sort_order:{label:'Display order',type:'number'},visible:{label:'Show publicly',type:'checkbox'}}
export default function Page(){return <ProtectedPage title="Clients" subtitle="Manage client logos and display permission"><ResourceManager resource="clients" title="Clients" description="Publish logos only after client approval." fields={fields}/></ProtectedPage>}
