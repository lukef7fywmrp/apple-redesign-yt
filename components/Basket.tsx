import { ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";

function Basket() {
  const items = useSelector(selectBasketItems);

  if (items.length === 0) return null;

  return (
    <Link href="/checkout">
      <div className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        {items.length > 0 && (
          <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
            {items.length}
          </span>
        )}
        <ShoppingBagIcon className="headerIcon h-8 w-8" />
      </div>
    </Link>
  );
}

export default Basket;
