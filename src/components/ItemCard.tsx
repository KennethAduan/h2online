import { useEffect, useRef } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Avatar,
    Button
  } from "@material-tailwind/react";
import PartialButton from '../components/partials/partialButton';
interface ItemCardProps {
    name: string
    price: number
    description: string
    image: string
    category: string
    color: string
    status: string
    stock: number   
}



function ItemCard(
    {name ="Demo", price = 12, stock = 18, image = "https://asset.kompas.com/crops/ruBvziyc67cX6AM78ArOUNI5RC0=/100x67:900x600/1200x800/data/photo/2021/10/08/615fc7cfe349d.jpg", status, color = "bg-green-500"}: ItemCardProps
) {

    const card1Ref = useRef(null);
    const card2Ref = useRef(null);

    useEffect(() => {
        if (card1Ref.current && card2Ref.current) {
            const card1Size = card1Ref.current.getBoundingClientRect();
            card2Ref.current.style.width = `${card1Size.width}px`;
            card2Ref.current.style.height = `${card1Size.height}px`;
        }
    }, []);

    const handleColor = (stock, color) => {
        if (stock >= 20) {
            color = "bg-green-500"
        } else if (stock >= 10) {
            color =  "bg-yellow-500"
        } else {
            color = "bg-red-500"
        }
        return color;
    }
  return (
    <>

<div className="relative h-96 w-96">
    {/* <!-- Red Card (Back Card) --> */}
    <div className="absolute right-3 flex justify-center items-center h-full w-full">
    <Card  ref={card2Ref} placeholder ={undefined} className={`absolute top-0 w-96 ${handleColor(stock,color)}`}>
    <CardHeader placeholder={undefined} floated={false} className="h-60 flex justify-center items-center">
    <img className="max-w-full h-auto" src={image} alt="profile-picture" />
    </CardHeader>
      <CardBody placeholder ={undefined}className="text-center">
        <Typography placeholder ={undefined}variant="h4" color="blue-gray" className="mb-2">
          Natalie Paisley
        </Typography>
        <Typography placeholder ={undefined}color="blue-gray" className="font-medium" textGradient>
          CEO / Co-Founder
        </Typography>
        <Typography placeholder ={undefined}color="blue-gray" className="font-medium" textGradient>
          CEO / Co-Founder
        </Typography>
        <Typography placeholder ={undefined}color="blue-gray" className="font-medium" textGradient>
          CEO / Co-Founder
        </Typography>
        {/* Row for name and price */}
  
      </CardBody>
      <CardFooter placeholder ={undefined} className="flex justify-center gap-7 pt-2">
        <Tooltip placeholder ={undefined} content="Like">
          <Typography placeholder ={undefined} 
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
          placeholder={undefined}
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
           placeholder={undefined}
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
    </div>

    <Card ref={card1Ref} placeholder ={undefined} className="absolute top-0">
      <CardHeader placeholder={undefined} floated={false} className="h-60 flex justify-center items-center overflow-hidden">
        <img className="object-contain object-center w-[340px] h-full" src={image} alt="profile-picture" />
    </CardHeader>
      <CardBody placeholder ={undefined}>
      <div className="flex justify-between">
  <Typography placeholder={undefined} color="blue-gray" className="font-medium" textGradient>
    Item:
  </Typography>
  <Typography placeholder={undefined}  className="font-black text-black" textGradient>
    {name}
  </Typography>
</div>
<div className="flex justify-between">
  <Typography placeholder = {undefined}  color="blue-gray" className="font-medium" textGradient>
    Stock (max. 50pcs)
  </Typography>
  <Typography placeholder = {undefined}  className="font-black text-black" textGradient>
    {stock}
  </Typography>
</div>
<div className="flex justify-between">
  <Typography placeholder = {undefined} color="blue-gray" className="font-medium" textGradient>
    Unit Price:
  </Typography>
  <Typography placeholder = {undefined}  className="font-black text-black" textGradient>
    {price}
  </Typography>
</div>
<div className="flex justify-between">
  <Typography placeholder = {undefined} color="blue-gray" className="font-medium" textGradient>
    Status:
  </Typography>
  <Typography placeholder = {undefined}  className="font-black text-black" textGradient>
    {status}
  </Typography>
  
</div>

      </CardBody>
      <CardFooter
      placeholder={undefined} className="flex items-center justify-between pt-0">
        <div className="flex items-center -space-x-3">

            <Avatar
            placeholder={undefined}
              size="sm"
              variant="circular"
              className={`border-2 border-white ${handleColor(stock,color)}`}
            /> 
        </div>
        <div className='flex justify-center items-center'>
        <Typography placeholder={undefined} className="font-normal">Re-Stock: </Typography>
        <Button className= "ml-2 " placeholder={undefined} size ="sm" variant="outlined">All</Button>
        <PartialButton className="ml-2"></PartialButton>
        
        </div>
        
      </CardFooter>
    </Card>
</div>

    </>
  )
}

export default ItemCard