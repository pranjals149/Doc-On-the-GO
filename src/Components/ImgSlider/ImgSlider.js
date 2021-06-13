import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function ImgSlider() {

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
    }

    return (
        <Carousel {...settings}>
            <Wrap>
                <a>
                    <img src="https://images.unsplash.com/photo-1593007791459-4b05e1158229?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="" />
                </a>
            </Wrap>

            <Wrap>
                <a>
                    <img src="https://images.unsplash.com/photo-1585997091460-8ed8ae2282cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=731&q=80" alt="" />
                </a>
            </Wrap>

            <Wrap>
                <a>
                    <img src="https://images.unsplash.com/photo-1584954543904-af4096743b95?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="" />
                    {/* <img src="https://www.parkview.com/media/Image/500x250_graphic_CovidSymptomCheck.jpg" alt="" /> */}
                </a>
            </Wrap>

            <Wrap>
                <a>
                    <img src="https://images.unsplash.com/photo-1585222515068-7201a72c4181?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80" alt="" />
                    {/* <img src="http://www.globalschoolsaward.org.uk/images/global-schools-award-yorkshire-resources.gif?crc=3895343936" alt="" /> */}

                </a>
            </Wrap>
        </Carousel>
    )
}

const Carousel = styled(Slider)`
    margin-top: 20px;

    & > button {
        opacity: 0;
        height: 100%;
        width: 5vw;
        z-index: 1;

        &:hover {
            opacity: 1;
            transition: opacity 0.2s ease 0s;
        }
    }

    ul li button {
        &:before {
            font-size: 10px;
            color: rgb(150, 158, 171);
        }
    }

    li.slick-active button:before {
        color: white;
    }

    .slick-list {
        overflow: initial;
    }

    .slick-prev {
        left: -75px;
    }

    .slick-next {
        right: -75px;
    }

`

const Wrap = styled.div`
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    a {
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        cursor: pointer;
        display: block;
        position: relative;
        padding: 4px;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            height: 350px;
            margin: 0 auto;
        }

        &:hover {
            padding: 0;
            border: 4px solid rgba(249, 249, 249, 0.8);
            transition-duration: 300ms;
        }
    }
`

export default ImgSlider