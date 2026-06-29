import { ProtectedPage } from '@/components/admin/protected-page'
import { ResourceManager } from '@/components/admin/resource-manager'
const fields={name:{label:'Category name',required:true},slug:{label:'URL slug',required:true},description:{label:'Description',type:'textarea'},sort_order:{label:'Display order',type:'number'},visible:{label:'Show on website',type:'checkbox',default:true}}
export default function Page(){return <ProtectedPage title="Categories" subtitle="Organize the public portfolio filters"><ResourceManager resource="categories" title="Categories" description="Manage names, order and website visibility." fields={fields}/></ProtectedPage>}
