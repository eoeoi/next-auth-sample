import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const secret = process.env.NEXTAUTH_SECRET


export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            type: 'credentials',
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                userlogin: {label: "Username", type: "text"},
                userpass: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                console.log(credentials)
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: {"Content-Type": "application/json"}
                // })
                // const user = await res.json()
                const user = {id: 1}
                console.log('user', user)

                // If no error and we have user data, return it
                // if (user) {
                //     console.log('user yes', 'ok')
                //     return user
                // }
                // Return null if user data could not be retrieved
                return credentials
            },
        }),
    ],
    pages: {
        signIn: '/accounts/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            console.log('jwt')
            token.pk = 5
            // token.email =
            return token
        },
        async session({session, token, user}) {
            console.log('- token', token)
            console.log('- user', user)
            session.user.id = token.pk
            session.user.email = 'asdf@naver.com'
            // session.user.name = 'asdf@naver.com'
            //session.user. = token.pk
            console.log('-sess', session)
            return session
        }
    }
})