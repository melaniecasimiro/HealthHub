import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/apiAuth/[...nextauth]";
import { Role } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions); //authenticate user on the server side


    if (!session)
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because not logged in" });
    const { test_id } = req.query
    if (req.method == "GET") {
        if (session.user?.role == Role.DOCTOR) {

            try {
                const test = await prisma.laboratoryExamination.findUnique({
                    where: {
                        testId: test_id.toString(),
                    },
                })
                if(test == null) throw "no data";
                return res.status(200).json({ success: true, data: test });
            }
            catch (error) {
                //here should be a redirect to a general purpose error page
                return res
                    .status(500)
                    .json({ success: false, message: "ERROR : Failed to retrieve data" });
            }
        }
        //return not authorized
        return res
            .status(401)
            .json({ success: false, message: "you are not a Doctor" });
    }

    return res
        .status(400)
        .json({ success: false, message: "Invalid request method" });
}
