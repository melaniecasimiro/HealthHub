import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/apiAuth/[...nextauth]";
import { Role } from "@prisma/client";
import dayjs from 'dayjs';

const currentYear = dayjs().year();

interface JSONClause {
    [key: string]: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions); //authenticate user on the server side
    let accessGranted = false;

    if (!session)
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because not logged in" });

    if (req.method === "GET") {
        try {
            const { doctor } = req.query;
            let { month, year } = req.query
            let results: string | any[];
            if (doctor) { // user is patient or reciptionist or admin
                let dataClause = {}
                if (month && year) {
                    //create a new date with current year and start of {month}
                    let desiredMonth = Number(month)
                    let desiredYear = Number(year)
                    // console.log(desiredMonth)
                    const startDate = dayjs().month(desiredMonth).year(desiredYear).startOf('day').toISOString()
                    const endDate = dayjs().month(desiredMonth).year(desiredYear).endOf('month').toISOString()

                    // console.log("start", startDate)
                    // console.log("end", endDate)

                    dataClause = {
                        date: {
                            gte: startDate,
                            lte: endDate,
                        }
                    }
                    // console.log(dataClause)
                }
                if (session.user?.role == Role.RECEPTIONIST || session.user?.role == Role.ADMIN) {
                    accessGranted = true;
                    results = await prisma.visit.findMany({
                        where: {
                            doctorId: doctor.toString(),
                            ...dataClause
                        },
                    });
                    if (!results.length) throw "no data";
                    return res.status(200).json({ success: true, data: results });
                }
                if (session.user?.role == Role.PATIENT) {
                    accessGranted = true;
                    results = await prisma.visit.findMany({
                        where: {
                            doctorId: doctor.toString(),
                            ...dataClause
                        },
                        select: {
                            date: true,
                        }
                    });
                    if (!results.length) throw "no data";
                    console.log("doctor: ", doctor)
                    console.log("dataclause : ", dataClause)

                    return res.status(200).json({ success: true, data: results });
                }
            }

            else { //no params passed, logged in user should be the doctor
                if (session.user?.role == Role.DOCTOR) {
                    results = await prisma.visit.findMany({
                        where: {
                            doctorId: session.user?.id
                        },
                        include: {
                            patient: {
                                include: {
                                    user: {
                                        select:
                                        {
                                            firstName: true,
                                            lastName: true
                                        }
                                    }
                                }
                            }
                        },
                        orderBy: { date: "asc" }
                    });
                }
                return res.status(200).json({ success: true, data: results });
            }

        } catch (error) {
            //here should be a redirect to a general purpose error page
            return res
                .status(500)
                .json({ success: false, message: "ERROR : Failed to retrieve data because no data" });
        }
        if (!accessGranted) {
            return res
                .status(401)
                .json({ success: false, message: "You are not authorized to perform this action" });
        }
    }

    else {
        return res
            .status(400)
            .json({ success: false, message: "Invalid request method" });
    }
}
