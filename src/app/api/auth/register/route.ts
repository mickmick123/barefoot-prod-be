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
        bcrypt.hash(body.password, 10, async function(err, hash) {
            await prisma.user.create({
                data: {
                  email: body.email,
                  password: body.password,
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
        return new Response(JSON.stringify({status: 'success'}));
    } catch (error) {
        return new Response(JSON.stringify({status: 'failed', message: JSON.stringify(error)}));
    }
  
}