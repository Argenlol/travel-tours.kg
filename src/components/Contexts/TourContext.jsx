import React from 'react';
import { useReducer } from 'react';
import { API } from '../helpers/constants';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { calcSubPrice, calcTotalPrice } from '../helpers/CartFuction';


export const TourContext = React.createContext()

const INIT_STATE = {
    tours: [],
    edit: null,
    paginatedPages: 1,
    cart: {},
    cartLength: 0,
    detail: {}
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_TOURS":
            return {
                ...state, tours: action.payload.data,
                paginatedPages: Math.ceil(action.payload.headers["x-total-count"] / 6)
            }
        case "GET_EDIT_TOUR":
            return {
                ...state, edit: action.payload
            }
        case "GET_DETAIL_TOUR":
            return { ...state, detail: action.payload }
        case "CHANGE_CART_COUNT":
            return { ...state, cartLength: action.payload }
        case "GET_CART":
            return { ...state, cart: action.payload }


        default: return state
    }
}

const TourContextProvider = ({ children }) => {
    const history = useHistory()
    const [state, dispatch] = useReducer(reducer, INIT_STATE)



    const getTours = async (history) => {
        const search = new URLSearchParams(history.location.search)
        search.set('_limit', 6)
        history.push(`${history.location.pathname}?${search.toString()}`)

        let data = await axios(`${API}/tours${window.location.search}`)
        dispatch({
            type: "GET_TOURS",
            payload: data
        })
    }

    const addTour = async (newTour) => {
        try {
            let res = await axios.post(`${API}/tours`, newTour)
            return res
        }
        catch (err) {
            console.log(err);
            return err
        }
    }

    const editTour = async (id) => {
        const { data } = await axios.get(`${API}/tours/${id}`)
        dispatch({
            type: "GET_EDIT_TOUR",
            payload: data
        })
    }

    const saveEditTour = async (editedTour) => {
        try {
            let res = await axios.patch(`${API}/tours/${editedTour.id}`, editedTour)
            return res
        } catch (err) {
            console.log(err);
        }
    }

    const deleteTour = async (id, history) => {
        await axios.delete(`${API}/tours/${id}`)
        getTours(history)
    }

    const deleteCart = async (id, history) => {
        await axios.delete(`${API}/cart/${id}`)
        getTours(history)
    }
    const addTourInCart = (tour) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                tours: [],
                totalPrice: 0

            }
        }

        let newTour = {
            item: tour,
            count: 1,
            subPrice: 0
        }
        let filteredCart = cart.tours.filter(elem => elem.item.id === tour.id)
        if (filteredCart.length > 0) {
            cart.tours = cart.tours.filter(elem => elem.item.id !== tour.id)
        } else {
            cart.tours.push(newTour)
        }
        newTour.subPrice = calcSubPrice(newTour)
        cart.totalPrice = calcTotalPrice(cart.tours)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.tours.length

        })
    }
    const getCartLength = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                tours: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.tours.length
        })

    }
    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                tours: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    const changeTourCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.tours = cart.tours.map(elem => {
            if (elem.item.id === id) {
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.tours)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }
    const buy = (history) => {
        localStorage.clear()
    }
    const checkTourInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                tours: [],
                totalPrice: 0
            }
        }
        let newCart = cart.tours.filter(elem => elem.item.id === id)
        return newCart.length > 0 ? true : false
    }

    const getDetail = async (id) => {
        const { data } = await axios.get(`${API}/tours/${id}`)
        dispatch({
            type: "GET_DETAIL_TOUR",
            payload: data
        })
    }


    return (
        <TourContext.Provider value={{
            tours: state.tours,
            edit: state.edit,
            paginatedPages: state.paginatedPages,
            cart: state.cart,
            cartLength: state.cartLength,
            detail: state.detail,
            getTours,
            addTour,
            editTour,
            saveEditTour,
            deleteTour,
            getCart,
            addTourInCart,
            changeTourCount,
            checkTourInCart,
            getCartLength,
            deleteCart,
            getDetail,
            buy,
        }}>
            {children}
        </TourContext.Provider>
    )

}

export default TourContextProvider
