import {useRouteError} from "react-router-dom"

function ErrorPage() {
    const error = useRouteError();
  return (
    <div className="Error">
        <h1>Oops something went wrong plese try again</h1>
        <p>{error.statusText}</p>
        <p>{error.message}</p>
        <button >Go Back</button>
    </div>
  )
}

export default ErrorPage