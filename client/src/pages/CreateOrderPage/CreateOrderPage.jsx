import './CreateOrderPage.scss';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createOrder } from "../../store/order/orderSlice.js";


const CreateOrderPage = () => {

    const {productId, sellerId} = useParams();
    const dispatch = useDispatch();

    const initialOrder = {
        name: '',
        username: '',
        middleName: '',
        phoneNumber: '',
        city: '',
        deliveryBranch: '',
        deliveryMethod: 'nova_poshta',
        productId,
        sellerId
    }

    const [order, setOrder] = useState(initialOrder);
    const handleOrder = (e, keyName) => {
        setOrder({...order, [keyName]: e.target.value})
    }

    return (
        <div className="createOrderPage">
            <h5 className="favouriteHeader">Оформлення замовлення:</h5>
            <form className="orderForm" onSubmit={e => e.preventDefault()}>
                <div>
                    <label className='hint'>І'мя:</label>
                    <input type="text" id="name" className="name" placeholder="Ім'я"
                        value={order.name}
                        onChange={e => handleOrder(e, 'name')}
                    />
                </div>
                <div>
                    <label className='hint'>Прізвище:</label>
                    <input type="text" id="username" className="surnama" placeholder="Прізвище"
                        value={order.username}
                        onChange={e => handleOrder(e, 'username')}
                    />
                </div>
                <div>
                    <label className='hint'>По батькові:</label>
                    <input type="text" id="middleName" className="middleName" placeholder="По батькові"
                        value={order.middleName}
                        onChange={e => handleOrder(e, 'middleName')}
                    />
                </div>
                <div>
                    <label className='hint'>Номер телефона:</label>
                    <input type="tel" id="phoneNumber" className="phoneNumber" placeholder="Номер телефона"
                        value={order.phoneNumber}
                        onChange={e => handleOrder(e, 'phoneNumber')}
                    />
                </div>
                <div>
                    <label className='hint'>Місто:</label>
                    <input type="text" id="city" className="city" placeholder="Місто"
                        value={order.city}
                        onChange={e => handleOrder(e, 'city')}
                    />
                </div>
                <div>
                    <label className='hint'>Відділення:</label>
                    <input type="text" id="deliveryBranch" className="deliveryBranch" placeholder="Відділення"
                        value={order.deliveryBranch}
                        onChange={e => handleOrder(e, 'deliveryBranch')}
                    />
                </div>
                <div className='deliveryMethod'>
                    <label className='hint'>Спосіб доставки:</label>
                    <div className="options">
                        <label className='option'>
                            <input type="radio" name="deliveryMethod" value="nova_poshta"
                                checked={order.deliveryMethod === 'nova_poshta'}
                                onChange={e => handleOrder(e, 'deliveryMethod')}/> 
                                <div className="img novaPoshta"></div>
                                Нова пошта
                        </label>
                        <label className='option'>
                            <input type="radio" name="deliveryMethod" value="ukrposhta"
                                checked={order.deliveryMethod === 'ukrposhta'}
                                onChange={e => handleOrder(e, 'deliveryMethod')}/> 
                                <div className="img ukrPoshta"></div>
                                Укрпошта
                        </label>
                    </div>
                </div>
            </form>
            <button className="createOrderBtn" onClick={async()=>dispatch(createOrder(order))}>
                Підтвердити
            </button>
        </div>
    );
};

export default CreateOrderPage;