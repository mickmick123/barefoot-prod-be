import util from "util";
import db from "../util/db";
import CredentialsProvider from "next-auth/providers/credentials";

const query = util.promisify(db.query).bind(db);


export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                let user = await query(`SELECT * FROM users WHERE email = '${credentials.email}'`);
                user = user[0];

                if (!user) {
                    return null;
                }
                if (user.password) {
                    return user.password === credentials.password ? user : null;
                }
            }
        })
    ],
    secret: 'hhhh'
}
