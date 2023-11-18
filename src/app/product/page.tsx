"use client"
import React, { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Product } from '../page'
import StarRating from '../StarRating'

export default function Result() {
	const searchParams = useSearchParams()
	const data: Product = JSON.parse(searchParams.get("q") || "{}");
	return (
		<div className='flex h-screen'>
			<div className='w-1/2 flex items-center flex-col'>
				<img
					src={data.image_url}
					alt="new"
					className='h-1/2 w-full p-2'
				/>
				<div className='flex justify-center content-center'>
					<StarRating rating={data.rating} />
				</div>
			</div>
			<div className='w-1/2 border-2 p-2 m-2'>
				<h1 className='text-xl font-bold py-2'>{data.product_name}</h1>
				<p className='text-justify pr-2'>{data.description}</p>
				<div className='mt-10'>
					<p className='font-bold'> Cost : {data.price} </p>
					<p className='font-bold'> Shipping Cost: {data.shipping_cost} </p>
					<p className='font-bold'> total cost: {data.shipping_cost + data.price} </p>
					{data.availability ?
						< div className='flex justify-center items-center m-2'>
							<ItemCount />
							<button className='border-1 p-1  font-bold bg-green-300 w-3/4 text-center m-auto' >buy</button>
						</div>
						:
						<div className='w-1/2 bg-red-500 m-auto text-center p-2'>
							<p className='font-bold'>
								Out OF StoCK
							</p>
						</div>
					}
				</div>
			</div>
		</div >
	)
}

function ItemCount() {
	const [count, setCount] = useState(1);
	const increase = () => {
		if (count >= 5) return
		setCount(count + 1);
	}
	const decrease = () => {
		if (count <= 1) return
		setCount(count - 1);
	}
	return (
		<div>
			<button className='w-5 font-bold bg-red-600 text-xl' onClick={decrease}>-</button>
			<span> {count} </span>
			<button className='w-5 font-bold bg-green-600 text-xl' onClick={increase}>+</button>
		</div>
	)
} 
