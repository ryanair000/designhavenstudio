import { ProtectedPage } from '@/components/admin/protected-page'
import { ResourceManager } from '@/components/admin/resource-manager'
const fields={title:{label:'Service title',required:true},description:{label:'Description',type:'textarea'},link_label:{label:'Link label'},link_url:{label:'Link destination'},display_number:{label:'Display number'},sort_order:{label:'Display order',type:'number'},visible:{label:'Show on website',type:'checkbox',default:true}}
export default function Page(){return <ProtectedPage title="Services" subtitle="Manage service cards and visibility"><ResourceManager resource="services" title="Services" description="Update services shown on the homepage." fields={fields}/></ProtectedPage>}
