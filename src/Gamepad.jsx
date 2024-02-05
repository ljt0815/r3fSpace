import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const PadHole = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  bottom: 50px;
  background:rgba(133, 133, 133, 0.5);
  border: #353535 solid medium;
  border-radius: 50%;
  left: 45%;
`;

const Stick = styled.div`
    position: absolute;
    left: 30px;
    top: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #666A73;
`;

function GamePad() {

    const [data, setData] = useState({left: '30px', top: '30px'});
    const [offset, setOffset] = useState({x: window.innerWidth * 0.45 + 60, y: window.innerHeight - 50 - 60});
    const stickRef = useRef();
    const handleResize = () => {
        setOffset({x: window.innerWidth * 0.45 + 60, y: window.innerHeight - 50 - 60});
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[]);

    function getMousePosition(e) {
        let xValue = e.targetTouches ? e.targetTouches[0].pageX : e.clientX;
        let yValue = e.targetTouches ? e.targetTouches[0].pageY : e.clientY;
        return { x:xValue, y:yValue };
    }

    function touch(event) {
        event = event || window.event;

        setOffset(getMousePosition(event));
        document.onmousemove = function(event){ event.preventDefault(); move(event); };
        document.onmouseup = function(event){ event.preventDefault(); mouseUp(); };
    }

    function move(e) {
        const mouse = getMousePosition(e);
        console.log(offset);
        let left = mouse.x - offset.x;
        let top = mouse.y - offset.y;
        const calLoc = left * left + top * top;
        if (calLoc > 60 * 60) {
            const result = Math.sqrt(calLoc);
            left /= result;
            top /= result;
            left *= 60;
            top *= 60;
        }
        setData({left: `${left + stickRef.current.clientWidth/2}px`, top: `${top + stickRef.current.clientHeight/2}px`});
    }
    function mouseUp() {
        document.onmousemove = null;
        document.onmouseup = null;
        setData({left: '30px', top: '30px'});
    }

    return (
        <PadHole >
            <Stick onMouseDown={touch} ref={stickRef} style={{left: data.left, top: data.top}}/>
        </PadHole>
    )
}

export default GamePad