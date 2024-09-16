import { useRouteError, Link } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  console.log(error)
  if (error.status === 404) {
    return (
      <main className="full-h-center">
        <p className="text-9xl">404</p>
        <h1 className="text-6xl mt-4">Page Not Found</h1>
        <p className="text-lg mt-4">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link type="button" className="btn btn-primary mt-8 text-base">
          Back to Homepage
        </Link>
      </main>
    )
  }
  return (
    <main className="full-h-center">
      <p className="text-9xl">Ops!!</p>
      <h1 className="text-6xl mt-4">An Error Occured</h1>
      <p className="text-lg mt-4">{error.error?.message}</p>
      <Link type="button" className="btn btn-primary mt-8 text-base">
        Back to Homepage
      </Link>
    </main>
  )
}
export default Error
