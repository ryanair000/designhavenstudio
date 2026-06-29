import { getAdmin } from '@/lib/admin'

export async function GET() {
  const admin = await getAdmin()
  return admin ? Response.json({ admin }) : Response.json({ error: 'Unauthorized' }, { status: 401 })
}
