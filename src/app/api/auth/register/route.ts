import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

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
        bcrypt.hash(body.password, 10, async function(err, hash) {
            await prisma.user.create({
                data: {
                  email: body.email,
                  password: hash,
                  profile: {
                    create: {
                        firstName: body.firstName,
                        lastName: body.lastName,
                    },
                  },
                  location: {
                    create: {
                        latitude: body.latitude,
                        longitude: body.longitude,
                    }
                  }
                },
              })
        })
        return new Response(JSON.stringify({status: 'success', data: JSON.stringify(ps), body: JSON.stringify(body)}));
    } catch (error) {
        return new Response(JSON.stringify({status: 'failed', message: JSON.stringify(error)}));
    }
  
}