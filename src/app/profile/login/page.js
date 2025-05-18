import LoginForm from "@/components/forms/LoginForm";
import UserProfile from "@/components/interfaces/UserProfile";
import { checkCookies } from "../../../../lib/serverFunctions";

export default async function page() {
  
  const user = await checkCookies();

  if(!user) return <LoginForm />

  return <UserProfile userData={user} />
}
