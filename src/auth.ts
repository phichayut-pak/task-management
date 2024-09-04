import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            authorize: async(credentials): Promise<any> => {
                const {email, password} = credentials

                if(email === 'test123@gmail.com' && password === 'test123'){ 
                    return {
                        id: 1,
                        name: 'Pak',
                        email: 'test123@gmail.com',
                        image_url: 'https://i.ibb.co/dp56wRB/pak-heart.jpg'
                    }
                }

                return null
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, user}: any) {
            if (user) {
                token.image_url = user.image_url
            }

            return token
        },

        async session({ session, token }: any) {
            if (token?.image_url) {
                session.user.image_url = token.image_url
            }
            return session
        }

    },
    secret: process.env.AUTH_SECRET
})