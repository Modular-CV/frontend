import { redirect, type LoaderFunctionArgs } from 'react-router'
import { getTokens } from '~/utils'

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { error } = await getTokens(request.headers)

  if (!error) return redirect('/')
}

export default loader
