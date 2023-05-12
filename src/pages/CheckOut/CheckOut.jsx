import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const CheckOut = () => {
    const service=useLoaderData();
    
    const {title,price,_id,img}=service;
    const {user}=useContext(AuthContext)
    // console.log(user);

    const handleBookService=(event)=>{
        event.preventDefault();
        const form=event.target;
        const name=form.name.value;
        const date=form.date.value;
        const email=user?.email;

        const booking={
            customerName:name,
            email,
            img,
            date,
            service:title,
            service_id:_id,
            price:price
        }
        console.log(booking);
        fetch('https://y-nine-gold.vercel.app/bookings',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(booking)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            
            if(data.insertedId){
                alert('service book successfully!!')
            }
        })

    }

    return (
        <div>
                        <h2 className="text-3xl text-center">Book Services: {title} </h2>

                        <form onSubmit={handleBookService}>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" defaultValue={user?.displayName} name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date"  name="date" className="input input-bordered" required />
          
        </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" name="email" defaultValue={user?.email} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Due Amount</span>
                    </label>
          <input type="text" name="amount" defaultValue={'$'+ price} className="input input-bordered" required />
          
        </div>
                       </div>
                 <div className="form-control mt-6">
                     {/* <button className=>Login</button> */}
          < input type="submit" className="btn btn-primary btn-block" value="Order Confirm" />
        </div>
                        </form>
                <div className="card-body">
                  
              </div>
        </div>
    );
};

export default CheckOut;