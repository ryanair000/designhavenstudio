import { ProtectedPage } from '@/components/admin/protected-page'
import { EnquiryManager } from '@/components/admin/enquiry-manager'
export default function Page(){return <ProtectedPage title="Enquiries" subtitle="Review quotation requests and lead progress"><EnquiryManager/></ProtectedPage>}
