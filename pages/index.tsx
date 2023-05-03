import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
}

export default function Home() {
    return (
        <>
            <button onClick={() => signOut()} className="h-10 w-full bg-white">
                Logout
            </button>
        </>
    );
}
