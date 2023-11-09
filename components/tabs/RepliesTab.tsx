import { Button } from "../ui/button";
import Link from "next/link";

export default async function RepliesTab() {
    const dataAvailable = false

    return (
        <section className="">
            {!dataAvailable ? (
                <div className="flex flex-col flex-1 py-10 px-4 ">
                    <p className="text-lg font-semibold sm:text-heading2-bold leading-tight font-semibold text-light-1">Welcome to Replies !</p>
                    <p className="mt-2 text-slate-500">Replies, mentions, and many more features are there only for verified accounts.<Link href={`/docs/verified-account-benefits`} className="text-purple-500 ml-2 text-small-medium">Learn More</Link> </p>
                    <p className="mt-2 text-slate-500">Not verified? Please wait for our paid membership to get a verified account to enjoy all features</p>
                    <Button className="bg-secondary-500 mt-10" disabled>Coming Soon...</Button>
                </div>
            ) : (
                <>
                    <p></p>
                </>
            )}
        </section>
    )
}