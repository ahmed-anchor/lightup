import LoginForm from "@/components/forms/LoginForm"
import { cookies } from "next/headers"

export default function page() {
  const token = cookies().get('token')
  
  if(token) return

  return <LoginForm />
}
