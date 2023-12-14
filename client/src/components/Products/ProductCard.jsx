import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function ProductCard({ items }) {
  if(items ==undefined) return null
  return (
    <Card className="max-sm:w-[18rem] sm:w-[22rem] justify-items-center justify-center h-[30rem] max-h-screen-sm:[27rem] cursor-pointer mx-auto">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          //   src={items.thumbnail}
          src={items ? items.thumbnail : null}
          className="h-full w-full object-contain"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {items ? items.title : null}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            $ {items ? `${items.price}.00` : 0.0}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {items ? items.description : null}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex gap-3">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Buy Now
        </Button>
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
