import { requireAdmin } from '@/lib/admin'
import { AdminShell } from './admin-shell'

export async function ProtectedPage(props) {
  const admin = await requireAdmin()
  return <AdminShell admin={admin} title={props.title} subtitle={props.subtitle}>{props.children}</AdminShell>
}
