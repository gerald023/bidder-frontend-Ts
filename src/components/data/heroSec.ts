import banner1 from '../../images/banner1.webp';
import banner2 from '../../images/banner2.jpg';
import banner3 from '../../images/banner3.jpeg'

export interface HeroSection{
    title:string
    bgc:string
    subText: string
    img: string
}
export const heroSec = [
    {
        title: "Bid with Confidence, Win with Pride: Elevate Your Collection",
        bgc: "black",
        subText: "this is a test for the hero section",
        img:     banner1,
    },
    {
        title: "Experience the Thrill of the Auction: Where Every Bid Tells a Story",
        bgc: "green",
        subText: "this is a test for the hero section",
        img: banner2,
    },
    {
        title: "Where Passion Meets Prestige: Begin Your Auction Adventure Now",
        bgc: "yellow",
        subText: "this is a test for the hero section",
        img: banner3,
    },
    {
        title: "Discover Treasures Await: Dive into Our Exclusive Auctions Today!",
        bgc: "blue",
        subText: "this is a test for the hero section",
        img:         "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    },
]