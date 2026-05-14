import { useState } from "react";
import { useParams } from "react-router-dom";

import { createOrder } from "../../store/order/orderSlice.js";
import { useDispatch } from "react-redux";


const CreateOrderPage = () => {

    const {productId} = useParams();
    const dispatch = useDispatch();

    const initialOrder = {
        name: '',
        username: '',
        middleName: '',
        phoneNumber: '',
        city: '',
        deliveryBranch: '',
        deliveryMethod: 'nova_poshta',
        productId: productId
    }

    const [order, setOrder] = useState(initialOrder);
    const handleOrder = (e, keyName) => {
        setOrder({...order, [keyName]: e.target.value})
    }

    return (
        <div className="createOrderPage">
            <h5>Введіть дані для замовлення:</h5>
            <form className="orderForm" onSubmit={e => e.preventDefault()}>
                <input type="text" id="name" className="name" placeholder="Ім'я"
                    value={order.name}
                    onChange={e => handleOrder(e, 'name')}
                />
                <input type="text" id="username" className="surnama" placeholder="Прізвище"
                    value={order.username}
                    onChange={e => handleOrder(e, 'username')}
                />
                <input type="text" id="middleName" className="middleName" placeholder="По батькові"
                    value={order.middleName}
                    onChange={e => handleOrder(e, 'middleName')}
                />
                <input type="tel" id="phoneNumber" className="phoneNumber" placeholder="Номер телефона"
                    value={order.phoneNumber}
                    onChange={e => handleOrder(e, 'phoneNumber')}
                />
                <input type="text" id="city" className="city" placeholder="Місто"
                    value={order.city}
                    onChange={e => handleOrder(e, 'city')}
                />
                <input type="text" id="deliveryBranch" className="deliveryBranch" placeholder="Відділення"
                    value={order.deliveryBranch}
                    onChange={e => handleOrder(e, 'deliveryBranch')}
                />
                <div className='deliveryMethod'>
                    <label className='hint'>Спосіб доставки:</label>
                    <div className="options">
                        <label className='option'>
                            <input type="radio" name="deliveryMethod" value="nova_poshta"
                                checked={order.deliveryMethod === 'nova_poshta'}
                                onChange={e => handleOrder(e, 'deliveryMethod')}/> 
                                Нова пошта
                        </label>
                        <label className='option'>
                            <input type="radio" name="deliveryMethod" value="ukrposhta"
                                checked={order.deliveryMethod === 'ukrposhta'}
                                onChange={e => handleOrder(e, 'deliveryMethod')}/> 
                                Укрпошта
                        </label>
                    </div>
                </div>
            </form>
            <button className="createOrderBtn" onClick={()=>
            {
                console.log(order)
                dispatch(createOrder(order))
            }}>
                Підтвердити
            </button>
        </div>
    );
};

export default CreateOrderPage;