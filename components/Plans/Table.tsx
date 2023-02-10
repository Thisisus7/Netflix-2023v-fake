import { Product } from "@stripe/firestore-stripe-payments";
import { AiOutlineCheck, AiOutlineMinus } from "react-icons/ai";

interface Props {
    products: Product[];
    selectedPlan: Product | null;
}

function Table({ products, selectedPlan }: Props) {
  return (
    <table>
        <tbody className="divide-y divide-[gray]">
            {/* Price */}
            <tr className="tableRow">
                <td className="tableDataTitle">Monthly price</td>
                {products.map((product) => (
                    <td
                        className={`tableDataFeature ${
                            selectedPlan?.id === product.id
                            ? 'text-[#E50914]'
                            : 'text-[gray]'
                        }`}
                        key={product.id}
                    >
                        ${product.prices[0].unit_amount! / 100}
                    </td>
                ))}
            </tr>
            {/* Video quality*/}
            <tr className="tableRow">
                <td className="tableDataTitle">Video quality</td>
                {products.map((product) => (
                    <td
                        className={`tableDataFeature ${
                            selectedPlan?.id === product.id
                            ? 'text-[#E50914]'
                            : 'text-[gray]'
                        }`}
                        key={product.id}
                    >
                        {product.metadata.VideoQuality}
                    </td>
                ))}
            </tr>
            {/* Resolution */}
            <tr className="tableRow">
                <td className="tableDataTitle">Resolution</td>
                {products.map((product) => (
                    <td
                        className={`tableDataFeature ${
                            selectedPlan?.id === product.id
                            ? 'text-[#E50914]'
                            : 'text-[gray]'
                        }`}
                        key={product.id}
                    >
                        {product.metadata.resolution}
                    </td>
                ))}
            </tr>
            {/* Portability */}
            <tr className="tableRow">
                <td className="tableDataTitle">Watch on your TV, computer, mobile phone and tablet</td>
                {products.map((product) => (
                    <td
                        className={`tableDataFeature ${
                            selectedPlan?.id === product.id
                            ? 'text-[#E50914]'
                            : 'text-[gray]'
                        }`}
                        key={product.id}
                    >
                        {product.metadata.portability === 'true' 
                            ? <AiOutlineCheck className="inline-block h-8 w-8" />
                            : <AiOutlineMinus className="inline-block h-8 w-8" />
                        }
                    </td>
                ))}
            </tr>
            {/* Downloads */}
            <tr className="tableRow">
                <td className="tableDataTitle">Downloads</td>
                {products.map((product) => (
                    <td
                        className={`tableDataFeature ${
                            selectedPlan?.id === product.id
                            ? 'text-[#E50914]'
                            : 'text-[gray]'
                        }`}
                        key={product.id}
                    >
                        {product.metadata.downloads === 'true' 
                            ? <AiOutlineCheck className="inline-block h-8 w-8" />
                            : <AiOutlineMinus className="inline-block h-8 w-8" />
                        }
                    </td>
                ))}
            </tr>
        </tbody>
    </table>
  )
}

export default Table