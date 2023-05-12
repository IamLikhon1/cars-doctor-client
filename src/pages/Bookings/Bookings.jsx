import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingsRow from "./BookingsRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const {user}=useContext(AuthContext);
    const [bookings, setBookings]=useState([])
    const navigate=useNavigate()
    const url=`http://localhost:5000/bookings?email=${user?.email}`
    useEffect(()=>{
        fetch(url,{
          method:"GET",
          headers:{
            authorization:`Bearer ${localStorage.getItem('car-access-token')}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
          if(!data.error){

            setBookings(data)
          }
          else{
            navigate('/')
          }
        })
    },[url,navigate]);

    const handleDelete=id=>{
        const proceed=confirm('Are you sure to want to delete!');
        if(proceed){
                fetch(`http://localhost:5000/bookings/${id}`,{
                    method:'DELETE'
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data.deletedCount>0){
                        alert('Deleted Successfully');
                        const remaining=bookings.filter(booking=>booking._id!==id);
                        setBookings(remaining)
                    }
                })
        }
    };

    const handleBookingConfirm=(id)=>{

        fetch(`http://localhost:5000/bookings/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status:'confirm'})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            const remaining=bookings.filter(booking=>booking._id!==booking);
            const updated=bookings.find(booking=>booking._id===id);
            updated.status='confirm'
            const newBooking=[updated, ...remaining];
            setBookings(newBooking)
        })

    }

    return (
        <div>
            <div className="text-3xl">Your Bookings {bookings.length}</div>

            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Image</th>
        <th>Service</th>
        <th>Date</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {
        bookings.map(booking=><BookingsRow
        key={booking._id}
        booking={booking}
        handleDelete={handleDelete}
        handleBookingConfirm={handleBookingConfirm}
        ></BookingsRow>)
      }
      
      
    </tbody>
   
  </table>
</div>
        </div>
    );
};

export default Bookings;