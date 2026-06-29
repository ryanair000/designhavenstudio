import { ProtectedPage } from '@/components/admin/protected-page'
import { PricingManager } from './manager'
export default function Page(){return <ProtectedPage title="Pricing" subtitle="Manage website packages"><PricingManager/></ProtectedPage>}
