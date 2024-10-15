import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
//import {ListingItem} from '../components/ListingItem.jsx'
import ListingItem from '../components/ListingItem.jsx';

const Home = () => {

  const [offerListings, setOfferListings]=useState([])
  const [saleListings, setSaleListings]=useState([])
  const [rentListings, setRentListings]=useState([])
  SwiperCore.use([Navigation]);

  console.log(saleListings)

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res=await fetch(`/api/listing/get?offer=true&limit=3`)
        const data=await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings=async()=>{
      try {
        const res=await fetch('/api/listing/get?type=rent&limit=3')
        const data=await res.json();
        setRentListings(data);
        fetchSaleListings();

      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings=async()=>{
      try {
        const res=await fetch('/api/listing/get?type=sale&limit=3')
        const data=await res.json();
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings();
  },[])
  return (
    <div>
      {/* top */}

      <div className='border border-red-500 py-15 px-10 flex flex-col '>
        <h1 className=' text-3xl text-slate-700 font-semibold lg:text-4xl'>Find Best Property for Sale and Rent in Your Area</h1>
        <div className=' w-2/4'>
        <p className='text-sm text-slate-700'>This is a property Website, you can find best property for sale, rent with all details like bedrooms, bathrooms. You can get best offers as well on properties. You can get home at best prices. Browse website for more details.</p>

        <Link to={'/search'} className='py-5 text-blue-800 font-bold underline'>
        Let's Get Started
        </Link>
        </div>
      </div>

      {/* Banner */}
      <Swiper navigation>
      {
        offerListings &&
        offerListings.length>0 &&
        offerListings.map((listing)=>(
          <SwiperSlide>
            <div
              style={{
                background: `url(${listing.imageUrls[0]})
                center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]' key={listing._id}>
            </div>
          </SwiperSlide>
        ))
      }
      </Swiper>

      {/* Listing Result */}

      {/* offer listings */}

      <div className=' max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length>0 && (
            <div>
              <div>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover:underline'>Show More Offers</Link>
              </div>
              <div className=' flex flex-wrap gap-4'>
                {
                  offerListings.map((listings)=>(
                    <ListingItem listings={listings} key={listings._id}/>
                  ))
                }
              </div>
              
            </div>
          )
        }
      </div>


      {/* for rent Listing */}
      <div className=' max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          rentListings && rentListings.length>0 && (
            <div>
              <div>
                <h2 className='text-2xl font-semibold text-slate-600'>Properties for Rent</h2>
                <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:underline'>Show More Offers</Link>
              </div>
              <div className=' flex flex-wrap gap-4'>
                {
                  rentListings.map((listings)=>(
                    <ListingItem listings={listings} key={listings._id}/>
                  ))
                }
              </div>
              
            </div>
          )
        }
      </div>



      {/* for sale listings */}

      
      <div className=' max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          saleListings && saleListings.length>0 && (
            <div>
              <div>
                <h2 className='text-2xl font-semibold text-slate-600'>Properties for Sale</h2>
                <Link to={'/search?type=sale'} className='text-sm text-blue-800 hover:underline'>Show More Offers</Link>
              </div>
              <div className=' flex flex-wrap gap-4'>
                {
                  saleListings.map((listings)=>(
                    <ListingItem listings={listings} key={listings._id}/>
                  ))
                }
              </div>
              
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home