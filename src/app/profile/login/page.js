import LoginForm from "@/components/forms/LoginForm";
import UserProfile from "@/components/interfaces/UserProfile";
import { loginWithCookies } from "../../../../lib/serverFunctions";

export default async function page() {
  
  const user = await loginWithCookies();

  if(!user) return <LoginForm />

  return <UserProfile userData={user} />
}
