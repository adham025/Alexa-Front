import { DotLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "50vh", width: "100%" }}
  >
    <DotLoader />
  </div>
  )
}
