import {useSession} from "next-auth/react";

export default function Home() {
    const {data: session, status} = useSession()
    console.log(session)
    return (
        <div>
            asdf
            <div>{session.user.email}</div>
            <div>{session.user.id}</div>
            <div>{session.user.name}</div>
            <div>{status}</div>
        </div>
    )
}
