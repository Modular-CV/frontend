import { redirect, type LoaderFunctionArgs } from 'react-router'
import { getTokens } from '~/utils'

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { error, setCookie } = await getTokens(request.headers)

  if (!error)
    return redirect('/', {
      headers: setCookie?.map((cookie) => ['set-cookie', cookie]),
    })
}

export default loader
