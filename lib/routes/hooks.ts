import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";



export const useAppRouter = (href: string, options?: NavigateOptions | undefined) => {
    const router = useRouter()
    return router
}