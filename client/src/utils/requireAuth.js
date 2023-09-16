import { redirect } from "react-router";
import { verifyToken } from "./crud";

export async function requireAuth(req) {
    const url = new URL(req.url)
    console.log(`require auth fired from ${url.pathname}`)
    const location = url.pathname + url.search || ""
    const verified = await verifyToken()
    if(!verified) {
        throw redirect(`/login?message=You must be logged in first!&from=${location}`)
    }
    return null
}