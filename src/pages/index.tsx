import React from "react";
import { useSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'


function index() {
    // we have data retrieved from global context, and can be used 

    const { data: session } = useSession();
    if (session) {
        if (session.user.role == "DOCTOR") {
            return doctorIndex(session.user)
        }
        else if (session.user.role == "PATIENT") {
            return patientIndex(session.user)
        }
        else if (session.user.role == "RECEPTIONIST") {
            return receptionistIndex(session.user)
        }
        else if (session.user.role == "LAB_ASSISTANT") {
            return labAssistantIndex(session.user)
        }
        else if (session.user.role == "LAB_SUPERVISOR") {
            return labSupervisorIndex(session.user)
        }
    } else {
        return (
            <div>
                <section className="bg-blue-600">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                                Welcome to HealthHub
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                We provide the best care for you and your family's health.
                            </p>
                            <div className="mt-5 max-w-md mx-auto flex justify-center">
                                <a
                                    href="/auth/login"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-700 bg-white hover:bg-blue-50"
                                >
                                    Log In & Book an Appointment
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mt-10">
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                            Why choose our clinic?
                        </h2>
                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Experienced doctors
                                    </h3>
                                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                                        <p>
                                            Our clinic is staffed with highly trained medical professionals who are dedicated to providing the best possible care to our patients. From routine check-ups to complex medical procedures, our team has the expertise and experience to handle all of your medical needs.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        State-of-the-art facilities
                                    </h3>
                                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                                        <p>
                                            We pride ourselves on using the latest medical technologies and equipment to ensure that our patients receive the best possible care. Our modern facilities are designed to provide a comfortable and welcoming environment for all of our patients.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Personalized Approach
                                    </h3>
                                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                                        <p>
                                            At our clinic, we believe in treating each patient as an individual with unique medical needs. That's why we take a personalized approach to healthcare, working closely with each patient to develop a treatment plan that is tailored to their specific needs and preferences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

function handleSignOut() {
    // console.log("signing out MF");
    // setUser(initialState);
    localStorage.removeItem('userInfo');
    // localStorage.clear();
    signOut();
}

function doctorIndex(user: Session["user"]) {
    return (
        <div>
            <p>{user.name} + {user.role} hekllooooo </p>
            <p>Welcome back panie doktorze {user.name}</p>
            <button onClick={() => handleSignOut()}>Sign out </button>
        </div>
    )
}

function patientIndex(user: Session["user"]) {
    return (
        <div>
            <p>{user.name} + {user.role} hekllooooo </p>
            <p>Welcome back commander {user.name}</p>
            <button onClick={() => handleSignOut()}>Sign out </button>
        </div>
    )
}
function labAssistantIndex(user: Session["user"]) {
    return (
        <div>
            <p>{user.name} + {user.role} hekllooooo </p>
            <p>Welcome back commander {user.name}</p>
            <button onClick={() => handleSignOut()}>Sign out </button>
        </div>
    )
}
function labSupervisorIndex(user: Session["user"]) {
    return (
        <div>
            <p>{user.name} + {user.role} hekllooooo </p>
            <p>Welcome back commander {user.name}</p>
            <button onClick={() => handleSignOut()}>Sign out </button>
        </div>
    )
}

function receptionistIndex(user: Session["user"]) {
    return (
        <div>
            <p>{user.name} + {user.role} hekllooooo </p>
            <p>Welcome back commander {user.name}</p>
            <button onClick={() => handleSignOut()}>Sign out </button>
        </div>
    )
}
export default index
