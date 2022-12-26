import { useRouter } from "next/router"

const id = () => {
    const router = useRouter();
    const electionId = router.query.id;
  return (
    <div>Hello from dynamic page {electionId}</div>
  )
}

export default id