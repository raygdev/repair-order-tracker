import { redirect } from "react-router";
import { verifyToken } from "./crud.js";

export async function requireAuth(req: Request) {
    const url = new URL(req.url)
    const location = url.pathname + url.search || ""
    const verified = await verifyToken()
    if(!verified) {
        throw redirect(`/login?message=You must be logged in first!&from=${location}`)
    }
    return null
}