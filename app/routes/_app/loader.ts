import { data, redirect, type LoaderFunctionArgs } from 'react-router'
import { getTokens } from '~/utils'

const loader = async ({ request }: LoaderFunctionArgs) => {
  const tokens = await getTokens(request.headers)

  if (tokens.error) return redirect('/login')

  const outData: { userEmail?: string; error?: ErrorCodeKey } = {}
  const setCookie: string[] = []

  if (tokens.setCookie) setCookie.push(...tokens.setCookie)

  outData.userEmail = tokens.accessTokenPayload?.account.email

  return data(outData, {
    headers: setCookie.map((cookie) => ['set-cookie', cookie]),
  })
}

export default loader
