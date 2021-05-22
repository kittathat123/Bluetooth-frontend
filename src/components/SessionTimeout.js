import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    Fragment
} from "react";
import moment from "moment";
import {logoutUser} from "../components/Sidebar" ;
import { useHistory } from "react-router";


export default function SessionTimeout() {
    const [events, setEvents] = useState(['click', 'load', 'scroll']);
    const [remainingSecond, setRemaingSecond] = useState(0);
    const history = useHistory();
    // const [isOpen, setOpen] = useState(false);
    var [timeStamp, setTimeStamp] = useState(0);

    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();

    // start inactive check
    let timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
            let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
            warningInactive(storedTimeStamp);
        })
    };

    // warning timer
    let warningInactive = (timeString) => {
        clearTimeout(startTimerInterval.current);

        warningInactiveInterval.current = setInterval(() => {
            // setSessionTimeout in minutes unit
            const maxTime = 10;
            const popTime = 1;

            var diff = moment.duration(moment().diff(moment(timeString)));
            var minPast = diff.minutes();
            var leftSecond = 60 - diff.seconds();

            console.log("(SessionTimeout.js) leftSecond :  ", leftSecond);


            if(minPast === popTime)
            {
                setRemaingSecond(leftSecond);
                console.log("(SessionTimeout.js) minPast === popTime")
                // setOpen(true);
            }

            if(minPast === maxTime)
            {
                console.log("(SessionTimeout.js) minPast === maxTime")
                clearInterval(warningInactiveInterval.current);
                // setOpen(false);
                sessionStorage.removeItem('lastTimeStamp');
                
                // logout_func
                console.log("(SessionTimeout.js) run logout func")
                if(localStorage.getItem('user_info') !== null) {
                    try {
                        logoutUser({
                            token: JSON.parse(localStorage.getItem("user_info")).token
                        });
                        localStorage.removeItem("user_info");
                        console.log("(SessionTimeout.js) LOCAL_STORAGE_REMOVE (\"user_info\") ")
                        history.push("/");
                    } catch (err) {
                        console.log("(SessionTimeOut.js) : Err ", err)
                    }
                 } else if(localStorage.getItem('user_info') === null) {
                     clearInterval(warningInactiveInterval.current);
                 } 

            }
        }, 1000);
    };

    // reset interval timer
    let resetTimer = useCallback(() => {
        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);

        if(localStorage.getItem('user_info') !== null) {
            moment.locale();
            timeStamp = moment()
            // console.log("Timestamp : ", timeStamp);
            sessionStorage.setItem('lastTimeStamp', timeStamp);
        } else if(localStorage.getItem('user_info') === null) {
            clearInterval(warningInactiveInterval.current);
            sessionStorage.removeItem('lastTimeStamp');
        }

        timeChecker();
        // setOpen(false);
    }, []);


    useEffect(() => {
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
            console.log("(SessionTimeOut.js) : events.foreach in useEffect");
        });

        // timeChecker();

        return () => {
            clearTimeout(startTimerInterval.current);
        };
    }, [resetTimer, events, timeChecker]);

    // console.log("(SessionTimeOut.js) remaining Seconds : ", remainingSecond);

    // if (!isOpen) {
    //   return null;
    // }
  
    // // change fragment to modal and handleclose func to close
    return <Fragment />;
}