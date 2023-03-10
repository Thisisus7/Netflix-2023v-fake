import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Membership from "../components/Membership";

import useAuth from "../hooks/useAuth";
import useSubscription from "../hooks/useSubscription";
import payments from "../lib/stripe";

interface Props {
  products: Product[];
}

function Account({products}: Props) {
  const { user, logout } = useAuth();
  const subscription = useSubscription(user);

  return (
    <div>
        <Head>
            <title>Netflix - Account Settings</title>
            <link rel="icon" href="/logo.png" />
        </Head>
        <header className={`bg-[#141414]`}>
            <Link href="/">
            <img
                src="https://rb.gy/ulxxee"
                width={100}
                height={100}
                className="cursor-pointer object-contain"
            />
            </Link>
            <Link href="/account">
            <img
                src="favicon.ico"
                alt=""
                className="cursor-pointer rounded h-7 w-7"
            />
            </Link>
      </header>
      <main className="pt-20 mx-auto max-w-4xl px-5 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-lg md:text-xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#999]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>
        <Membership />
        <div className="account-info">
          <h4>Plan Details</h4>
          {/* current plan */}
          <div className="col-span-2 font-medium">
            {products.filter((product) => product.id === subscription?.product)[0]?.name}
          </div>
          <p className="cursor-pointer text-blue-500 hover:underline md:text-right">
            Change plan
          </p>
        </div>
        <div className="account-info">
        <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  )
}

export default Account;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};