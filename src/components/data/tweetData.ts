import tes1 from '../../images/tes_1.webp';
import tes2 from '../../images/tes_2.webp';
import tes3 from '../../images/tes_3.webp';
import part1 from '../../images/partner1.png';
import part2 from '../../images/partner2.png';
import part3 from '../../images/partner3.png';
import part4 from '../../images/partner4.png';

export const Partners =[part1, part2, part3, part4]

export const tweets = [
    {
        text: `"Very cute dress and fun color. i am also very impressed by the quality of the linen. Excited to wear this dress in the summer!"`,
        pText: "Makes me happy",
        img: tes1,
        name: "Rachael Torphy",
        star: 5
    },
    {
        text: `"Very cute dress and fun color. i am also very impressed by the quality of the linen. Excited to wear this dress in the summer!"`,
        pText: "I love demati",
        img: tes2,
        name: "Emily Ryan",
        star: 4
    },
    {
        text: `"Very cute dress and fun color. i am also very impressed by the quality of the linen. Excited to wear this dress in the summer!"`,
        pText: "I love this shirt",
        img: tes3,
        name: "John Doe",
        star: 3
    },
    {
        text: `"Very cute dress and fun color. i am also very impressed by the quality of the linen. Excited to wear this dress in the summer!"`,
        pText: "I hate this shirt",
        img: tes3,
        name: "John Doe",
        star: 1
    },
]

const tweetsByIndex = (index:number) => tweets[index % tweets.length];

export default tweetsByIndex;


