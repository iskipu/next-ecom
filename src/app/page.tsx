"use client"
import Image from 'next/image'
import { data } from '../mock/data'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import Link from 'next/link';
import { json } from 'stream/consumers';
import StarRating from './StarRating';

export default function Home() {
  const [search, setSearch] = useState('');
  return (
    <>
      <div className='flex flex-col items-center'>
        <div className="m-2">
          <input
            type="text"
            placeholder="Search..."
            className='p-2 mx-2 border-2'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {data.filter(({ product_name }) => product_name.toLowerCase().includes(search)
        )
          .map((item) => {
            return <Card key={item.product_name} {...item} />
          })}
      </div>
    </>
  )
}

export interface Product {
  product_name: string;
  price: number;
  brand: string;
  category: string;
  description: string;
  rating: number;
  availability: boolean;
  shipping_cost: number;
  image_url: string;
  customer_reviews: number;
}

function Card(itm: Product) {
  const router = useRouter();
  return (
    <div className='flex flex-col border-2 p-2 w-1/2 items-center m-2'>
      <img
        src={itm.image_url}
        alt="new"
        className='h-[150px] w-[150px]'
      />
      <p className='text-sm p-1 font-bold'>{itm.product_name}</p>
      <StarRating rating={itm.rating} />
      <Link href={{
        pathname: 'product',
        query: { q: JSON.stringify(itm) }
      }
      }> <button className='border-1 p-1 font-bold bg-green-300' >buy</button> </Link>

    </div>
  )
}
