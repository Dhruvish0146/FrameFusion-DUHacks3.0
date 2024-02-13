
import { useDispatch } from "react-redux";
import { setLogout } from "../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Logout = (props) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(
            setLogout({
                userId: null,
            token: null,
            name: null,
            actor: null,
            priturePath :null,
            user:null,
            })
        );
        navigate("/");
    }, [dispatch, navigate]);

    return null;
};

export default Logout;
