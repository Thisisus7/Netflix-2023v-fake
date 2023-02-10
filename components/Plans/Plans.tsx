import { Product } from "@stripe/firestore-stripe-payments"
import Head from "next/head"
import Link from "next/link"
import { AiOutlineCheck } from "react-icons/ai"
import { useState } from "react"

import useAuth from "../../hooks/useAuth"
import Table from "./Table"
import Loader from "./Loader"
import { loadCheckout } from "../../lib/stripe"

interface Props {
    products: Product[];
}

function Plans({products}: Props) {
    const {logout, user} = useAuth();
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
    const [isBillingLoading, setBillingLoading] = useState(false);

    const subscribeToPlan = () => {
        if (!user) return;
    
        loadCheckout(selectedPlan?.prices[0].id!);
        setBillingLoading(true);
      }

    return (
        <div>
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* header */}
            <header className="bg-[#fff] border-b border-[#e6e6e6]">
                <Link href="/">
                    <img
                        src="https://rb.gy/ulxxee"
                        alt="Netflix"
                        width={167}
                        height={45}
                        className="cursor-pointer object-contain"
                    />
                </Link>
                <button className="text-[#333] text-sm font-bold hover:underline" onClick={logout}>
                    Sign Out
                </button>
            </header>
            {/* main */}
            <main className="!bg-white text-black mx-auto max-x-5xl px-5 pt-28 pb-12 transition-all md:px-10">
                <h1 className="mb-3 text-2xl font-medium">
                    Choose the plan that's right for you (Totally free)
                </h1>
                <ul>
                    <li className="flex items-center gap-x-2 text-base">
                        <AiOutlineCheck className="h-7 w-7 text-[#E50914]" /> 
                        Watch all you want.
                    </li>
                    <li className="flex items-center gap-x-2 text-base">
                        <AiOutlineCheck className="h-7 w-7 text-[#E50914]" /> 
                        Recommendations just for you.
                    </li>
                    <li className="flex items-center gap-x-2 text-base">
                        <AiOutlineCheck className="h-7 w-7 text-[#E50914]" /> 
                        Change or cancel your plan anytime.
                    </li>
                </ul>
                {/* Plans */}
                <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex w-full items-center justify-center self-end md:w-3/5">
                        {products.map((product) => (
                            <div 
                                key={product.id} 
                                className={`planBox ${selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'}`}
                                onClick={() => setSelectedPlan(product)}
                            >
                                {product.name}
                            </div>
                        ))}
                    </div>
                    {/* Table */}
                    <Table products={products} selectedPlan={selectedPlan} />
                    <button
                        disabled={!selectedPlan || isBillingLoading}
                        className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] text-white ${
                        isBillingLoading && 'opacity-60'
                        }`}
                        onClick={subscribeToPlan}
                    >
                        {isBillingLoading ? (
                            <Loader color="dark:fill-dark-300" />
                            ) : (
                            'Next'
                        )}
                    </button> 
                </div>
            </main>
        </div>
    )
}

export default Plans