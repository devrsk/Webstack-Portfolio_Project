import {useState,useRef, useEffect} from 'react'

function useHover(){
    const [hovered, setHoverd] = useState(false)
    const ref = useRef(null)

    function enter(){
        setHoverd(true)
    }
    function leave(){
        setHoverd(false)
    }

    useEffect(()=>{
        ref.current.addEventListener('mouseenter',enter)
        ref.current.addEventListener('mouseleave',leave)

        return() =>{
            ref.current.removeEventListener('mouseenter',enter)
            ref.current.removeEventListener('mouseleave',leave)
        }
    },[]) 

    return {hovered,ref}
}

export default useHover