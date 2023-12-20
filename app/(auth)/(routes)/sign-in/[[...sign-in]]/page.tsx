import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export default function Page() {
  return (
    <form action={async () => {
      "use server"
      await signIn("google")
    }}>
      <button>Sign in</button>
    </form>
  )
}
