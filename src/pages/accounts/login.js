import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

export default function Login() {
    const router = useRouter()
    const fSubmit = e => {
        e.preventDefault()
        const fuserLogin = e.target.userlogin.value.trim()
        const fuserPass = e.target.userpass.value.trim()
        signIn('credentials', {
            userlogin: fuserLogin,
            userpass: fuserPass,
            redirect: false,
            callbackUrl: 'http://localhost:3000/',
        }).then(res => {
            router.push(res.url)
        })
    }

    return (
        <form onSubmit={fSubmit}>
            <input type="text" name='userlogin'/>
            <input type="password" name='userpass'/>
            <button type='submit'>login</button>
        </form>
    )
}