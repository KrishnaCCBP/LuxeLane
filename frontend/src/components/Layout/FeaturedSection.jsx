import React from 'react'
import { HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi'
import { HiArrowPathRoundedSquare } from 'react-icons/hi2'

export default function FeaturedSection() {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            {/* Feature 1 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiShoppingBag className='text-xl'/>
                </div>
                <h4 className='tracking-tighter mb-2 uppercase'>Free international Shipping</h4>
                <p className='text-gray-600 text-sm tracking-tighter'>On all orders above $150.00</p>
            </div>
            {/* Feature 2 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiArrowPathRoundedSquare className='text-xl'/>
                </div>
                <h4 className='tracking-tighter mb-2 uppercase'>30 days return</h4>
                <p className='text-gray-600 text-sm tracking-tighter'>Money-back Guarantee.</p>
            </div>
            {/* Feature 3 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiOutlineCreditCard className='text-xl'/>
                </div>
                <h4 className='tracking-tighter mb-2 uppercase'>secure checkout</h4>
                <p className='text-gray-600 text-sm tracking-tighter'>100% Secure Checkout process.</p>
            </div>
        </div>
    </section>
  )
}
