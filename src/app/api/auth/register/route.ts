import { PrismaClient } from '@prisma/client'
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient()

interface RequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    latitude: string;
    longitude: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    try {
        const ps = await bcrypt.hash(body.password, 10)
        await prisma.user.create({
            data: {
                email: body.email,
                password: ps,
                coords: JSON.stringify({latitude: body.latitude, longitude: body.longitude}),
                profile: {
                    create: {
                        firstName: body.firstName.toLowerCase(),
                        lastName: body.lastName.toLowerCase(),
                    },
                },

            },
        })
        return new Response(JSON.stringify({ status: 'success' }));
    } catch (error) {
        return new Response(JSON.stringify({ status: 'failed', message: JSON.stringify(error) }));
    }

}